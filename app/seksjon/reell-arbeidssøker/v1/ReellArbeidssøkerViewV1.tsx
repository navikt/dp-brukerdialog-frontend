import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, List, VStack } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.reell-arbeidssoker";
import { reellArbeidssøkerSchema } from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.schema";
import {
  erTilbakenavigering,
  pdfGrunnlag,
  reellArbeidssøkerKomponenter,
  ReellArbeidssøkerSvar,
} from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.komponenter";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function ReellArbeidssøkerViewV1() {
  const seksjonnavn = "Reell arbeidssøker";
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: reellArbeidssøkerSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
  });

  useNullstillSkjulteFelter<ReellArbeidssøkerSvar>(form, reellArbeidssøkerKomponenter);

  function handleTilbakenavigering() {
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(erTilbakenavigering, true);
    form.submit();
  }

  async function handleSubmit() {
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.submit();
  }

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [...lagSeksjonPayload(reellArbeidssøkerKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  }
  return (
    <div className="innhold">
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={loaderData.versjon} />
          <VStack gap="8">
            {reellArbeidssøkerKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formScope={form.scope(komponent.id as keyof ReellArbeidssøkerSvar)}
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
