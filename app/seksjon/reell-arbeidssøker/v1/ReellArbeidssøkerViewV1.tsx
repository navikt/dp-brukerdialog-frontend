import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.reell-arbeidssoker";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import {
  handling,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidRedusertHelse,
  kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
  kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeIHeleNorgeRedusertHelse,
  kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
  pdfGrunnlag,
  reellArbeidssøkerKomponenter,
  ReellArbeidssøkerSvar,
} from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.komponenter";
import { reellArbeidssøkerSchema } from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.schema";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import invariant from "tiny-invariant";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { SøknadFooter } from "~/components/SøknadFooter";

export function ReellArbeidssøkerViewV1() {
  const seksjonnavn = "Reell arbeidssøker";
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: reellArbeidssøkerSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<ReellArbeidssøkerSvar>(form, reellArbeidssøkerKomponenter);

  function handleMellomlagring(ønsketHandling: Seksjonshandling) {
    const dokumentasjonskrav = hentDokumentasjonskrav();

    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(handling, ønsketHandling);
    form.setValue(
      "dokumentasjonskrav",
      dokumentasjonskrav.length > 0 ? JSON.stringify(dokumentasjonskrav) : "null"
    );
    form.submit();
  }

  async function handleSubmit() {
    const dokumentasjonskrav = hentDokumentasjonskrav();

    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(handling, Seksjonshandling.neste);
    form.setValue(
      "dokumentasjonskrav",
      dokumentasjonskrav.length > 0 ? JSON.stringify(dokumentasjonskrav) : "null"
    );
    form.submit();
  }

  function hentDokumentasjonskrav() {
    const jobbDeltidOgHeltidDokumentasjonskrav = hentJobbHeltidOgDeltidDokumentasjonskrav();
    const jobbHeleNorgeDokumentasjonskrav = hentJobbHeleNorgeDokumentasjonskrav();
    const kanTaAlleTyperArbeidDokumentasjonskrav = hentKanTaAlleTyperArbeidDokumentasjonskrav();

    return [
      ...jobbDeltidOgHeltidDokumentasjonskrav,
      ...jobbHeleNorgeDokumentasjonskrav,
      ...kanTaAlleTyperArbeidDokumentasjonskrav,
    ];
  }

  function hentKanTaAlleTyperArbeidDokumentasjonskrav(): Dokumentasjonskrav[] {
    if (form.value(kanDuTaAlleTyperArbeid) === "nei") {
      const dokumentasjonskrav: Dokumentasjonskrav = {
        id: crypto.randomUUID(),
        seksjonId: "reell-arbeidssoker",
        spørsmålId: kanDuTaAlleTyperArbeid,
        skjemakode: "T9",
        tittel: "Bekreftelse fra lege eller annen behandler fordi du ikke kan ta alle typer arbeid",
        type: DokumentasjonskravType.ReellArbeidssøkerKanIkkeTaAlleTyperArbeid,
      };

      return [dokumentasjonskrav];
    }

    return [];
  }

  function hentJobbHeltidOgDeltidDokumentasjonskrav(): Dokumentasjonskrav[] {
    const skjemaSvar = form.value(kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg) || [];
    const skjemaSvarArray = [skjemaSvar].flat().filter(Boolean);

    const svarSomKanTriggesDokumentasjonskrav = [
      kanIkkeJobbeHeltidOgDeltidRedusertHelse,
      kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
      kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
    ];

    const dokumentasjonskravTrigges = skjemaSvarArray.some((valgt) =>
      svarSomKanTriggesDokumentasjonskrav.includes(valgt)
    );

    if (dokumentasjonskravTrigges) {
      const dokumentasjonskrav: Dokumentasjonskrav = {
        id: crypto.randomUUID(),
        seksjonId: "reell-arbeidssoker",
        spørsmålId: kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
        skjemakode: "T9",
        tittel: "Bekreftelse fra relevant fagpersonell fordi du bare kan jobbe deltid",
        type: DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid,
      };

      return [dokumentasjonskrav];
    }

    return [];
  }

  function hentJobbHeleNorgeDokumentasjonskrav(): Dokumentasjonskrav[] {
    const skjemaSvar = form.value(kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg) || [];
    const skjemaSvarArray = [skjemaSvar].flat().filter(Boolean);

    const svarSomKanTriggesDokumentasjonskrav = [
      kanIkkeJobbeIHeleNorgeRedusertHelse,
      kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
      kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
    ];

    const dokumentasjonskravTrigges = skjemaSvarArray.some((valgt) =>
      svarSomKanTriggesDokumentasjonskrav.includes(valgt)
    );

    if (dokumentasjonskravTrigges) {
      const dokumentasjonskrav: Dokumentasjonskrav = {
        id: crypto.randomUUID(),
        seksjonId: "reell-arbeidssoker",
        spørsmålId: kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
        skjemakode: "T9",
        tittel: "Bekreftelse fra relevant fagpersonell fordi du ikke kan jobbe i hele Norge",
        type: DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeleNorge,
      };

      return [dokumentasjonskrav];
    }

    return [];
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
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
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
        className="footer"
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
