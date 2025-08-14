import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
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
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { dinSituasjonSchema } from "~/routes-oppsett/din-situasjon/din-situasjon.schema";
import {
  dinSituasjonSporsmal,
  DinSituasjonSvar,
} from "~/routes-oppsett/din-situasjon/din-situasjon.sporsmal";
import { hentDefaultValues } from "~/utils/seksjon.util";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "din-situasjon");

  if (response.status !== 200) {
    return data(undefined);
  }

  const loaderData: DinSituasjonSvar = await response.json();
  return data(loaderData);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "din-situasjon";
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

export default function DinSituasjon() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: dinSituasjonSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: hentDefaultValues<DinSituasjonSvar>(loaderData),
  });

  useNullstillSkjulteFelter<DinSituasjonSvar>(form, dinSituasjonSporsmal);

  return (
    <Page className="brukerdialog">
      <h2>Din situasjon</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {dinSituasjonSporsmal.map((sporsmal) => {
                // Skip rendering if the question should not be shown based on current answers
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Sporsmal
                    key={sporsmal.id}
                    sporsmal={sporsmal}
                    formScope={form.scope(sporsmal.id as keyof DinSituasjonSvar)}
                  />
                );
              })}

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
    </Page>
  );
}
