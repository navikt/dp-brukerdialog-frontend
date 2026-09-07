import { BodyLong as BodyShort } from "@navikt/ds-react";
import { addMonths, endOfDay, startOfDay, subMonths } from "date-fns";
import type { TFunction } from "i18next";
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

export function lagDinSituasjonKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene,
      type: "envalg",
      label: t("dagpengerSiste52Uker.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
        { value: "vetikke", label: t("envalg.svar.vetIkke") },
      ],
    },
    {
      id: årsakTilAtDagpengeneBleStanset,
      type: "langTekst",
      label: t("årsakTilAtDagpengeneBleStanset.label"),
      description: t("årsakTilAtDagpengeneBleStanset.description"),
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
      description: <BodyShort spacing>{t("gjenopptakFraDato.lesMer.description")}</BodyShort>,
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
      description: (
        <>
          <BodyShort spacing>{t("dagpengerFraDato.lesMer.description.beregning")}</BodyShort>
          <BodyShort spacing>
            <strong>{t("dagpengerFraDato.lesMer.description.eksempelTittel")}</strong>
            <br />
            {t("dagpengerFraDato.lesMer.description.eksempel")}
          </BodyShort>
          <BodyShort>{t("dagpengerFraDato.lesMer.description.helg")}</BodyShort>
        </>
      ),
      visHvis: (svar: DinSituasjonSvar) =>
        svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "nei" ||
        svar[harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene] === "vetikke",
    },
  ];
}
