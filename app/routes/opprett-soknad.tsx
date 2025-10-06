import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Box, Button, Checkbox, VStack } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useForm } from "@rvf/react-router";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { z } from "zod";
import { SoknadIkon } from "~/components/soknadIkon";
import { useSanity } from "~/hooks/useSanity";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import { SanityReadMore } from "~/sanity/components/SanityReadMore";
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

export default function OpprettSoknadRoute() {
  const { hentInfosideTekst } = useSanity();
  const { state } = useNavigation();
  const actionData = useActionData<typeof action>();

  const innhold = hentInfosideTekst("infoside.opprett-søknad");

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
      <div className="soknad-header">
        <SoknadIkon />
        <h1>Søknad om dagpenger</h1>
      </div>

      <div className="innhold">
        {innhold?.body && (
          <PortableText value={innhold.body} components={{ types: { readMore: SanityReadMore } }} />
        )}

        <VStack gap="8" className="mt-14">
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
              className="mt-8"
              icon={<ArrowRightIcon aria-hidden />}
              type="submit"
              loading={state === "submitting" || state === "loading"}
            >
              Start søknad
            </Button>
          </Form>
        </VStack>
      </div>
    </main>
  );
}
