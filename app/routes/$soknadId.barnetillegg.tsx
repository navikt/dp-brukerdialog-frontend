import { ArrowLeftIcon, ArrowRightIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  data,
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router";
import invariant from "tiny-invariant";
import { BarnFraPdl } from "~/components/seksjon/barnetillegg/BarnFraPdl";
import { BarnLagtManuelt } from "~/components/seksjon/barnetillegg/BarnLagtManuelt";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { barnetilleggSchema } from "~/seksjon-regelsett/barnetillegg/barnetillegg.schema";
import {
  Barn,
  barnetilleggSpørsmål,
  BarnetilleggSvar,
  forsørgerduBarnetSomIkkeVisesHer,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "barnetillegg");

  if (response.status !== 200) {
    return data(undefined);
  }

  const loaderData: BarnetilleggResponse = await response.json();

  return data(loaderData);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "barnetillegg";
  const nesteSeksjonId = "personalia";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([_, value]) => value !== undefined && value !== "undefined"
  );
  const seksjonsData = JSON.stringify(Object.fromEntries(filtrertEntries));
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function Barntillegg() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const [barnFraPdl, setBarnFraPdl] = useState<Barn[]>(loaderData?.barnFraPdl || []);
  const [barnLagtManuelt, setBarnLagtManuelt] = useState<Barn[]>(loaderData?.barnLagtManuelt || []);
  const [validerBarnFraPdl, setValiderBarnFraPdl] = useState(false);
  const [manglerBarnFraPdlSvar, setManglerBarnFraPdlSvar] = useState(false);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barnetilleggSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {
      forsørgerduBarnetSomIkkeVisesHer: loaderData?.forsørgerduBarnetSomIkkeVisesHer,
    },
  });

  useNullstillSkjulteFelter<BarnetilleggSvar>(form, barnetilleggSpørsmål);

  function handleSubmit() {
    setValiderBarnFraPdl(true);
    form.validate();

    if (!manglerBarnFraPdlSvar) {
      form.submit();
    }
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <Page className="brukerdialog">
        <h2>Barnetillegg</h2>
        <BodyLong spacing>
          Hvis du forsørger barn under 18 år, eller er bidragspliktig, kan du få barnetillegg
          uavhengig av om barnet bor hos deg.
          <br />
          <br />
          Barnet må være bosatt i Norge, et annet EØS-land, Sveits eller Storbritannia. Du får ikke
          barnetillegg hvis barnet oppholder seg utenfor disse områdene mer enn 90 dager i løpet av
          12 måneder.
          <br />
          <br />
          Hvis vi har registrert noen barn på deg vises de under.
        </BodyLong>
        <VStack gap="10">
          <VStack gap="space-16">
            {barnFraPdl.map((barn, index) => (
              <BarnFraPdl
                key={index}
                barn={barn}
                validerBarnFraPdl={validerBarnFraPdl}
                setManglerBarnFraPdlSvar={setManglerBarnFraPdlSvar}
              />
            ))}
          </VStack>

          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {barnetilleggSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof BarnetilleggSvar)}
                  />
                );
              })}

              {actionData && (
                <Alert variant="error" className="mt-4">
                  {actionData.error}
                </Alert>
              )}
            </VStack>
          </Form>

          <VStack gap="space-16">
            {barnLagtManuelt?.map((barn, index) => (
              <BarnLagtManuelt key={index} barn={barn} />
            ))}
          </VStack>

          {form.value(forsørgerduBarnetSomIkkeVisesHer) === "ja" && (
            <HStack>
              <Button
                variant="secondary"
                type="submit"
                icon={<PersonPlusIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={() => navigate("/legg-til-barn")}
              >
                Legg til barn
              </Button>
            </HStack>
          )}
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
              onClick={handleSubmit}
              iconPosition="right"
              icon={<ArrowRightIcon />}
            >
              Neste steg
            </Button>
          </HStack>
        </VStack>
      </Page>
    </main>
  );
}
