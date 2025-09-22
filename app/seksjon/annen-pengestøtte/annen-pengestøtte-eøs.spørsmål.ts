import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const harMottattEllerSøktOmPengestøtteFraAndreEøsLand = "har-mottatt-eller-søkt-om-pengestøtte-fra-andre-eøs-land";
export const hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand =
  "hvilken-pengestøtte-har-du-mottatt-eller-søkt-om-fra-andre-eøs-land";
export const fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte =
  "fra-hvilket-eøs-land-har-du-mottatt-eller-søkt-om-pengestøtte";
export const sykepenger = "sykepenger";
export const foreldrepengerEllerSvangerskapspenger = "foreldrepenger-eller-svangerskapspenger";
export const dagpengerEllerArbeidsledighetstrygd = "dagpenger-eller-arbeidsledighetstrygd";
export const pleiepengerOmsorgspengerEllerOpplæringspenger =
  "pleiepenger-omsorgspenger-eller-opplæringspenger";
export const mottarDuFortsattPengestøttenFraAndreEøsLand = "mottar-du-fortsatt-pengestøtten-fra-andre-eøs-land";
export const fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed =
  "fra-når-har-du-mottatt-pengestøtte-fra-andre-eøs-land-fra-og-med";
export const iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed =
  "i-hvilken-periode-har-du-mottatt-eller-søkt-om-pengestøtte-fra-andre-eøs-land-fra-og-med";
export const iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed =
  "i-hvilken-periode-har-du-mottatt-eller-søkt-om-pengestøtte-fra-andre-eøs-land-til-og-med";

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

export const pengestøtteFraAndreEøsLandSpørsmål: KomponentType[] = [
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
];

export const pengestøtteFraAndreEøsLandModalSpørsmål: KomponentType[] = [
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
        label: "Pleiepenger, omsorgspenger eller opplæringspenger ",
      },
    ],
  },
  {
    id: "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLandVarsel",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon på hvilken periode du har hatt, mottatt eller har søkt om pengestøtte fra et EØS-land, Sveits eller Storbritannia",
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
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) => svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "ja",
  },
  {
    id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
    type: "periodeFra",
    periodeLabel: "I hvilken periode har du mottatt eller søkt om pengestøtten?",
    label: "Fra og med",
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) => svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
  },
  {
    id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
    type: "periodeTil",
    label: "Til og med",
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) => svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
  },
];
