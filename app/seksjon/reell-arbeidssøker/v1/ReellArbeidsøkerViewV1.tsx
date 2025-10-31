import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, List, VStack } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.reell-arbeidssoker";
import { reellArbeidssøkerSchema } from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.schema";
import {
  erTilbakenavigering,
  pdfGrunnlag,
  reellArbeidssøkerSpørsmål,
  ReellArbeidssøkerSvar,
} from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.spørsmål";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function ReellArbeidssøkerViewV1() {
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

  useNullstillSkjulteFelter<ReellArbeidssøkerSvar>(form, reellArbeidssøkerSpørsmål);

  const genererPdfGrunnlag = () => {
    const pdfPayload = {
      navn: "Reell Arbeidssøker",
      spørsmål: [
        ...lagSeksjonPayload(reellArbeidssøkerSpørsmål, form.transient.value()),
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
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.submit()
  }

  return (
    <div className="innhold">
      <h2>Reell arbeidssøker</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={loaderData.versjon} />
          <VStack gap="8">
            <VStack>
              For å få dagpenger må du være reell arbeidssøker. Dette betyr at du som hovedregel
              <List>
                <ListItem>må være registrert som arbeidssøker</ListItem>
                <ListItem>
                  er frisk nok til å jobbe minst 50 prosent, som tilsvarer 18,75 timer i uka
                </ListItem>
                <ListItem>kan ta ethvert arbeid hvor som helst i Norge</ListItem>
              </List>
            </VStack>
            {reellArbeidssøkerSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof ReellArbeidssøkerSvar)}
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
