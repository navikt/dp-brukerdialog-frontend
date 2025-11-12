import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";

export const harMottattEllerSøktOmPengestøtteFraAndreEøsLand =
  "harMottattEllerSøktOmPengestøtteFraAndreEøsLand";
export const hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand =
  "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand";
export const fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte =
  "fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte";
export const sykepenger = "sykepenger";
export const foreldrepengerEllerSvangerskapspenger = "foreldrepengerEllerSvangerskapspenger";
export const dagpengerEllerArbeidsledighetstrygd = "dagpengerEllerArbeidsledighetstrygd";
export const pleiepengerOmsorgspengerEllerOpplæringspenger =
  "pleiepengerOmsorgspengerEllerOpplæringspenger";
export const mottarDuFortsattPengestøttenFraAndreEøsLand =
  "mottarDuFortsattPengestøttenFraAndreEøsLand";
export const fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed =
  "fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed";
export const iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed =
  "iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed";
export const iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed =
  "iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed";

export type PengestøtteFraAndreEøsLandModalSvar = {
  [hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]?:
    | typeof sykepenger
    | typeof foreldrepengerEllerSvangerskapspenger
    | typeof dagpengerEllerArbeidsledighetstrygd
    | typeof pleiepengerOmsorgspengerEllerOpplæringspenger;
  [fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]?: string;
  [mottarDuFortsattPengestøttenFraAndreEøsLand]?: string;
  [fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed]?: string;
  [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed]?: string;
  [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed]?: string;
};

export const pengestøtteFraAndreEøsLandKomponenter: KomponentType[] = [
  {
    id: harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
    type: "envalg",
    label:
      "Har du de siste 36 måneder motatt pengestøtte fra EØS-land, Sveits eller Storbritania som ligner på",
    description:
      "<ul><li>Sykepenger</li><li>Foreldrepenger eller svangerskapspenger</li><li>Dagpenger / arbeidsledighetstrygd</li><li>Pleiepenger, omsorgspenger eller opplæringspenger</li></ul>",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "harMottattPengestøtteFraAndreEØSLandLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette",
    description:
      "Med utgangspunkt i en vedvarende agenda dokumenteres oppfølgingen som en følge av resultatoppnåelsen.",
  },
  {
    id: "harMottattEllerSøktOmPengestøtteFraAndreEøsLandForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<strong>Dine pengestøtter fra EØS land</strong><br/>" +
      "Du må legge til alle trygdeytelser fra EØS-land, Sveits eller Storbritannia du har mottatt eller søkt på de siste 36 måneder",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[harMottattEllerSøktOmPengestøtteFraAndreEøsLand] === "ja",
  },
];

export const pengestøtteFraAndreEøsLandModalKomponenter: KomponentType[] = [
  {
    id: hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
    type: "envalg",
    label: "Hvilke utenlandske pengestøtte har du mottatt eller søkt om?",
    options: [
      { value: sykepenger, label: "Sykepenger" },
      {
        value: foreldrepengerEllerSvangerskapspenger,
        label: "Foreldrepenger eller svangerskapspenger",
      },
      { value: dagpengerEllerArbeidsledighetstrygd, label: "Dagpenger / arbeidsledighetstrygd" },
      {
        value: pleiepengerOmsorgspengerEllerOpplæringspenger,
        label: "Pleiepenger, omsorgspenger eller opplæringspenger",
      },
    ],
  },
  {
    id: "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLandVarsel",
    type: "dokumentasjonskravindikator",
    label:
      "Dokumentasjon på hvilken periode du har hatt, mottatt eller har søkt om pengestøtte fra et EØS-land, Sveits eller Storbritannia",
  },
  {
    id: fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
    type: "land",
    label: "Fra hvilket land har du mottatt eller søkt om pengestøtten?",
  },
  {
    id: mottarDuFortsattPengestøttenFraAndreEøsLand,
    type: "envalg",
    label: "Mottar du fortsatt pengestøtten?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed,
    type: "dato",
    label: "Fra og med hvilken dato har du mottatt pengestøtten?",
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "ja",
  },
  {
    id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
    type: "periodeFra",
    periodeLabel: "I hvilken periode har du mottatt eller søkt om pengestøtten?",
    label: "Fra og med",
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
  },
  {
    id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
    type: "periodeTil",
    label: "Til og med",
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
  },
];
