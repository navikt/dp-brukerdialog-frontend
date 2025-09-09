import { ArrowLeftIcon, ArrowRightIcon, BriefcaseIcon } from "@navikt/aksel-icons";
import { Alert, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { FormApi, useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.arbeidsforhold";
import { arbeidsforholdSchema } from "~/seksjon/arbeidsforhold/arbeidsforhold.schema";
import {
  arbeidsforholdSpørsmål,
  ArbeidsforholdSvar,
  fastArbeidstidI6MånederEllerMer,
  fastArbeidstidIMindreEnn6Måneder,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  hvordanHarDuJobbet,
  jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  varierendeArbeidstidDeSiste12Månedene,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";

export function ArbeidsforholdView() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

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

  return (
    <div className="seksjon">
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
                <>
                  <Heading size="xsmall">Dine arbeidsforhold</Heading>
                  {getLedetekstDineArbeidsforhold(form)}
                  <HStack>
                    <Button variant="secondary" type="button" icon={<BriefcaseIcon />}>
                      Legg til arbeidsforhold
                    </Button>
                  </HStack>
                </>
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
                type="submit"
                iconPosition="right"
                icon={<ArrowRightIcon />}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
    </div>
  );
}
