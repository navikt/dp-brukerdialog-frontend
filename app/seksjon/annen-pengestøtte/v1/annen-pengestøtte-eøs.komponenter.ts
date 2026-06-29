import type { TFunction } from "i18next";
import { endOfDay, startOfDay, subYears } from "date-fns";
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
export const fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato =
  "fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato";
export const iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato =
  "iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato";
export const iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato =
  "iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato";

type AnnenPengestotteT = TFunction<"annen-pengestotte">;

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

const jaNeiOptions = (t: AnnenPengestotteT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagPengestøtteFraAndreEøsLandKomponenter = (t: AnnenPengestotteT): KomponentType[] => [
  {
    id: harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
    type: "envalg",
    label: t("eos.harMottattEllerSokt.label"),
    description:
      "<p><ul>" +
      `<li>${t("eos.harMottattEllerSokt.description.sykepenger")}</li>` +
      `<li>${t("eos.harMottattEllerSokt.description.foreldrepenger")}</li>` +
      `<li>${t("eos.harMottattEllerSokt.description.dagpenger")}</li>` +
      `<li>${t("eos.harMottattEllerSokt.description.pleiepenger")}</li>` +
      "</ul></p>",
    options: jaNeiOptions(t),
  },
  {
    id: "harMottattPengestøtteFraAndreEØSLandLesMer",
    type: "lesMer",
    label: t("eos.harMottattEllerSokt.lesMer.label"),
    description: t("eos.harMottattEllerSokt.lesMer.description"),
  },
  {
    id: "harMottattEllerSøktOmPengestøtteFraAndreEøsLandForklarendeTekst",
    type: "forklarendeTekst",
    description:
      `<strong>${t("eos.forklarendeTekst.tittel")}</strong><br/>` +
      t("eos.forklarendeTekst.description"),
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[harMottattEllerSøktOmPengestøtteFraAndreEøsLand] === "ja",
  },
];

export const lagPengestøtteFraAndreEøsLandModalKomponenter = (
  t: AnnenPengestotteT
): KomponentType[] => [
  {
    id: hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
    type: "envalg",
    label: t("eos.modal.hvilkenPengestotte.label"),
    options: [
      { value: sykepenger, label: t("eos.modal.hvilkenPengestotte.options.sykepenger") },
      {
        value: foreldrepengerEllerSvangerskapspenger,
        label: t("eos.modal.hvilkenPengestotte.options.foreldrepenger"),
      },
      {
        value: dagpengerEllerArbeidsledighetstrygd,
        label: t("eos.modal.hvilkenPengestotte.options.dagpenger"),
      },
      {
        value: pleiepengerOmsorgspengerEllerOpplæringspenger,
        label: t("eos.modal.hvilkenPengestotte.options.pleiepenger"),
      },
    ],
  },
  {
    id: "hvilkenPengestøtteFraAndreEnnNavMottarDuInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("eos.modal.informasjonskort.label"),
    description: t("eos.modal.informasjonskort.description"),
  },
  {
    id: "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLandDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("eos.modal.dokumentasjonskrav.label"),
  },
  {
    id: fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
    type: "land",
    erEøsLand: true,
    label: t("eos.modal.land.label"),
  },
  {
    id: mottarDuFortsattPengestøttenFraAndreEøsLand,
    type: "envalg",
    label: t("eos.modal.mottarFortsatt.label"),
    options: jaNeiOptions(t),
  },
  {
    id: fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato,
    type: "dato",
    label: t("eos.modal.fraNar.label"),
    fraOgMed: startOfDay(subYears(new Date(), 40)),
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "ja",
  },
  {
    id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
    type: "periodeFra",
    periodeLabel: t("eos.modal.periode.label"),
    label: t("eos.modal.periode.fraDato"),
    referanseId: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
    fraOgMed: startOfDay(subYears(new Date(), 40)),
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
  },
  {
    id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
    type: "periodeTil",
    label: t("eos.modal.periode.tilDato"),
    referanseId: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
    fraOgMed: startOfDay(subYears(new Date(), 4)),
    tilOgMed: endOfDay(new Date()),
    visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
      svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
  },
];

const fallbackT = ((key: string) => key) as unknown as AnnenPengestotteT;

export const pengestøtteFraAndreEøsLandKomponenter =
  lagPengestøtteFraAndreEøsLandKomponenter(fallbackT);

export const pengestøtteFraAndreEøsLandModalKomponenter =
  lagPengestøtteFraAndreEøsLandModalKomponenter(fallbackT);
