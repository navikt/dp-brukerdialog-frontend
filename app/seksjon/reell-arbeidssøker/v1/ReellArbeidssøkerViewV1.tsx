import { useTranslation } from "react-i18next";
import { Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useMemo } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader, SEKSJON_ID } from "~/routes/$soknadId.reell-arbeidssoker";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import {
  handling,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeHeltidOgDeltidAnnenSituasjon,
  kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie,
  kanIkkeJobbeHeltidOgDeltidRedusertHelse,
  kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
  kanIkkeJobbeIHeleNorgeAnnenSituasjon,
  kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie,
  kanIkkeJobbeIHeleNorgeRedusertHelse,
  kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
  lagReellArbeidssøkerKomponenter,
  pdfGrunnlag,
} from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.komponenter";
import type { ReellArbeidssøkerSvar } from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.komponenter";
import { reellArbeidssøkerSchema } from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.schema";
import { useSoknad } from "~/seksjon/soknad.context";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { validerSvar } from "~/utils/validering.utils";

export function ReellArbeidssøkerViewV1() {
  const { t } = useTranslation("reell-arbeidssoker");
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();

  const reellArbeidssøkerKomponenter = useMemo(() => lagReellArbeidssøkerKomponenter(t), [t]);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: reellArbeidssøkerSchema,
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<ReellArbeidssøkerSvar>(form, reellArbeidssøkerKomponenter);

  function mellomlagreSvar(ønsketHandling: Seksjonshandling) {
    const dokumentasjonskrav = hentDokumentasjonskrav();

    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(handling, ønsketHandling);
    form.setValue(
      "dokumentasjonskrav",
      dokumentasjonskrav.length > 0 ? JSON.stringify(dokumentasjonskrav) : "null"
    );
    form.submit();
  }

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

    if (klarTilLagring) {
      const dokumentasjonskrav = hentDokumentasjonskrav();
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue(handling, Seksjonshandling.neste);
      form.setValue(
        "dokumentasjonskrav",
        dokumentasjonskrav.length > 0 ? JSON.stringify(dokumentasjonskrav) : "null"
      );
      form.submit();
    }
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
        seksjonId: SEKSJON_ID,
        spørsmålId: kanDuTaAlleTyperArbeid,
        skjemakode: "T9",
        tittel: t("dokumentasjonskrav.kanIkkeTaAlleTyperArbeid.tittel"),
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
      kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie,
      kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
      kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
      kanIkkeJobbeHeltidOgDeltidAnnenSituasjon,
    ];

    const dokumentasjonskravTrigges = skjemaSvarArray.some((valgt) =>
      svarSomKanTriggesDokumentasjonskrav.includes(valgt)
    );

    if (dokumentasjonskravTrigges) {
      const dokumentasjonskrav: Dokumentasjonskrav = {
        id: crypto.randomUUID(),
        seksjonId: SEKSJON_ID,
        spørsmålId: kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
        skjemakode: "T9",
        tittel: t("dokumentasjonskrav.kanIkkeJobbeHeltidOgDeltid.tittel"),
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
      kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie,
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
        seksjonId: SEKSJON_ID,
        spørsmålId: kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
        skjemakode: "T9",
        tittel: t("dokumentasjonskrav.kanIkkeJobbeIHeleNorge.tittel"),
        type: DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeleNorge,
      };

      return [dokumentasjonskrav];
    }

    return [];
  }

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: t("side.overskrift"),
      spørsmål: [...lagSeksjonPayload(reellArbeidssøkerKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  }

  return (
    <div className="innhold">
      <title>{t("side.tittel")}</title>
      <Heading size="medium" level="2">
        {t("side.overskrift")}
      </Heading>
      <Form {...form.getFormProps()}>
        <VStack gap="space-24">
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
          {reellArbeidssøkerKomponenter.map((komponent) => {
            if (komponent.visHvis && !komponent.visHvis(form.value())) {
              return null;
            }

            return (
              <Komponent
                key={komponent.id}
                props={komponent}
                formValues={form.value()}
                formScope={form.scope(komponent.id as keyof ReellArbeidssøkerSvar)}
              />
            );
          })}

          {actionData && (
            <SeksjonTekniskFeil tittel={t("tekniskFeil.tittel")} beskrivelse={actionData.error} />
          )}
        </VStack>
      </Form>

      <SeksjonNavigasjon
        onForrigeSteg={() => mellomlagreSvar(Seksjonshandling.tilbakenavigering)}
        onNesteSteg={lagreSvar}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)} />
    </div>
  );
}
