import invariant from "tiny-invariant";
import { Button, HStack, Page, Textarea } from "@navikt/ds-react";
import { useState } from "react";
import JaNeiFaktum from "~/components/sporsmal/jaNeiFaktum";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { useForm } from "@rvf/react-router";
import { ActionFunctionArgs, Form, useParams } from "react-router";
import { z } from "zod";

export async function action({ request, params }: ActionFunctionArgs) {
  const form = await request.formData();
  console.log("For param: ", params.soknadId);
}

export default function Tilleggsopplysninger() {
  const params = useParams();
  invariant(params.soknadId);

  const [harTilleggsopplysninger, setHarTilleggsopplysninger] = useState<boolean | undefined>(
    undefined
  );

  const form = useForm({
    method: "post",
    submitSource: "state",
    schema: z.object({
      harTilleggsopplysninger: z.boolean(),
      tilleggsopplysninger: z.string().max(500, "Maks 500 tegn").optional(),
    }),
    validationBehaviorConfig: {
      initial: "onChange",
      whenTouched: "onChange",
      whenSubmitted: "onChange",
    },
    defaultValues: {
      harTilleggsopplysninger: false,
      tilleggsopplysninger: undefined,
    },
  });

  return (
    <Page className="brukerdialog">
      <h2>Tilleggsopplysninger</h2>

      <Form {...form.getFormProps()}>
        <JaNeiFaktum
          ledetekst="Har du noen flere opplysninger du mener er viktige for søknaden din?"
          aktiv={true}
          verdi={harTilleggsopplysninger}
          vedEndring={setHarTilleggsopplysninger}
          name="harTilleggsopplysninger"
        />

        {harTilleggsopplysninger && (
          <Textarea
            label="Skriv inn tilleggsopplysninger her"
            name="tilleggsopplysninger"
            maxLength={500}
          />
        )}

        <HStack gap="4" className="mt-8">
          <Button variant="secondary" icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}>
            Forrige steg
          </Button>
          <Button variant="primary" type="submit" iconPosition="right" icon={<ArrowRightIcon />}>
            Neste steg
          </Button>
        </HStack>
      </Form>
    </Page>
  );
}
