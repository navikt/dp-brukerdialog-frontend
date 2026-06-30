import type { TFunction } from "i18next";
import { addMonths, endOfDay, startOfDay, subMonths } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene =
  "harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene";
export const årsakTilAtDagpengeneBleStanset = "årsakTilAtDagpengeneBleStanset";
export const hvilkenDatoSøkerDuDagpengerFra = "hvilkenDatoSøkerDuDagpengerFra";
export const hvilkenDatoSøkerDuGjenopptakFra = "hvilkenDatoSøkerDuGjenopptakFra";
export const handling = "handling";

export type DinSituasjonSvar = {
  [harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene]?: "ja" | "nei" | "vetikke";
  [årsakTilAtDagpengeneBleStanset]?: string;
  [hvilkenDatoSøkerDuDagpengerFra]?: string;
  [hvilkenDatoSøkerDuGjenopptakFra]?: string;
};

type DinSituasjonT = TFunction;

const jaNeiVetIkkeOptions = (t: DinSituasjonT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
  { value: "vetikke", label: t("felles.svar.vetIkke") },
];

export const lagDinSituasjonKomponenter = (t: DinSituasjonT): KomponentType[] => [
  {
    id: harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene,
    type: "envalg",
    label: t("dagpengerSiste52Uker.label"),
    options: jaNeiVetIkkeOptions(t),
  },
  {
    id: årsakTilAtDagpengeneBleStanset,
    type: "langTekst",
    label: t("arsakTilAtDagpengeneBleStanset.label"),
    description: t("arsakTilAtDagpengeneBleStanset.description"),
    maksLengde: 500,
    visHvis: (svar: DinSituasjonSvar) =>
      svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "ja",
  },
  {
    id: hvilkenDatoSøkerDuGjenopptakFra,
    type: "dato",
    label: t("gjenopptakFraDato.label"),
    description: t("gjenopptakFraDato.description"),
    fraOgMed: startOfDay(subMonths(new Date(), 6)),
    tilOgMed: endOfDay(addMonths(new Date(), 3)),
    visHvis: (svar: DinSituasjonSvar) =>
      svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "ja",
  },
  {
    id: "hvilkenDatoSøkerDuGjenopptakFraLesMer",
    type: "lesMer",
    label: t("gjenopptakFraDato.lesMer.label"),
    description: t("gjenopptakFraDato.lesMer.description"),
    visHvis: (svar: DinSituasjonSvar) =>
      svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "ja",
  },
  {
    id: hvilkenDatoSøkerDuDagpengerFra,
    type: "dato",
    label: t("dagpengerFraDato.label"),
    description: t("dagpengerFraDato.description"),
    fraOgMed: startOfDay(subMonths(new Date(), 6)),
    tilOgMed: endOfDay(addMonths(new Date(), 3)),
    visHvis: (svar: DinSituasjonSvar) =>
      svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "nei" ||
      svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "vetikke",
  },
  {
    id: "hvilkenDatoSøkerDuDagpengerFraLesMer",
    type: "lesMer",
    label: t("dagpengerFraDato.lesMer.label"),
    description:
      `<p>${t("dagpengerFraDato.lesMer.description.beregning")}</p>` +
      `<p><strong>${t("dagpengerFraDato.lesMer.description.eksempelTittel")}</strong><br/>${t(
        "dagpengerFraDato.lesMer.description.eksempel"
      )}</p>` +
      `<p>${t("dagpengerFraDato.lesMer.description.helg")}</p>`,
    visHvis: (svar: DinSituasjonSvar) =>
      svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "nei" ||
      svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "vetikke",
  },
];

const fallbackT = ((key: string) => key) as unknown as DinSituasjonT;

export const dinSituasjonKomponenter = lagDinSituasjonKomponenter(fallbackT);
