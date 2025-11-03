import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.tilleggsopplysninger";
import { tilleggsopplysningerSchema } from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.schema";
import {
  erTilbakenavigering,
  pdfGrunnlag,
  tilleggsopplysningerSpørsmål,
  TilleggsopplysningerSvar,
} from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.spørsmål";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function TilleggsopplysningerViewV1() {
  const seksjonnavn = "Tilleggsopplysninger";
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: tilleggsopplysningerSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
  });

  useNullstillSkjulteFelter<TilleggsopplysningerSvar>(form, tilleggsopplysningerSpørsmål);

  const genererPdfPayload = () => {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [
        ...lagSeksjonPayload(tilleggsopplysningerSpørsmål, form.transient.value()),
      ],
    };

    return JSON.stringify(pdfPayload);
  }

  function handleTilbakenavigering() {
    form.setValue(pdfGrunnlag, genererPdfPayload());
    form.setValue(erTilbakenavigering, true);
    form.submit();
  }

  async function handleSubmit() {
    if (Object.values(await form.validate()).length === 0) {
      form.setValue(pdfGrunnlag, genererPdfPayload());
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <VStack gap="8">
            <input type="hidden" name="versjon" value={loaderData.versjon} />
            {tilleggsopplysningerSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof TilleggsopplysningerSvar)}
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
          </VStack>
        </Form>
      </VStack>
    </div>
  );
}
