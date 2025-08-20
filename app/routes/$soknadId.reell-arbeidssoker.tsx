import invariant from "tiny-invariant";
import { Alert, Button, HStack, List, Page, VStack } from "@navikt/ds-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
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
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { ListItem } from "@navikt/ds-react/List";
import {
  reellArbeidssøkerSpørsmål,
  ReellArbeidssøkerSvar,
} from "~/seksjon-regelsett/reell-arbeidssøker/reell-arbeidssøker.spørsmål";
import { reellArbeidssøkerSchema } from "~/seksjon-regelsett/reell-arbeidssøker/reell-arbeidssøker.schema";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { hentFormDefaultValues } from "~/utils/form.utils";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "reell-arbeidssøker");

  if (!response.ok) {
    return data(undefined);
  }

  const loaderData: ReellArbeidssøkerSvar = await response.json();

  return data(loaderData);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "reell-arbeidssoker";
  const nesteSeksjonId = "tilleggsopplysninger";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

// noinspection JSUnusedGlobalSymbols
export default function ReellArbeidssøker() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: reellArbeidssøkerSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: hentFormDefaultValues<ReellArbeidssøkerSvar>(loaderData),
  });

  useNullstillSkjulteFelter<ReellArbeidssøkerSvar>(form, reellArbeidssøkerSpørsmål);

  return (
    <Page className="brukerdialog">
      <h2>Reell arbeidssøker</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <VStack gap="8">
            <VStack>
              For å få dagpenger må du være reell arbeidssøker. Dette betyr at du som hovedregel
              <List>
                <ListItem>må være registrert som arbeidssøker</ListItem>
                <ListItem>
                  er frisk nok til å jobbe minst 50 prosent, som tilsvarer 18,75 timer i uka
                </ListItem>
                <ListItem>kan ta ethvert arbeid hvor som helst i Norge</ListItem>
              </List>
            </VStack>
            {reellArbeidssøkerSpørsmål.map((spørsmål) => {
              // Skip rendering if the question should not be shown based on current answers
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof ReellArbeidssøkerSvar)}
                />
              );
            })}

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
          </VStack>
        </Form>
      </VStack>
    </Page>
  );
}
