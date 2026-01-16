import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import invariant from "tiny-invariant";
import { Komponent } from "~/components/Komponent";
import { SistOppdatert } from "~/components/SistOppdatert";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.verneplikt";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { handling } from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import {
  avtjentVerneplikt,
  pdfGrunnlag,
  vernepliktKomponenter,
  VernepliktSvar,
} from "~/seksjon/verneplikt/v1/verneplikt.komponenter";
import { vernepliktSchema } from "~/seksjon/verneplikt/v1/verneplikt.schema";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export default function VernepliktViewV1() {
  const seksjonnavn = "Verneplikt";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: vernepliktSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<VernepliktSvar>(form, vernepliktKomponenter);

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [...lagSeksjonPayload(vernepliktKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  }

  function hentDokumentasjonskrav() {
    const dokumentasjonskrav: Dokumentasjonskrav = {
      id: crypto.randomUUID(),
      seksjonId: "verneplikt",
      spørsmålId: avtjentVerneplikt,
      tittel: "Tjenestebevis",
      skjemakode: "T3",
      type: DokumentasjonskravType.Tjenestebevis,
    };

    return form.transient.value("avtjentVerneplikt") === "ja"
      ? JSON.stringify([dokumentasjonskrav])
      : "null";
  }

  function handleMellomlagring(ønsketHandling: Seksjonshandling) {
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(handling, ønsketHandling);
    form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
    form.submit();
  }

  async function handleSubmit() {
    form.setValue(handling, Seksjonshandling.neste);

    if (Object.values(await form.validate()).length === 0) {
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="20">
        <VStack gap="6">
          <Heading size="medium" level="2">
            {seksjonnavn}
          </Heading>
          <Form {...form.getFormProps()}>
            <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
            <VStack gap="8">
              {vernepliktKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formScope={form.scope(komponent.id as keyof VernepliktSvar)}
                  />
                );
              })}
            </VStack>

            {actionData && (
              <Alert variant="error" className="mt-4">
                {actionData.error}
              </Alert>
            )}

            <VStack className="mt-8" gap="4">
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
      </VStack>
      <SøknadFooter
        className="footer"
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
