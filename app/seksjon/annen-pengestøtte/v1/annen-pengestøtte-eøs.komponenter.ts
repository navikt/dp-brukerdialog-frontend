import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { endOfDay, startOfDay, subYears } from "date-fns";

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
export const fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato =
  "fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato";
export const iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato =
  "iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato";
export const iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato =
  "iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato";

export type PengestøtteFraAndreEøsLandModalSvar = {
  [hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]?:
    | typeof sykepenger
    | typeof foreldrepengerEllerSvangerskapspenger
    | typeof dagpengerEllerArbeidsledighetstrygd
    | typeof pleiepengerOmsorgspengerEllerOpplæringspenger;
  [fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]?: string;
  [mottarDuFortsattPengestøttenFraAndreEøsLand]?: string;
  [fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato]?: string;
  [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato]?: string;
  [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato]?: string;
};

export const pengestøtteFraAndreEøsLandKomponenter: KomponentType[] = [
  {
    id: harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
    type: "envalg",
    label:
      "Har du de siste 36 måneder mottatt eller søkt om pengestøtte fra EØS-land, Sveits eller Storbritannia som ligner på:",
    description:
      "<p><ul>" +
      "<li>Sykepenger</li>" +
      "<li>Foreldrepenger eller svangerskapspenger</li>" +
      "<li>Dagpenger / arbeidsledighetstrygd</li>" +
      "<li>Pleiepenger, omsorgspenger eller opplæringspenger</li>" +
      "</ul></p>",
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
      "Hvis du mottar disse pengestøttene fra utlandet, kan det ha betydning for retten din til dagpenger.",
  },
  {
    id: "harMottattEllerSøktOmPengestøtteFraAndreEøsLandForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<strong>Dine pengestøtter fra andre EØS-land</strong><br/>" +
      "Du må legge til alle pengestøttene du har mottatt fra andre EØS-land, Sveits eller Storbritannia de siste 36 månedene.",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[harMottattEllerSøktOmPengestøtteFraAndreEøsLand] === "ja",
  },
];

export const pengestøtteFraAndreEøsLandModalKomponenter: KomponentType[] = [
  {
    id: hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
    type: "envalg",
    label: "Mottar du, eller har du tidligere fått pengestøtte fra et annet EØS-land?",
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
    id: "hvilkenPengestøtteFraAndreEnnNavMottarDuInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "Har du søkt om en pengestøtte, men ikke fått søknaden behandlet ferdig, må du informere oss så snart du har fått svar.",
  },
  {
    id: "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLandDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon av pengestøtte fra et annet EØS-land",
  },
  {
    id: fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
    type: "land",
    erEøsLand: true,
    label:
      "Hvilket land har du mottatt eller søkt om pengestøtten fra i løpet av de siste 36 månedene?",
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
    id: fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato,
    type: "dato",
    label: "Fra hvilken dato har du mottatt pengestøtten?",
    fraOgMed: startOfDay(subYears(new Date(), 40)),
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "ja",
  },
  {
    id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
    type: "periodeFra",
    periodeLabel: "I hvilken periode mottok du pengesøtten?",
    label: "Fra dato",
    fraOgMed: startOfDay(subYears(new Date(), 40)),
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
  },
  {
    id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
    type: "periodeTil",
    label: "Til dato",
    fraOgMed: startOfDay(subYears(new Date(), 4)),
    tilOgMed: endOfDay(new Date()),
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
  },
];
