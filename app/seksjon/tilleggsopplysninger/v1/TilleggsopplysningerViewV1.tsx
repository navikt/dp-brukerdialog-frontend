import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, ErrorMessage, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import invariant from "tiny-invariant";
import { Komponent } from "~/components/Komponent";
import { SistOppdatert } from "~/components/SistOppdatert";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.tilleggsopplysninger";
import {
  handling,
  pdfGrunnlag,
  tilleggsopplysningerKomponenter,
  TilleggsopplysningerSvar,
} from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.komponenter";
import { tilleggsopplysningerSchema } from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.schema";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export function TilleggsopplysningerViewV1() {
  const seksjonnavn = "Tilleggsopplysninger";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: tilleggsopplysningerSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<TilleggsopplysningerSvar>(form, tilleggsopplysningerKomponenter);

  const genererPdfPayload = () => {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [...lagSeksjonPayload(tilleggsopplysningerKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  };

  function handleMellomlagring(ønsketHandling: Seksjonshandling) {
    form.setValue(pdfGrunnlag, genererPdfPayload());
    form.setValue(handling, ønsketHandling);
    form.submit();
  }

  async function handleSubmit() {
    form.setValue(handling, Seksjonshandling.neste);

    if (Object.values(await form.validate()).length === 0) {
      form.setValue(pdfGrunnlag, genererPdfPayload());
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="6">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>
        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
          <VStack gap="6">
            {tilleggsopplysningerKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formScope={form.scope(komponent.id as keyof TilleggsopplysningerSvar)}
                />
              );
            })}
          </VStack>

          {actionData && <ErrorMessage>{actionData.error}</ErrorMessage>}

          <VStack className="seksjon-navigasjon" gap="4">
            <SistOppdatert />
            <HStack gap="4">
              <Button
                variant="secondary"
                type="button"
                icon={<ArrowLeftIcon aria-hidden />}
                onClick={() => handleMellomlagring(Seksjonshandling.tilbakenavigering)}
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
          </VStack>
        </Form>
      </VStack>
      <SøknadFooter
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
