import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Box, Button, Checkbox, VStack } from "@navikt/ds-react";
import { useForm } from "react-hook-form";
import { Form, redirect, useActionData, useFetcher } from "react-router";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import { OpprettSoknadFormValuesType, opprettSoknadSchema } from "~/schemas/opprett-soknad.schema";

export async function action() {
  const response = await opprettSoknad();

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
  const fetcher = useFetcher();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpprettSoknadFormValuesType>({
    resolver: yupResolver(opprettSoknadSchema),
    defaultValues: {
      checkbox: false,
    },
  });

  function onSubmit(data: OpprettSoknadFormValuesType) {
    fetcher.submit(data, {
      method: "POST",
      action: "/opprett-soknad",
    });
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <h1>Søknad om dagpenger</h1>
      <p>
        Dagpenger er økonomisk støtte på veien tilbake til arbeid. For å ha rett til dagpenger, må
        du fylle noen krav. Her kan du lese om du har rett til dagpenger.
      </p>
      <h3>Vi trenger riktige opplysninger for å vurdere om du har rett til dagpenger</h3>
      <VStack gap="4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box padding="4" background="surface-warning-subtle" borderRadius="medium">
            <Checkbox {...register("checkbox")}>
              Jeg bekrefter at jeg vil svare så riktig som jeg kan
            </Checkbox>
          </Box>

          {errors.checkbox?.message && (
            <Alert variant="error" className="mt-4">
              {errors.checkbox?.message}
            </Alert>
          )}

          {actionData && actionData.error && (
            <Alert variant="error" className="mt-4">
              {actionData.error}
            </Alert>
          )}

          <Button
            type="submit"
            iconPosition="right"
            className="mt-4"
            icon={<ArrowRightIcon aria-hidden />}
          >
            Start søknad
          </Button>
        </Form>
      </VStack>
    </main>
  );
}
