import { ArrowLeftIcon, ArrowRightIcon, BriefcaseIcon } from "@navikt/aksel-icons";
import { Alert, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.arbeidsforhold";
import { arbeidsforholdSchema } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.schema";
import {
  Arbeidsforhold,
  arbeidsforholdForklarendeTekstKomponenter,
  arbeidsforholdModalSkiftTurnusRotasjonSpørsmål,
  arbeidsforholdModalSpørsmål,
  ArbeidsforholdResponse,
  arbeidsforholdSpørsmål,
  ArbeidsforholdSvar,
  erTilbakenavigering,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harIkkeJobbetDeSiste36Månedene,
  hvordanHarDuJobbet,
  pdfGrunnlag,
  seksjonsvar,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";
import { ArbeidsforholdModal } from "~/seksjon/arbeidsforhold/v1/komponenter/ArbeidsforholdModal";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import { useEffect, useRef, useState } from "react";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { ArbeidsforholdDetaljer } from "~/seksjon/arbeidsforhold/v1/komponenter/ArbeidsforholdDetaljer";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegErOppsagt";
import { arbeidsforholdModalJegHarSagtOppSelvSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegHarSagtOpp";
import { arbeidsforholdModalJegHarFåttAvskjedSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.avskjediget";
import { arbeidsforholdModalKontraktenErUgåttSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.kontraktenErUgått";
import { arbeidsforholdModalArbeidstidenErRedusertSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.arbeidstidenErRedusert";
import { arbeidsforholdModalArbeidsgiverErKonkursSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.konkurs";
import { arbeidsforholdModalJegErPermittertSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.permittert";
import { arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.ikkeEndret";

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
        ...lagSeksjonPayload(arbeidsforholdForklarendeTekstKomponenter, form.transient.value()),
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

              {form.value(hvordanHarDuJobbet) &&
                form.value(hvordanHarDuJobbet) !== harIkkeJobbetDeSiste36Månedene &&
                form.value(
                  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
                ) && (
                  <VStack gap="space-16">
                    {arbeidsforholdForklarendeTekstKomponenter.map((spørsmål) => {
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
                            operasjon: ModalOperasjon.LeggTil,
                            form: form,
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
