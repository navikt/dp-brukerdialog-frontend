import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.din-situasjon";
import { dinSituasjonSchema } from "~/seksjon/din-situasjon/v1/din-situasjon.schema";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import {
  dinSituasjonKomponenter,
  DinSituasjonSvar,
  handling,
  pdfGrunnlag,
} from "./din-situasjon.komponenter";
import { SøknadFooter } from "~/components/SøknadFooter";
import invariant from "tiny-invariant";
import { GyldigHandling } from "~/utils/GyldigHandling";

export function DinSituasjonViewV1() {
  const seksjonnavn = "Din situasjon";
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: dinSituasjonSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<DinSituasjonSvar>(form, dinSituasjonKomponenter);

  const genererPdfPayload = () => {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [...lagSeksjonPayload(dinSituasjonKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  };

  function handleMellomlagring(ønsketHandling: GyldigHandling) {
    form.setValue(pdfGrunnlag, genererPdfPayload());
    form.setValue(handling, ønsketHandling);
    form.submit();
  }

  async function handleSubmit() {
    form.setValue(handling, GyldigHandling.neste);
    if (Object.values(await form.validate()).length === 0) {
      form.setValue(pdfGrunnlag, genererPdfPayload());
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
            <VStack gap="8">
              {dinSituasjonKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formScope={form.scope(komponent.id as keyof DinSituasjonSvar)}
                  />
                );
              })}

              {actionData && (
                <Alert variant="error" className="mt-4">
                  {actionData.error}
                </Alert>
              )}
            </VStack>
            <HStack gap="4" className="mt-8">
              <Button
                variant="secondary"
                type="button"
                icon={<ArrowLeftIcon aria-hidden />}
                onClick={() => handleMellomlagring(GyldigHandling.tilbakenavigering)}
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
      <SøknadFooter
        className="footer"
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(GyldigHandling.fortsettSenere)}
      />
    </div>
  );
}
