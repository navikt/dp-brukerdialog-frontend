import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.reell-arbeidssoker";
import {
  handling,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidRedusertHelse,
  kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
  kanIkkeJobbeIHeleNorgeAnnenSituasjon,
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
import { SistOppdatert } from "~/components/SistOppdatert";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

export function ReellArbeidssøkerViewV1() {
  const seksjonnavn = "Reell arbeidssøker";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
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
      initial: "onSubmit",
      whenTouched: "onSubmit",
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
      kanIkkeJobbeIHeleNorgeAnnenSituasjon,
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
      <title>{seksjonHeadTitle}</title>
      <Heading size="medium" level="2">
        {seksjonnavn}
      </Heading>
      <Form {...form.getFormProps()}>
        <VStack gap="6">
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
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

          {actionData && <Alert variant="error">{actionData.error}</Alert>}
        </VStack>
      </Form>

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
      <SøknadFooter
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
