import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const handling = "handling";
export const avtjentVerneplikt = "avtjentVerneplikt";

export type VernepliktSvar = {
  [avtjentVerneplikt]?: "ja" | "nei";
};

export function lagVernepliktKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: avtjentVerneplikt,
      type: "envalg",
      label: t("avtjentVerneplikt.label"),
      description: t("avtjentVerneplikt.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: "avtjentVernepliktDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("avtjentVernepliktDokumentasjonskravindikator.label"),
      visHvis: (svar: VernepliktSvar) => svar[avtjentVerneplikt] === "ja",
    },
  ];
}
