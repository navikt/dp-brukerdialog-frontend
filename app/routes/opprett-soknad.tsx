import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Box, Button, Checkbox, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, redirect, useActionData } from "react-router";
import { z } from "zod";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import { Route } from "./+types/opprett-soknad";

export async function action({ request }: Route.ActionArgs) {
  const response = await opprettSoknad(request);

  if (!response.ok) {
    return {
      error: "Feil ved opprettelse av søknad",
    };
  }

  const soknadId = await response.text();

  return redirect(`/${soknadId}/din-situasjon`);
}

export default function OpprettSoknad() {
  const actionData = useActionData<typeof action>();

  const form = useForm({
    method: "post",
    submitSource: "state",
    validationBehaviorConfig: {
      initial: "onChange",
      whenTouched: "onChange",
      whenSubmitted: "onChange",
    },
    schema: z.object({
      checkbox: z.boolean().refine((val) => val, {
        message: "Du må godta vilkårene",
      }),
    }),
    defaultValues: {
      checkbox: false,
    },
  });

  return (
    <main id="maincontent" tabIndex={-1}>
      <h1>Søknad om dagpenger</h1>
      <p>
        Dagpenger er økonomisk støtte på veien tilbake til arbeid. For å ha rett til dagpenger, må
        du fylle noen krav. Her kan du lese om du har rett til dagpenger.
      </p>
      <h3>Vi trenger riktige opplysninger for å vurdere om du har rett til dagpenger</h3>
      <VStack gap="4">
        <Form {...form.getFormProps()}>
          <Box padding="4" background="surface-warning-subtle" borderRadius="medium">
            <Checkbox name="checkbox" error={!!form.error("checkbox")}>
              Jeg bekrefter at jeg vil svare så riktig som jeg kan
            </Checkbox>
          </Box>
          {form.error("checkbox") && (
            <Alert variant="error" className="mt-4">
              {form.error("checkbox")}
            </Alert>
          )}

          {actionData && actionData.error && (
            <Alert variant="error" className="mt-4">
              {actionData.error}
            </Alert>
          )}

          <Button
            iconPosition="right"
            className="mt-4"
            icon={<ArrowRightIcon aria-hidden />}
            type="submit"
          >
            Start søknad
          </Button>
        </Form>
      </VStack>
    </main>
  );
}
