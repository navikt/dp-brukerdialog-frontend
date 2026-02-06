import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.utdanning";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import {
  avsluttetUtdanningSiste6Måneder,
  handling,
  pdfGrunnlag,
  utdanningKomponenter,
  UtdanningSvar,
} from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { utdanningSchema } from "~/seksjon/utdanning/v1/utdanning.schema";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { SøknadFooter } from "~/components/SøknadFooter";
import invariant from "tiny-invariant";
import { SistOppdatert } from "~/components/SistOppdatert";

export function UtdanningViewV1() {
  const seksjonnavn = "Utdanning";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: utdanningSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<UtdanningSvar>(form, utdanningKomponenter);

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [...lagSeksjonPayload(utdanningKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  }

  function hentDokumentasjonskrav() {
    const dokumentasjonskrav: Dokumentasjonskrav = {
      id: crypto.randomUUID(),
      seksjonId: "utdanning",
      spørsmålId: avsluttetUtdanningSiste6Måneder,
      skjemakode: "T2",
      tittel: "Dokumentasjon av sluttdato for utdanning",
      type: DokumentasjonskravType.Utdanning,
    };

    return form.transient.value(avsluttetUtdanningSiste6Måneder) === "ja"
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
      <VStack gap="6">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>
        <Form {...form.getFormProps()}>
          <VStack gap="6">
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

            {actionData && <Alert variant="error">{actionData.error}</Alert>}
          </VStack>

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
