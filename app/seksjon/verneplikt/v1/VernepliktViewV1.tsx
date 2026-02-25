import { Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import invariant from "tiny-invariant";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.verneplikt";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { handling } from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { useSoknad } from "~/seksjon/soknad.context";
import {
  avtjentVerneplikt,
  pdfGrunnlag,
  vernepliktKomponenter,
  VernepliktSvar,
} from "~/seksjon/verneplikt/v1/verneplikt.komponenter";
import { vernepliktSchema } from "~/seksjon/verneplikt/v1/verneplikt.schema";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { validerSvar } from "~/utils/validering.utils";

export default function VernepliktViewV1() {
  const seksjonnavn = "Verneplikt";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const { soknadId } = useParams();
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();

  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: vernepliktSchema,
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

  function mellomlagreSvar(ønsketHandling: Seksjonshandling) {
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(handling, ønsketHandling);
    form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
    form.submit();
  }

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

    if (klarTilLagring) {
      form.setValue(handling, Seksjonshandling.neste);
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
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
          <VStack gap="6">
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
        </Form>

        {actionData && (
          <SeksjonTekniskFeil
            tittel="Det har oppstått en teknisk feil"
            beskrivelse={actionData.error}
          />
        )}
      </VStack>

      <SeksjonNavigasjon
        onForrigeSteg={() => mellomlagreSvar(Seksjonshandling.tilbakenavigering)}
        onNesteSteg={lagreSvar}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter
        søknadId={soknadId}
        onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
