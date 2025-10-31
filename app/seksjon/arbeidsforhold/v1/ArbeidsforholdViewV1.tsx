import { ArrowLeftIcon, ArrowRightIcon, BriefcaseIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
import { FormApi, useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.arbeidsforhold";
import { arbeidsforholdSchema } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.schema";
import {
  Arbeidsforhold,
  arbeidsforholdModalSkiftTurnusRotasjonSpørsmål,
  arbeidsforholdModalSpørsmål,
  ArbeidsforholdResponse,
  arbeidsforholdSpørsmål,
  ArbeidsforholdSvar,
  erTilbakenavigering,
  fastArbeidstidI6MånederEllerMer,
  fastArbeidstidIMindreEnn6Måneder,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  hvordanHarDuJobbet,
  jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  pdfGrunnlag,
  seksjonsvar,
  varierendeArbeidstidDeSiste12Månedene,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";
import { ArbeidsforholdModal } from "~/seksjon/arbeidsforhold/v1/komponenter/ArbeidsforholdModal";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import { useEffect, useRef, useState } from "react";
import { ModalOperasjonEnum } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { ArbeidsforholdDetaljer } from "~/seksjon/arbeidsforhold/v1/komponenter/ArbeidsforholdDetaljer";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegErOppsagt";
import { arbeidsforholdModalJegHarSagtOppSelvSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegHarSagtOpp";
import {
  arbeidsforholdModalJegHarFåttAvskjedSpørsmål
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.avskjediget";
import {
  arbeidsforholdModalKontraktenErUgåttSpørsmål
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.kontraktenErUgått";
import {
  arbeidsforholdModalArbeidstidenErRedusertSpørsmål
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.arbeidstidenErRedusert";
import {
  arbeidsforholdModalArbeidsgiverErKonkursSpørsmål
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.konkurs";
import {
  arbeidsforholdModalJegErPermittertSpørsmål
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.permittert";
import {
  arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.ikkeEndret";

export function ArbeidsforholdViewV1() {
  const seksjonnavn = "Arbeidsforhold";
  const ref = useRef<HTMLDialogElement>(null);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [visManglerArbeidsforholdFeilmelding, setVisManglerArbeidsforholdFeilmelding] =
    useState(false);
  const { registrerteArbeidsforhold, setRegistrerteArbeidsforhold, modalData, setModalData } =
    useArbeidsforholdContext();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: arbeidsforholdSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
  });

  useNullstillSkjulteFelter<ArbeidsforholdSvar>(form, arbeidsforholdSpørsmål);

  function getLedetekstDineArbeidsforhold(form: FormApi<any>): string {
    if (
      form.value(harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene) ===
      "ja"
    ) {
      switch (form.value(hvordanHarDuJobbet)) {
        case fastArbeidstidIMindreEnn6Måneder:
          return "Du må legge til alle arbeidsforholdene du har hatt i EØS-land, Sveits eller Storbritannia de siste 36 månedene og alle arbeidsforhold du har hatt i Norge de siste 12 månedene.";
        case fastArbeidstidI6MånederEllerMer:
          return "Du må legge til alle arbeidsforholdene du har hatt i EØS-land, Sveits eller Storbritannia de siste 36 månedene og alle arbeidsforhold du har hatt i Norge de siste 6 månedene.";
        case varierendeArbeidstidDeSiste12Månedene:
          return "Du må legge til alle arbeidsforholdene du har hatt i EØS-land, Sveits eller Storbritannia de siste 36 månedene og alle arbeidsforhold du har hatt i Norge de siste 12 månedene.";
        case jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene:
          return "Du må legge til alle arbeidsforholdene du har hatt i EØS-land, Sveits, Storbritannia og Norge de siste 36 månedene.";
      }
    } else if (
      form.value(harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene) ===
      "nei"
    ) {
      switch (form.value(hvordanHarDuJobbet)) {
        case fastArbeidstidIMindreEnn6Måneder:
          return "Du må legge til alle arbeidsforholdene du har hatt de siste 12 månedene.";
        case fastArbeidstidI6MånederEllerMer:
          return "Du må legge til alle arbeidsforholdene du har hatt de siste 6 månedene.";
        case varierendeArbeidstidDeSiste12Månedene:
          return "Du må legge til alle arbeidsforhold du har hatt i løpet av de siste 12 månedene.";
        case jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene:
          return "Du må legge til alle arbeidsforhold du har hatt i løpet av de siste 36 månedene. Har du ikke jobbet i løpet av de siste 12 månedene, må du legge til dine siste arbeidsforhold.";
      }
    }
    return "";
  }

  useEffect(() => {
    if (modalData) {
      ref.current?.showModal();
    }
  }, [modalData]);

  useEffect(() => {
    setVisManglerArbeidsforholdFeilmelding(false);
  }, [registrerteArbeidsforhold.length]);

  useEffect(() => {
    if (form.value(hvordanHarDuJobbet) === "har-ikke-jobbet-de-siste-36-månedene") {
      setRegistrerteArbeidsforhold([]);
    }
  }, [form.value(hvordanHarDuJobbet)]);

  function lagArbeidsforholdResponse(): ArbeidsforholdResponse {
    return {
      [hvordanHarDuJobbet]: form.transient.value(hvordanHarDuJobbet),
      [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]:
        form.transient.value(
          harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
        ),
      registrerteArbeidsforhold: registrerteArbeidsforhold,
    };
  }

  const genererPdfGrunnlag = () => {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [
        ...lagSeksjonPayload(arbeidsforholdSpørsmål, form.transient.value()),
        ...registrerteArbeidsforhold.map((etArbeidsforhold) =>
          lagSeksjonPayload(
            arbeidsforholdModalSpørsmål
              .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål)
              .concat(arbeidsforholdModalJegHarSagtOppSelvSpørsmål)
              .concat(arbeidsforholdModalJegHarFåttAvskjedSpørsmål)
              .concat(arbeidsforholdModalKontraktenErUgåttSpørsmål)
              .concat(arbeidsforholdModalArbeidstidenErRedusertSpørsmål)
              .concat(arbeidsforholdModalArbeidsgiverErKonkursSpørsmål)
              .concat(arbeidsforholdModalJegErPermittertSpørsmål)
              .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål)
              .concat(arbeidsforholdModalSkiftTurnusRotasjonSpørsmål),
            etArbeidsforhold
          )
        ),
      ],
    };

    return JSON.stringify(pdfPayload);
  };

  function handleTilbakenavigering() {
    const arbeidsforholdResponse = lagArbeidsforholdResponse();
    form.setValue(erTilbakenavigering, true);
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(arbeidsforholdResponse));

    form.submit();
  }

  function handleSubmit() {
    form.setValue(erTilbakenavigering, false);
    form.validate();

    const manglerArbeidsforhold =
      form.value(hvordanHarDuJobbet) &&
      form.value(hvordanHarDuJobbet) !== "har-ikke-jobbet-de-siste-36-månedene" &&
      registrerteArbeidsforhold.length === 0;

    if (manglerArbeidsforhold) {
      setVisManglerArbeidsforholdFeilmelding(true);
      return;
    }

    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(lagArbeidsforholdResponse()));
    form.submit();
  }

  return (
    <div className="innhold">
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <input type="hidden" name="versjon" value={loaderData.versjon} />
              {arbeidsforholdSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof ArbeidsforholdSvar)}
                  />
                );
              })}

              {getLedetekstDineArbeidsforhold(form) !== "" && (
                <VStack gap="space-16">
                  <BodyLong>
                    <strong>Dine arbeidsforhold</strong>
                    <br />
                    {getLedetekstDineArbeidsforhold(form)}
                  </BodyLong>
                  {registrerteArbeidsforhold?.map(
                    (arbeidsforhold: Arbeidsforhold, index: number) => (
                      <ArbeidsforholdDetaljer
                        key={index}
                        arbeidsforholdIndex={index}
                        arbeidsforhold={arbeidsforhold}
                      />
                    )
                  )}
                  <HStack>
                    <Button
                      variant="secondary"
                      type="button"
                      icon={<BriefcaseIcon />}
                      onClick={() => {
                        setModalData({
                          operasjon: ModalOperasjonEnum.LeggTil,
                          ledetekst: getLedetekstDineArbeidsforhold(form),
                        });
                      }}
                    >
                      Legg til arbeidsforhold
                    </Button>
                  </HStack>
                  {visManglerArbeidsforholdFeilmelding && (
                    <ErrorMessage showIcon>Du må legge til minst et arbeidsforhold</ErrorMessage>
                  )}
                </VStack>
              )}

              {actionData && (
                <Alert variant="error" className="mt-4">
                  {actionData.error}
                </Alert>
              )}
            </VStack>

            <HStack gap="4" className="mt-8">
              <Button
                variant="secondary"
                type="button"
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={handleTilbakenavigering}
              >
                Forrige steg
              </Button>
              <Button
                variant="primary"
                type="button"
                iconPosition="right"
                icon={<ArrowRightIcon />}
                onClick={handleSubmit}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
        {modalData && <ArbeidsforholdModal ref={ref} />}
      </VStack>
    </div>
  );
}
