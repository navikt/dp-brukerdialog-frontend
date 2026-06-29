import type { TFunction } from "i18next";
import { startOfDay, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";

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

type AnnenPengestotteT = TFunction<"annen-pengestotte">;

export type PengestøtteFraNorgeModalSvar = {
  [hvilkenPengestøtteFraAndreEnnNavMottarDu]?:
    | typeof pensjonFraAndreEnnNav
    | typeof dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere;
  [hvemUtbetalerPengestøtten]?: string;
  [iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato]?: string;
  [iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato]?: string;
};

const jaNeiOptions = (t: AnnenPengestotteT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagPengestøtteFraNorgeKomponenter = (t: AnnenPengestotteT): KomponentType[] => [
  {
    id: mottarDuPengestøtteFraAndreEnnNav,
    type: "envalg",
    label: t("norge.mottarDuPengestotte.label"),
    description:
      "<p><ul>" +
      `<li>${t("norge.mottarDuPengestotte.description.pensjon")}</li>` +
      `<li>${t("norge.mottarDuPengestotte.description.gff")}</li>` +
      "</ul></p>",
    options: jaNeiOptions(t),
  },
  {
    id: "mottarDuPengestøtteFraAndreEnnNavLesMer",
    type: "lesMer",
    label: t("norge.mottarDuPengestotte.lesMer.label"),
    description: t("norge.mottarDuPengestotte.lesMer.description"),
  },
  {
    id: "mottarDuPengestøtteFraAndreEnnNavForklarendeTekst",
    type: "forklarendeTekst",
    description:
      `<strong>${t("norge.forklarendeTekst.tittel")}</strong><br />` +
      t("norge.forklarendeTekst.description"),
    visHvis: (svar: AnnenPengestøtteSvar) => svar[mottarDuPengestøtteFraAndreEnnNav] === "ja",
  },
];

export const lagPengestøtteFraNorgeModalKomponenter = (t: AnnenPengestotteT): KomponentType[] => [
  {
    id: hvilkenPengestøtteFraAndreEnnNavMottarDu,
    type: "envalg",
    label: t("norge.modal.hvilkenPengestotte.label"),
    options: [
      {
        value: pensjonFraAndreEnnNav,
        label: t("norge.modal.hvilkenPengestotte.options.pensjonFraAndreEnnNav"),
      },
      {
        value: dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
        label: t("norge.modal.hvilkenPengestotte.options.gff"),
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
    label: t("norge.modal.dokumentasjonskrav.pensjonFraAndreEnnNav"),
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
      svar[hvilkenPengestøtteFraAndreEnnNavMottarDu] === pensjonFraAndreEnnNav,
  },
  {
    id: iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato,
    type: "periodeFra",
    periodeLabel: t("norge.modal.periode.label"),
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

export const lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter = (
  t: AnnenPengestotteT
): KomponentType[] => [
  {
    id: mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
    type: "envalg",
    label: t("fraTidligereArbeidsgiver.mottarAndreUtbetalinger.label"),
    description: t("fraTidligereArbeidsgiver.mottarAndreUtbetalinger.description"),
    options: jaNeiOptions(t),
  },
  {
    id: "mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiverLesMer",
    type: "lesMer",
    label: t("fraTidligereArbeidsgiver.mottarAndreUtbetalinger.lesMer.label"),
    description: t("fraTidligereArbeidsgiver.mottarAndreUtbetalinger.lesMer.description"),
  },
  {
    id: "mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiverForklarendeTekst",
    type: "forklarendeTekst",
    description:
      `<strong>${t("fraTidligereArbeidsgiver.forklarendeTekst.tittel")}</strong><br />` +
      t("fraTidligereArbeidsgiver.forklarendeTekst.description"),
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver] === "ja",
  },
];

const fallbackT = ((key: string) => key) as unknown as AnnenPengestotteT;

export const pengestøtteFraNorgeKomponenter = lagPengestøtteFraNorgeKomponenter(fallbackT);

export const pengestøtteFraNorgeModalKomponenter =
  lagPengestøtteFraNorgeModalKomponenter(fallbackT);

export const mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter =
  lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter(fallbackT);
