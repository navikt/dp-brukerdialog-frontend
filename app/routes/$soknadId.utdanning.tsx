import {
  Alert,
  FileObject,
  FileRejected,
  FileRejectionReason,
  Page,
  VStack,
} from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Form, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { Route } from "../../.react-router/types/app/routes/+types/_index";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { z } from "zod";
import { useForm } from "@rvf/react-router";
import { utdanningSporsmal, UtdanningSvar } from "~/components/regelsett/utdanning";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { ExternalLink } from "~/components/ExternalLink";

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

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "utdanning");
  if (response.status === 200) {
    console.log("response 200: ", response);
    return await response.json();
  }

  return {
    tarUtdanningEllerOpplæring: undefined,
    avsluttetUtdanningSiste6Måneder: undefined,
    dokumenterAvsluttetUtdanningSiste6MånederNå: undefined,
    lasteOppSenereBegrunnelse: undefined,
    naarSendtDokumentasjonTidligere: undefined,
    senderIkkeDokumentasjonBegrunnelse: undefined,
    planleggerÅStarteEllerFullføreStudierSamtidig: undefined,
  };
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

export default function Utdanning({ loaderData }: Route.ComponentProps) {
  const utdanning = useLoaderData<typeof loader>();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: schema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: utdanning,
  });

  console.log("Utdanning: ", utdanning);

  useEffect(() => {
    const values = form.value();

    utdanningSporsmal.forEach((sporsmal) => {
      const sporsmalId = sporsmal.id as keyof UtdanningSvar;
      if (sporsmal.visHvis && !sporsmal.visHvis(values) && values[sporsmalId] !== undefined) {
        form.setValue(sporsmalId, undefined);
      }
    });
  }, [form.value()]);

  const [avsluttetUtdanningSiste6MånederFiles, setAvsluttetUtdanningSiste6MånederFiles] = useState<
    FileObject[]
  >([]);

  function removeFile(fileToRemove: FileObject) {
    setAvsluttetUtdanningSiste6MånederFiles(
      avsluttetUtdanningSiste6MånederFiles.filter((file) => file !== fileToRemove)
    );
  }
  const acceptedFiles = avsluttetUtdanningSiste6MånederFiles.filter((file) => !file.error);
  const rejectedFiles = avsluttetUtdanningSiste6MånederFiles.filter(
    (f): f is FileRejected => f.error
  );

  const errors: Record<FileRejectionReason, string> = {
    fileType: "Filformatet støttes ikke",
    fileSize: `Filen er større enn 1 MB`,
  };

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
                      key={sporsmal.id}
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
          </Form>
        </VStack>
      </VStack>
    </Page>
  );
}
