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
import { hentDefaultValues } from "~/utils/seksjon.utils";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { bostedslandSchema } from "~/seksjon-regelsett/bostedsland/bostedsland.schema";
import {
  bostedslandSporsmal,
  BostedslandSvar,
} from "~/seksjon-regelsett/bostedsland/bostedsland.sporsmal";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "bostedsland");

  if (!response.ok) {
    return data(undefined);
  }

  const loaderData: BostedslandSvar = await response.json();

  return data(loaderData);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "bostedsland";
  const nesteSeksjonId = "tilleggsopplysninger";
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

export default function Bostedsland() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: bostedslandSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: hentDefaultValues<BostedslandSvar>(loaderData),
  });

  useNullstillSkjulteFelter<BostedslandSvar>(form, bostedslandSporsmal);

  return (
    <Page className="brukerdialog">
      <h2>Bostedsland</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {bostedslandSporsmal.map((sporsmal) => {
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                  return null;
                }
                return (
                  <Sporsmal
                    key={sporsmal.id}
                    sporsmal={sporsmal}
                    formScope={form.scope(sporsmal.id as keyof BostedslandSvar)}
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
