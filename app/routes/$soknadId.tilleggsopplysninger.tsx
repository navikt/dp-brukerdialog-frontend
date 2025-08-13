import invariant from "tiny-invariant";
import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { useForm } from "@rvf/react-router";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigate,
  useParams,
} from "react-router";
import { z } from "zod";
import {
  harTilleggsopplysninger,
  tilleggsopplysninger,
  tilleggsopplysningerSpørsmål,
  TilleggsopplysningerSvar,
} from "~/regelsett/tilleggsopplysninger";
import { useEffect } from "react";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  console.info("oiwejfioewjf");

  const formData = await request.formData();
  const seksjonId = "tilleggsopplysninger";
  const nesteSeksjonId = "sammendrag";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function Tilleggsopplysninger() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const schema = z
    .object({
      [harTilleggsopplysninger]: z.enum(["ja", "nei"]).optional(),
      [tilleggsopplysninger]: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      tilleggsopplysningerSpørsmål.forEach((sporsmal) => {
        const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
        const sporsmalId = sporsmal.id as keyof TilleggsopplysningerSvar;
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

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: schema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {},
  });

  // Fjern verdier for alle felter som ikke er synlige (basert på visHvis).
  // Dette sikrer at kun relevante svar sendes til backend og at formData ikke inneholder "gamle" eller skjulte felt.
  // Kalles automatisk hver gang formverdier endres.
  useEffect(() => {
    const values = form.value();

    tilleggsopplysningerSpørsmål.forEach((sporsmal) => {
      const sporsmalId = sporsmal.id as keyof TilleggsopplysningerSvar;
      if (sporsmal.visHvis && !sporsmal.visHvis(values) && values[sporsmalId] !== undefined) {
        form.setValue(sporsmalId, undefined);
      }
    });
  }, [form.value()]);

  return (
    <Page className="brukerdialog">
      <h2>Tilleggsopplysninger</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <VStack gap="8">
            {tilleggsopplysningerSpørsmål.map((sporsmal) => {
              // Skip rendering if the question should not be shown based on current answers
              if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                return null;
              }

              return (
                <Sporsmal
                  key={sporsmal.id}
                  sporsmal={sporsmal}
                  formScope={form.scope(sporsmal.id as keyof TilleggsopplysningerSvar)}
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
