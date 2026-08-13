import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { startOfDay, subYears } from "date-fns";
import { TFunction } from "i18next";

export const mottarDuPengestøtteFraAndreEnnNav = "mottarDuPengestøtteFraAndreEnnNav";
export const hvilkenPengestøtteFraAndreEnnNavMottarDu = "hvilkenPengestøtteFraAndreEnnNavMottarDu";
export const pensjonFraAndreEnnNav = "pensjonFraAndreEnnNav";
export const dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere =
  "dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere";
export const hvemUtbetalerPengestøtten = "hvemUtbetalerPengestøtten";
export const iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato =
  "iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato";
export const iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato =
  "iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato";
export const mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver =
  "mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver";

export type PengestøtteFraNorgeModalSvar = {
  [hvilkenPengestøtteFraAndreEnnNavMottarDu]?:
    typeof pensjonFraAndreEnnNav | typeof dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere;
  [hvemUtbetalerPengestøtten]?: string;
  [iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato]?: string;
  [iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato]?: string;
};

export function lagPengestøtteFraNorgeKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: mottarDuPengestøtteFraAndreEnnNav,
      type: "envalg",
      label: t("norge.mottar.label"),
      description: t("norge.mottar.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: "mottarDuPengestøtteFraAndreEnnNavLesMer",
      type: "lesMer",
      label: t("norge.mottar.lesMer.label"),
      description: t("norge.mottar.lesMer.description"),
    },
    {
      id: "mottarDuPengestøtteFraAndreEnnNavForklarendeTekst",
      type: "forklarendeTekst",
      description: t("norge.mottar.forklarendeTekst"),
      visHvis: (svar: AnnenPengestøtteSvar) => svar[mottarDuPengestøtteFraAndreEnnNav] === "ja",
    },
  ];
}

export function lagPengestøtteFraNorgeModalKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: hvilkenPengestøtteFraAndreEnnNavMottarDu,
      type: "envalg",
      label: t("norge.modal.hvilken.label"),
      options: [
        { value: pensjonFraAndreEnnNav, label: t("norge.modal.hvilken.options.pensjon") },
        {
          value: dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
          label: t("norge.modal.hvilken.options.dagpenger"),
        },
      ],
    },
    {
      id: "hvilkenPengestøtteFraAndreEnnNavMottarDuInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("norge.modal.informasjonskort.label"),
      description: t("norge.modal.informasjonskort.description"),
    },
    {
      id: "hvilkePengestøtteFraAndreEnnNavMottarDuPensjonFraAndreEnnNavDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("norge.modal.dokumentasjonskrav.pensjon"),
      visHvis: (svar: PengestøtteFraNorgeModalSvar) =>
        svar[hvilkenPengestøtteFraAndreEnnNavMottarDu] === pensjonFraAndreEnnNav,
    },
    {
      id: "hvilkePengestøtteFraAndreEnnNavMottarDuPengestøtteFraGffDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("norge.modal.dokumentasjonskrav.gff"),
      visHvis: (svar: PengestøtteFraNorgeModalSvar) =>
        svar[hvilkenPengestøtteFraAndreEnnNavMottarDu] ===
        dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
    },
    {
      id: hvemUtbetalerPengestøtten,
      type: "kortTekst",
      label: t("norge.modal.hvemUtbetaler.label"),
      maksLengde: 200,
      visHvis: (svar: PengestøtteFraNorgeModalSvar) =>
        svar[hvilkenPengestøtteFraAndreEnnNavMottarDu] === "pensjonFraAndreEnnNav",
    },
    {
      id: iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato,
      type: "periodeFra",
      periodeLabel: t("norge.modal.periode.periodeLabel"),
      label: t("norge.modal.periode.fraDato"),
      fraOgMed: startOfDay(subYears(new Date(), 20)),
      referanseId: iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato,
    },
    {
      id: iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato,
      type: "periodeTil",
      label: t("norge.modal.periode.tilDato"),
      description: t("norge.modal.periode.tilDatoDescription"),
      optional: true,
      referanseId: iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato,
    },
  ];
}

export function lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter(
  t: TFunction
): KomponentType[] {
  return [
    {
      id: mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
      type: "envalg",
      label: t("tidligereArbeidsgiver.mottar.label"),
      description: t("tidligereArbeidsgiver.mottar.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: "mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiverLesMer",
      type: "lesMer",
      label: t("tidligereArbeidsgiver.mottar.lesMer.label"),
      description: t("tidligereArbeidsgiver.mottar.lesMer.description"),
    },
    {
      id: "mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiverForklarendeTekst",
      type: "forklarendeTekst",
      description: t("tidligereArbeidsgiver.mottar.forklarendeTekst"),
      visHvis: (svar: AnnenPengestøtteSvar) =>
        svar[mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver] === "ja",
    },
  ];
}
