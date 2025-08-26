import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router";
import invariant from "tiny-invariant";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { utdanningSchema } from "~/seksjon-regelsett/utdanning/utdanning.schema";
import { utdanningSpørsmål, UtdanningSvar } from "~/seksjon-regelsett/utdanning/utdanning.spørsmål";
import { parseLoaderData } from "~/utils/loader.utils";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "utdanning");

  if (response.status !== 200) {
    return undefined;
  }

  const loaderData: UtdanningSvar = await response.json();

  return parseLoaderData(loaderData);
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
  const actionData = useActionData<typeof action>();
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
    defaultValues: loaderData ?? {},
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
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof UtdanningSvar)}
                  />
                );
              })}
            </VStack>

            {actionData && (
              <Alert variant="error" className="mt-4">
                {actionData.error}
              </Alert>
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
