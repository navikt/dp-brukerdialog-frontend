import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.verneplikt";
import { vernepliktSchema } from "~/seksjon/verneplikt/v1/verneplikt.schema";
import {
  erTilbakenavigering,
  pdfGrunnlag,
  vernepliktSpørsmål,
  VernepliktSvar,
} from "~/seksjon/verneplikt/v1/verneplikt.spørsmål";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export default function VernepliktViewV1() {
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: vernepliktSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
  });

  useNullstillSkjulteFelter<VernepliktSvar>(form, vernepliktSpørsmål);

  const genererPdfGrunnlag = () => {
    const pdfPayload = {
      navn: "Verneplikt",
      spørsmål: [
        ...lagSeksjonPayload(vernepliktSpørsmål, form.transient.value()),
      ],
    };

    return JSON.stringify(pdfPayload);
  }

  function handleTilbakenavigering() {
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(erTilbakenavigering, true);
    form.submit();
  }

  async function handleSubmit() {
    if (Object.values(await form.validate()).length === 0) {
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <h2>Verneplikt</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <input type="hidden" name="versjon" value={loaderData.versjon} />
            <VStack gap="8">
              {vernepliktSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof VernepliktSvar)}
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
                type="button"
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={handleTilbakenavigering}
              >
                Forrige steg
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={handleSubmit}
                iconPosition="right"
                icon={<ArrowRightIcon />}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
    </div>
  );
}
