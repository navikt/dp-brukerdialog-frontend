import { ArrowLeftIcon, ArrowRightIcon, BriefcaseIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
import { FormApi, useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.arbeidsforhold";
import { arbeidsforholdSchema } from "~/seksjon/arbeidsforhold/arbeidsforhold.schema";
import {
  Arbeidsforhold,
  ArbeidsforholdResponse,
  arbeidsforholdSpørsmål,
  ArbeidsforholdSvar,
  fastArbeidstidI6MånederEllerMer,
  fastArbeidstidIMindreEnn6Måneder,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  hvordanHarDuJobbet,
  jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  varierendeArbeidstidDeSiste12Månedene,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";
import { ArbeidsforholdModal } from "~/seksjon/arbeidsforhold/komponenter/ArbeidsforholdModal";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/arbeidsforhold.context";
import { useEffect, useRef, useState } from "react";
import { ModalOperasjonEnum } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.context";
import { ArbeidsforholdDetaljer } from "~/seksjon/arbeidsforhold/komponenter/ArbeidsforholdDetaljer";
import { payload } from "~/seksjon/egen-næring/egen-næring.spørsmål";

export function ArbeidsforholdView() {
  const navigate = useNavigate();
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
    defaultValues: loaderData ?? {},
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
  }, [
    registrerteArbeidsforhold.length,
  ]);

  useEffect(() => {
    if (form.value(hvordanHarDuJobbet) === "har-ikke-jobbet-de-siste-36-månedene") {
      setRegistrerteArbeidsforhold([]);
    }
  }, [
    form.value(hvordanHarDuJobbet),
  ]);

  function handleSubmit() {
    form.validate();

    const manglerArbeidsforhold =
      form.value(hvordanHarDuJobbet) &&
      form.value(hvordanHarDuJobbet) !== "har-ikke-jobbet-de-siste-36-månedene" &&
      registrerteArbeidsforhold.length === 0;

    if (manglerArbeidsforhold) {
      setVisManglerArbeidsforholdFeilmelding(true);
      return;
    }

    if (
      form.value(hvordanHarDuJobbet) !== undefined &&
      form.value(harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene) !==
        undefined &&
      !manglerArbeidsforhold
    ) {
      const arbeidsforholdResponse: ArbeidsforholdResponse = {
        [hvordanHarDuJobbet]: form.value(hvordanHarDuJobbet),
        [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]: form.value(
          harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
        ),
        registrerteArbeidsforhold: registrerteArbeidsforhold,
      };

      form.setValue(payload, JSON.stringify(arbeidsforholdResponse));
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <h2>Arbeidsforhold</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
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
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={() => navigate(-1)}
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
