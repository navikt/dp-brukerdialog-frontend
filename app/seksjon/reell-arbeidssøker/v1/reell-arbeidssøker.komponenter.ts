import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const kanDuJobbeBådeHeltidOgDeltid = "kanDuJobbeBådeHeltidOgDeltid";
export const kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg =
  "kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg";
export const kanIkkeJobbeHeltidOgDeltidRedusertHelse = "kanIkkeJobbeHeltidOgDeltidRedusertHelse";
export const kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr =
  "kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr";
export const kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie =
  "kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie";
export const kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse =
  "kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse";
export const kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov =
  "kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov";
export const kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov =
  "kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov";
export const kanIkkeJobbeHeltidOgDeltidJegErPermittert =
  "kanIkkeJobbeHeltidOgDeltidJegErPermittert";
export const kanIkkeJobbeHeltidOgDeltidHarFylt60 = "kanIkkeJobbeHeltidOgDeltidHarFylt60";
export const kanIkkeJobbeHeltidOgDeltidAnnenSituasjon = "kanIkkeJobbeHeltidOgDeltidAnnenSituasjon";
export const kanIkkeJobbeBådeHeltidOgDeltidAntallTimer =
  "kanIkkeJobbeBådeHeltidOgDeltidAntallTimer";
export const kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen =
  "kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen";
export const kanDuJobbeIHeleNorge = "kanDuJobbeIHeleNorge";
export const kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg =
  "kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg";
export const kanIkkeJobbeIHeleNorgeRedusertHelse = "kanIkkeJobbeIHeleNorgeRedusertHelse";
export const kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr =
  "kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr";
export const kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie =
  "kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie";
export const kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse =
  "kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse";
export const kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov =
  "kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov";
export const kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov =
  "kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov";
export const kanIkkeJobbeIHeleNorgeJegErPermittert = "kanIkkeJobbeIHeleNorgeJegErPermittert";
export const kanIkkeJobbeIHeleNorgeHarFylt60 = "kanIkkeJobbeIHeleNorgeHarFylt60";
export const kanIkkeJobbeIHeleNorgeAnnenSituasjon = "kanIkkeJobbeIHeleNorgeAnnenSituasjon";
export const kanIkkeJobbeIHeleNorgeKortOmSituasjonen = "kanIkkeJobbeIHeleNorgeKortOmSituasjonen";
export const kanDuTaAlleTyperArbeid = "kanDuTaAlleTyperArbeid";
export const kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa =
  "kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa";
export const erDuVilligTilÅBytteYrkeEllerGåNedILønn = "erDuVilligTilÅBytteYrkeEllerGåNedILønn";
export const handling = "handling";

export type ReellArbeidssøkerSvar = {
  [kanDuJobbeBådeHeltidOgDeltid]?: "ja" | "nei";
  [kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?: Array<
    | typeof kanIkkeJobbeHeltidOgDeltidRedusertHelse
    | typeof kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr
    | typeof kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie
    | typeof kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse
    | typeof kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
    | typeof kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
    | typeof kanIkkeJobbeHeltidOgDeltidJegErPermittert
    | typeof kanIkkeJobbeHeltidOgDeltidHarFylt60
    | typeof kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
  >;
  [kanIkkeJobbeBådeHeltidOgDeltidAntallTimer]?: string;
  [kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen]?: string;
  [kanDuJobbeIHeleNorge]?: "ja" | "nei";
  [kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?: Array<
    | typeof kanIkkeJobbeIHeleNorgeRedusertHelse
    | typeof kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr
    | typeof kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie
    | typeof kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse
    | typeof kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
    | typeof kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
    | typeof kanIkkeJobbeIHeleNorgeJegErPermittert
    | typeof kanIkkeJobbeIHeleNorgeHarFylt60
    | typeof kanIkkeJobbeIHeleNorgeAnnenSituasjon
  >;
  [kanDuTaAlleTyperArbeid]?: "ja" | "nei";
  [kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa]?: string;
  [erDuVilligTilÅBytteYrkeEllerGåNedILønn]?: "ja" | "nei";
};

export function lagReellArbeidssøkerKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: "reellArbeidssøkerForklarendeTekst",
      type: "forklarendeTekst",
      description: t("reellArbeidssøkerForklarendeTekst.description"),
    },
    {
      id: kanDuTaAlleTyperArbeid,
      type: "envalg",
      label: t("kanDuTaAlleTyperArbeid.label"),
      description: t("kanDuTaAlleTyperArbeid.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: "kanDuTaAlleTyperArbeidLesMer",
      type: "lesMer",
      label: t("kanDuTaAlleTyperArbeidLesMer.label"),
      description: t("kanDuTaAlleTyperArbeidLesMer.description"),
    },
    {
      id: "kanDuTaAlleTyperArbeidInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("kanDuTaAlleTyperArbeidInformasjonskort.label"),
      description: t("kanDuTaAlleTyperArbeidInformasjonskort.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
    },
    {
      id: kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa,
      type: "langTekst",
      label: t("kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa.label"),
      maksLengde: 500,
      visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
    },
    {
      id: "kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTaDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t(
        "kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTaDokumentasjonskravindikator.label"
      ),
      visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
    },
    {
      id: erDuVilligTilÅBytteYrkeEllerGåNedILønn,
      type: "envalg",
      label: t("erDuVilligTilÅBytteYrkeEllerGåNedILønn.label"),
      description: t("erDuVilligTilÅBytteYrkeEllerGåNedILønn.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: "erDuVilligTilÅBytteYrkeEllerGåNedILønnInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("erDuVilligTilÅBytteYrkeEllerGåNedILønnInformasjonskort.label"),
      description: t("erDuVilligTilÅBytteYrkeEllerGåNedILønnInformasjonskort.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[erDuVilligTilÅBytteYrkeEllerGåNedILønn] === "nei",
    },
    {
      id: kanDuJobbeBådeHeltidOgDeltid,
      type: "envalg",
      label: t("kanDuJobbeBådeHeltidOgDeltid.label"),
      description: t("kanDuJobbeBådeHeltidOgDeltid.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
      type: "flervalg",
      label: t("kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.label"),
      description: t("kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.description"),
      options: [
        {
          value: kanIkkeJobbeHeltidOgDeltidRedusertHelse,
          label: t("kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.redusertHelse"),
        },
        {
          value: kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
          label: t(
            "kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.omsorgForBarnUnderEttÅr"
          ),
        },
        {
          value: kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie,
          label: t(
            "kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.omsorgForPleietrengendeINærFamilie"
          ),
        },
        {
          value: kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
          label: t(
            "kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.eneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse"
          ),
        },
        {
          value:
            kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
          label: t(
            "kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.eneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov"
          ),
        },
        {
          value:
            kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
          label: t(
            "kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.denAndreForeldrenJobberSkiftEllerLignende"
          ),
        },
        {
          value: kanIkkeJobbeHeltidOgDeltidJegErPermittert,
          label: t("kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.jegErPermittert"),
        },
        {
          value: kanIkkeJobbeHeltidOgDeltidHarFylt60,
          label: t("kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.harFylt60"),
        },
        {
          value: kanIkkeJobbeHeltidOgDeltidAnnenSituasjon,
          label: t("kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg.svar.annenSituasjon"),
        },
      ],
      visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
    },
    {
      id: "kanIkkeJobbeHeltidOgDeltidJegErPermittertInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("kanIkkeJobbeHeltidOgDeltidJegErPermittertInformasjonskort.label"),
      description: t("kanIkkeJobbeHeltidOgDeltidJegErPermittertInformasjonskort.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidJegErPermittert
        ) || false,
    },
    {
      id: "kanIkkeJobbeHeltidOgDeltidHarFylt60Informasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("kanIkkeJobbeHeltidOgDeltidHarFylt60Informasjonskort.label"),
      description: t("kanIkkeJobbeHeltidOgDeltidHarFylt60Informasjonskort.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidHarFylt60
        ) || false,
    },
    {
      id: "kanIkkeJobbeHeltidOgDeltidAnnenSituasjonInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("kanIkkeJobbeHeltidOgDeltidAnnenSituasjonInformasjonskort.label"),
      description: t("kanIkkeJobbeHeltidOgDeltidAnnenSituasjonInformasjonskort.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
        ) || false,
    },
    {
      id: "kanIkkeJobbeHeltidOgDeltidDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("kanIkkeJobbeHeltidOgDeltidDokumentasjonskravindikator.label"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidRedusertHelse
        ) ||
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie
        ) ||
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
        ) ||
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
        ) ||
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
        ) ||
        false,
    },
    {
      id: kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen,
      type: "langTekst",
      label: t("kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen.label"),
      maksLengde: 500,
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidJegErPermittert
        ) ||
        svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
        ) ||
        false,
    },
    {
      id: kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
      type: "tall",
      label: t("kanIkkeJobbeBådeHeltidOgDeltidAntallTimer.label"),
      description: t("kanIkkeJobbeBådeHeltidOgDeltidAntallTimer.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
    },
    {
      id: "kanIkkeJobbeBådeHeltidOgDeltidAntallTimerLesMer",
      type: "lesMer",
      label: t("kanIkkeJobbeBådeHeltidOgDeltidAntallTimerLesMer.label"),
      description: t("kanIkkeJobbeBådeHeltidOgDeltidAntallTimerLesMer.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
    },
    {
      id: kanDuJobbeIHeleNorge,
      type: "envalg",
      label: t("kanDuJobbeIHeleNorge.label"),
      description: t("kanDuJobbeIHeleNorge.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
      type: "flervalg",
      label: t("kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.label"),
      description: t("kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.description"),
      options: [
        {
          value: kanIkkeJobbeIHeleNorgeRedusertHelse,
          label: t("kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.redusertHelse"),
        },
        {
          value: kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr,
          label: t("kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.omsorgForBarnUnderEttÅr"),
        },
        {
          value: kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie,
          label: t(
            "kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.omsorgForPleietrengendeINærFamilie"
          ),
        },
        {
          value: kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
          label: t(
            "kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.eneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse"
          ),
        },
        {
          value: kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
          label: t(
            "kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.eneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov"
          ),
        },
        {
          value:
            kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
          label: t(
            "kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.denAndreForeldrenJobberSkiftEllerLignende"
          ),
        },
        {
          value: kanIkkeJobbeIHeleNorgeJegErPermittert,
          label: t("kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.jegErPermittert"),
        },
        {
          value: kanIkkeJobbeIHeleNorgeHarFylt60,
          label: t("kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.harFylt60"),
        },
        {
          value: kanIkkeJobbeIHeleNorgeAnnenSituasjon,
          label: t("kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg.svar.annenSituasjon"),
        },
      ],
      visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeIHeleNorge] === "nei",
    },
    {
      id: "kanIkkeJobbeIHeleNorgeSitasjonenSomGjelderDegLesMer",
      type: "lesMer",
      label: t("kanIkkeJobbeIHeleNorgeSitasjonenSomGjelderDegLesMer.label"),
      description: t("kanIkkeJobbeIHeleNorgeSitasjonenSomGjelderDegLesMer.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeIHeleNorge] === "nei",
    },
    {
      id: "kanIkkeJobbeIHeleNorgeJegErPermittertInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("kanIkkeJobbeIHeleNorgeJegErPermittertInformasjonskort.label"),
      description: t("kanIkkeJobbeIHeleNorgeJegErPermittertInformasjonskort.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeJegErPermittert
        ) || false,
    },
    {
      id: "kanIkkeJobbeIHeleNorgeHarFylt60Informasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("kanIkkeJobbeIHeleNorgeHarFylt60Informasjonskort.label"),
      description: t("kanIkkeJobbeIHeleNorgeHarFylt60Informasjonskort.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeHarFylt60
        ) || false,
    },
    {
      id: "kanIkkeJobbeIHeleNorgeAnnenSituasjonInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("kanIkkeJobbeIHeleNorgeAnnenSituasjonInformasjonskort.label"),
      description: t("kanIkkeJobbeIHeleNorgeAnnenSituasjonInformasjonskort.description"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeAnnenSituasjon
        ) || false,
    },
    {
      id: "kanIkkeJobbeIHeleNorgeDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("kanIkkeJobbeIHeleNorgeDokumentasjonskravindikator.label"),
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeRedusertHelse
        ) ||
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie
        ) ||
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
        ) ||
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
        ) ||
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeAnnenSituasjon
        ) ||
        false,
    },
    {
      id: kanIkkeJobbeIHeleNorgeKortOmSituasjonen,
      type: "langTekst",
      label: t("kanIkkeJobbeIHeleNorgeKortOmSituasjonen.label"),
      maksLengde: 500,
      visHvis: (svar: ReellArbeidssøkerSvar) =>
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeJegErPermittert
        ) ||
        svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
          kanIkkeJobbeIHeleNorgeAnnenSituasjon
        ) ||
        false,
    },
  ];
}
