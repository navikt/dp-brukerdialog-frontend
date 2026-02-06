import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Box, Button, Checkbox, Heading, VStack } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useForm } from "@rvf/react-router";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { z } from "zod";
import { SøknadIkon } from "~/components/SøknadIkon";
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

  return redirect(`/${soknadId}/personalia`);
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
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
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
      <title>Søknad om dagpenger</title>
      <div className="soknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          Søknad om dagpenger
        </Heading>
      </div>

      <div className="innhold">
        {innhold?.body && (
          <PortableText value={innhold.body} components={{ types: { readMore: SanityReadMore } }} />
        )}

        <VStack gap="8" className="mt-14">
          <Form {...form.getFormProps()}>
            <Box.New
              padding="4"
              background={!!form.value("checkbox") ? "success-moderate" : "sunken"}
              borderRadius="medium"
            >
              <Checkbox name="checkbox" error={!!form.error("checkbox")}>
                Jeg bekrefter at jeg vil svare så riktig som jeg kan
              </Checkbox>
            </Box.New>

            {actionData && actionData.error && <Alert variant="error">{actionData.error}</Alert>}

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
