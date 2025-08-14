import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { data, Form, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router";
import invariant from "tiny-invariant";
import { z } from "zod";
import { ExternalLink } from "~/components/ExternalLink";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { utdanningSporsmal, UtdanningSvar } from "~/regelsett/utdanning";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "utdanning");

  if (response.status === 200) {
    return await response.json();
  }

  const loaderData = await response.json();

  return data({ ...loaderData });
}

export async function action({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "utdanning";
  const nesteSeksjonsId = "barnetillegg";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);
  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av utdanning" };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonsId}`);
}

const schema = z
  .object({
    tarUtdanningEllerOpplæring: z.enum(["ja", "nei"]).optional(),
    avsluttetUtdanningSiste6Måneder: z.enum(["ja", "nei"]).optional(),
    dokumenterAvsluttetUtdanningSiste6MånederNå: z.string().optional(),
    lasteOppSenereBegrunnelse: z.string().optional(),
    naarSendtDokumentasjonTidligere: z.string().optional(),
    senderIkkeDokumentasjonBegrunnelse: z.string().optional(),
    planleggerÅStarteEllerFullføreStudierSamtidig: z.enum(["ja", "nei"]).optional(),
  })
  .superRefine((data, ctx) => {
    utdanningSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof UtdanningSvar;
      const svar = data[sporsmalId];

      if (synlig && !svar) {
        ctx.addIssue({
          path: [sporsmal.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });

export default function Utdanning() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: schema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: loaderData || {},
  });

  useEffect(() => {
    const values = form.value();

    utdanningSporsmal.forEach((sporsmal) => {
      const sporsmalId = sporsmal.id as keyof UtdanningSvar;
      if (sporsmal.visHvis && !sporsmal.visHvis(values) && values[sporsmalId] !== undefined) {
        form.setValue(sporsmalId, undefined);
      }
    });
  }, [form.value()]);

  return (
    <Page className="brukerdialog">
      <h2>Utdanning</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {utdanningSporsmal.map((sporsmal) => {
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                  return null;
                }
                return (
                  <>
                    <Sporsmal
                      sporsmal={sporsmal}
                      formScope={form.scope(sporsmal.id as keyof UtdanningSvar)}
                    />
                    {((sporsmal.id === "tarUtdanningEllerOpplæring" &&
                      form.value("tarUtdanningEllerOpplæring") === "ja") ||
                      (sporsmal.id === "planleggerÅStarteEllerFullføreStudierSamtidig" &&
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

                    {sporsmal.id === "dokumenterAvsluttetUtdanningSiste6MånederNå" &&
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
