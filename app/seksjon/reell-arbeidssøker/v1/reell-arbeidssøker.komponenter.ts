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
  [kanIkkeJobbeIHeleNorgeKortOmSituasjonen]?: string;
  [kanDuTaAlleTyperArbeid]?: "ja" | "nei";
  [kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa]?: string;
  [erDuVilligTilÅBytteYrkeEllerGåNedILønn]?: "ja" | "nei";
};

type ReellArbeidssøkerT = TFunction;

const jaNeiOptions = (t: ReellArbeidssøkerT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagReellArbeidssøkerKomponenter = (t: ReellArbeidssøkerT): KomponentType[] => [
  {
    id: "reellArbeidssøkerForklarendeTekst",
    type: "forklarendeTekst",
    description:
      `<p>${t("forklarendeTekst.intro")}</p>` +
      "<ul>" +
      `<li>${t("forklarendeTekst.krav.registrert")}</li>` +
      `<li>${t("forklarendeTekst.krav.friskNok")}</li>` +
      `<li>${t("forklarendeTekst.krav.tiltak")}</li>` +
      `<li>${t("forklarendeTekst.krav.alleTyperJobber")}</li>` +
      "</ul>" +
      `<p>${t("forklarendeTekst.hovedregel.intro")}</p>` +
      "<ul>" +
      `<li>${t("forklarendeTekst.hovedregel.heleNorge")}</li>` +
      `<li>${t("forklarendeTekst.hovedregel.heltidDeltid")}</li>` +
      "</ul>" +
      `<p>${t("forklarendeTekst.avslutning")}</p>`,
  },
  {
    id: kanDuTaAlleTyperArbeid,
    type: "envalg",
    label: t("kanTaAlleTyperArbeid.label"),
    description: t("kanTaAlleTyperArbeid.description"),
    options: jaNeiOptions(t),
  },
  {
    id: "kanDuTaAlleTyperArbeidLesMer",
    type: "lesMer",
    label: t("kanTaAlleTyperArbeid.lesMer.label"),
    description: t("kanTaAlleTyperArbeid.lesMer.description"),
  },
  {
    id: "kanDuTaAlleTyperArbeidInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("felles.avslagTittel"),
    description:
      `<p>${t("kanTaAlleTyperArbeid.informasjonskort.rettTilDagpenger")}</p>` +
      `<p>${t("kanTaAlleTyperArbeid.informasjonskort.manglerDokumentasjon")}</p>`,
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
  },
  {
    id: kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa,
    type: "langTekst",
    label: t("kanTaAlleTyperArbeid.hvilkeTyperArbeid.label"),
    maksLengde: 500,
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
  },
  {
    id: "kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTaDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("dokumentasjonskrav.kanIkkeTaAlleTyperArbeid.tittel"),
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
  },
  {
    id: erDuVilligTilÅBytteYrkeEllerGåNedILønn,
    type: "envalg",
    label: t("bytteYrkeEllerGaNedILonn.label"),
    description: t("bytteYrkeEllerGaNedILonn.description"),
    options: jaNeiOptions(t),
  },
  {
    id: "erDuVilligTilÅBytteYrkeEllerGåNedILønnInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("felles.avslagTittel"),
    description: `<p>${t("bytteYrkeEllerGaNedILonn.informasjonskort.description")}</p>`,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[erDuVilligTilÅBytteYrkeEllerGåNedILønn] === "nei",
  },
  {
    id: kanDuJobbeBådeHeltidOgDeltid,
    type: "envalg",
    label: t("heltidOgDeltid.label"),
    description: t("heltidOgDeltid.description"),
    options: jaNeiOptions(t),
  },
  {
    id: kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
    type: "flervalg",
    label: t("heltidOgDeltid.situasjon.label"),
    description: t("heltidOgDeltid.situasjon.description"),
    options: [
      {
        value: kanIkkeJobbeHeltidOgDeltidRedusertHelse,
        label: t("situasjonOptions.redusertHelse"),
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
        label: t("situasjonOptions.omsorgForBarnUnderEttAr"),
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie,
        label: t("situasjonOptions.omsorgForPleietrengende"),
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
        label: t("situasjonOptions.eneansvarBarnTilOgMed7Klasse"),
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
        label: t("situasjonOptions.eneansvarBarnSpesielleBehov"),
      },
      {
        value:
          kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
        label: t("situasjonOptions.annenForelderSkift"),
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidJegErPermittert,
        label: t("situasjonOptions.permittert"),
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidHarFylt60,
        label: t("situasjonOptions.harFylt60"),
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidAnnenSituasjon,
        label: t("situasjonOptions.annenSituasjon"),
      },
    ],
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidJegErPermittertInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("felles.informasjon"),
    description:
      `<p>${t("heltidOgDeltid.permittertInformasjonskort.permitteringsgrad")}</p>` +
      `<p>${t("heltidOgDeltid.permittertInformasjonskort.forklarSituasjon")}</p>` +
      `<p>${t("heltidOgDeltid.permittertInformasjonskort.giBeskjed")}</p>`,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidJegErPermittert
      ) || false,
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidHarFylt60Informasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("felles.informasjon"),
    description: `<p>${t("heltidOgDeltid.harFylt60Informasjonskort.description")}</p>`,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidHarFylt60
      ) || false,
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidAnnenSituasjonInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("felles.avslagTittel"),
    description: `<p>${t("heltidOgDeltid.annenSituasjonInformasjonskort.description")}</p>`,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
      ) || false,
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("dokumentasjonskrav.kanIkkeJobbeHeltidOgDeltid.tittel"),
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
    label: t("heltidOgDeltid.kortOmSituasjonen.label"),
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
    label: t("heltidOgDeltid.antallTimer.label"),
    description: t("heltidOgDeltid.antallTimer.description"),
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
  },
  {
    id: "kanIkkeJobbeBådeHeltidOgDeltidAntallTimerLesMer",
    type: "lesMer",
    label: t("heltidOgDeltid.antallTimer.lesMer.label"),
    description: t("heltidOgDeltid.antallTimer.lesMer.description"),
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
  },
  {
    id: kanDuJobbeIHeleNorge,
    type: "envalg",
    label: t("heleNorge.label"),
    description: t("heleNorge.description"),
    options: jaNeiOptions(t),
  },
  {
    id: kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
    type: "flervalg",
    label: t("heleNorge.situasjon.label"),
    description: t("heleNorge.situasjon.description"),
    options: [
      {
        value: kanIkkeJobbeIHeleNorgeRedusertHelse,
        label: t("situasjonOptions.redusertHelse"),
      },
      {
        value: kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr,
        label: t("situasjonOptions.omsorgForBarnUnderEttAr"),
      },
      {
        value: kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie,
        label: t("situasjonOptions.omsorgForPleietrengende"),
      },
      {
        value: kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
        label: t("situasjonOptions.eneansvarBarnTilOgMed7Klasse"),
      },
      {
        value: kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
        label: t("situasjonOptions.eneansvarBarnSpesielleBehov"),
      },
      {
        value:
          kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
        label: t("situasjonOptions.annenForelderSkiftHeleNorge"),
      },
      {
        value: kanIkkeJobbeIHeleNorgeJegErPermittert,
        label: t("situasjonOptions.permittert"),
      },
      {
        value: kanIkkeJobbeIHeleNorgeHarFylt60,
        label: t("situasjonOptions.harFylt60"),
      },
      {
        value: kanIkkeJobbeIHeleNorgeAnnenSituasjon,
        label: t("situasjonOptions.annenSituasjon"),
      },
    ],
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeIHeleNorge] === "nei",
  },
  {
    id: "kanIkkeJobbeIHeleNorgeSitasjonenSomGjelderDegLesMer",
    type: "lesMer",
    label: t("heleNorge.ingenPasserLesMer.label"),
    description: t("heleNorge.ingenPasserLesMer.description"),
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeIHeleNorge] === "nei",
  },
  {
    id: "kanIkkeJobbeIHeleNorgeJegErPermittertInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("felles.informasjon"),
    description:
      `<p>${t("heleNorge.permittertInformasjonskort.tilgjengelighet")}</p>` +
      `<p>${t("heleNorge.permittertInformasjonskort.forklarSituasjon")}</p>` +
      `<p>${t("heleNorge.permittertInformasjonskort.giBeskjed")}</p>`,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeJegErPermittert
      ) || false,
  },
  {
    id: "kanIkkeJobbeIHeleNorgeHarFylt60Informasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("felles.informasjon"),
    description: `<p>${t("heleNorge.harFylt60Informasjonskort.description")}</p>`,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeHarFylt60
      ) || false,
  },
  {
    id: "kanIkkeJobbeIHeleNorgeAnnenSituasjonInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("felles.avslagTittel"),
    description: `<p>${t("heleNorge.annenSituasjonInformasjonskort.description")}</p>`,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeAnnenSituasjon
      ) || false,
  },
  {
    id: "kanIkkeJobbeIHeleNorgeDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("dokumentasjonskrav.kanIkkeJobbeIHeleNorge.tittel"),
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
    label: t("heleNorge.kortOmSituasjonen.label"),
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

const fallbackT = ((key: string) => key) as unknown as ReellArbeidssøkerT;

export const reellArbeidssøkerKomponenter = lagReellArbeidssøkerKomponenter(fallbackT);
