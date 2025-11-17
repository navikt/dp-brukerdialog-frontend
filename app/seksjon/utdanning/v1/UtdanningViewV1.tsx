import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.utdanning";
import { utdanningSchema } from "~/seksjon/utdanning/v1/utdanning.schema";
import {
  erTilbakenavigering,
  pdfGrunnlag,
  utdanningKomponenter,
  UtdanningSvar,
} from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function UtdanningViewV1() {
  const seksjonnavn = "Utdanning";
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: utdanningSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<UtdanningSvar>(form, utdanningKomponenter);

  const genererPdfGrunnlag = () => {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [...lagSeksjonPayload(utdanningKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  };

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
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
              {utdanningKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(form.value())) {
                  return null;
                }
                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formScope={form.scope(komponent.id as keyof UtdanningSvar)}
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
                icon={<ArrowLeftIcon aria-hidden />}
                onClick={handleTilbakenavigering}
                disabled={state === "submitting" || state === "loading"}
              >
                Forrige steg
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={handleSubmit}
                iconPosition="right"
                icon={<ArrowRightIcon aria-hidden />}
                disabled={state === "submitting" || state === "loading"}
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
