import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { data, Form, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router";
import invariant from "tiny-invariant";
import { ExternalLink } from "~/components/ExternalLink";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { hentFormDefaultValues } from "~/utils/form.utils";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { utdanningSchema } from "~/seksjon-regelsett/utdanning/utdanning.schema";
import { utdanningSpørsmål, UtdanningSvar } from "~/seksjon-regelsett/utdanning/utdanningSpørsmål";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "utdanning");

  if (response.status !== 200) {
    return data(undefined);
  }

  const loaderData: UtdanningSvar = await response.json();

  return data(loaderData);
}

export async function action({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "utdanning";
  const nesteSeksjonId = "barnetillegg";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);
  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av utdanning" };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function Utdanning() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: utdanningSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: hentFormDefaultValues<UtdanningSvar>(loaderData),
  });

  useNullstillSkjulteFelter<UtdanningSvar>(form, utdanningSpørsmål);

  return (
    <Page className="brukerdialog">
      <h2>Utdanning</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {utdanningSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }
                return (
                  <>
                    <Spørsmål
                      key={spørsmål.id}
                      spørsmål={spørsmål}
                      formScope={form.scope(spørsmål.id as keyof UtdanningSvar)}
                    />
                    {((spørsmål.id === "tarUtdanningEllerOpplæring" &&
                      form.value("tarUtdanningEllerOpplæring") === "ja") ||
                      (spørsmål.id === "planleggerÅStarteEllerFullføreStudierSamtidig" &&
                        form.value("planleggerÅStarteEllerFullføreStudierSamtidig") === "ja")) && (
                      <Alert variant="warning">
                        For å få innvilget dagpenger mens du tar utdanning eller opplæring, må du
                        sende inn{" "}
                        <ExternalLink to="https://www.nav.no/fyllut/nav040605" className="inline">
                          Søknad om å beholde dagpengene mens du tar utdanning eller opplæring - NAV
                          04-06.05
                        </ExternalLink>
                        , i tillegg til å sende inn denne søknaden om dagpenger.
                        <br />
                        <br />
                        Hvis du ikke sender søknaden om å beholde dagpengene mens du tar utdanning
                        eller opplæring, kan vi avslå søknaden din om dagpenger.
                      </Alert>
                    )}

                    {spørsmål.id === "dokumenterAvsluttetUtdanningSiste6MånederNå" &&
                      form.value("dokumenterAvsluttetUtdanningSiste6MånederNå") === "nei" && (
                        <Alert variant="warning">
                          Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn
                          dokumentene vi trenger for å behandle saken din. Ta kontakt med NAV hvis
                          du ikke får tak i dokumentet
                        </Alert>
                      )}
                  </>
                );
              })}
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
    </Page>
  );
}
