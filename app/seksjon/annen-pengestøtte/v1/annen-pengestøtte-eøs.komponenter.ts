import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { endOfDay, startOfDay, subYears } from "date-fns";
import { TFunction } from "i18next";

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

export function lagPengestøtteFraAndreEøsLandKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
      type: "envalg",
      label: t("eøs.mottar.label"),
      description: t("eøs.mottar.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: "harMottattPengestøtteFraAndreEØSLandLesMer",
      type: "lesMer",
      label: t("eøs.mottar.lesMer.label"),
      description: t("eøs.mottar.lesMer.description"),
    },
    {
      id: "harMottattEllerSøktOmPengestøtteFraAndreEøsLandForklarendeTekst",
      type: "forklarendeTekst",
      description: t("eøs.mottar.forklarendeTekst"),
      visHvis: (svar: AnnenPengestøtteSvar) =>
        svar[harMottattEllerSøktOmPengestøtteFraAndreEøsLand] === "ja",
    },
  ];
}

export function lagPengestøtteFraAndreEøsLandModalKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
      type: "envalg",
      label: t("eøs.modal.hvilken.label"),
      options: [
        { value: sykepenger, label: t("eøs.modal.hvilken.options.sykepenger") },
        {
          value: foreldrepengerEllerSvangerskapspenger,
          label: t("eøs.modal.hvilken.options.foreldrepenger"),
        },
        {
          value: dagpengerEllerArbeidsledighetstrygd,
          label: t("eøs.modal.hvilken.options.dagpenger"),
        },
        {
          value: pleiepengerOmsorgspengerEllerOpplæringspenger,
          label: t("eøs.modal.hvilken.options.pleiepenger"),
        },
      ],
    },
    {
      id: "hvilkenPengestøtteFraAndreEnnNavMottarDuInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("eøs.modal.informasjonskort.label"),
      description: t("eøs.modal.informasjonskort.description"),
    },
    {
      id: "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLandDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("eøs.modal.dokumentasjonskrav.label"),
    },
    {
      id: fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
      type: "land",
      erEøsLand: true,
      label: t("eøs.modal.land.label"),
    },
    {
      id: mottarDuFortsattPengestøttenFraAndreEøsLand,
      type: "envalg",
      label: t("eøs.modal.mottarFortsatt.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato,
      type: "dato",
      label: t("eøs.modal.fraNår.label"),
      fraOgMed: startOfDay(subYears(new Date(), 40)),
      visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
        svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "ja",
    },
    {
      id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
      type: "periodeFra",
      periodeLabel: t("eøs.modal.periode.periodeLabel"),
      label: t("eøs.modal.periode.fraDato"),
      referanseId: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
      fraOgMed: startOfDay(subYears(new Date(), 40)),
      visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
        svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
    },
    {
      id: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
      type: "periodeTil",
      label: t("eøs.modal.periode.tilDato"),
      referanseId: iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
      fraOgMed: startOfDay(subYears(new Date(), 4)),
      tilOgMed: endOfDay(new Date()),
      visHvis: (svar: PengestøtteFraAndreEøsLandModalSvar) =>
        svar[mottarDuFortsattPengestøttenFraAndreEøsLand] === "nei",
    },
  ];
}
