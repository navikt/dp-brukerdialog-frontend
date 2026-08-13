import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const harTilleggsopplysninger = "harTilleggsopplysninger";
export const tilleggsopplysninger = "tilleggsopplysninger";
export const handling = "handling";

export type TilleggsopplysningerSvar = {
  [harTilleggsopplysninger]?: "ja" | "nei";
  [tilleggsopplysninger]?: string;
};

export function lagTilleggsopplysningerKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: harTilleggsopplysninger,
      type: "envalg",
      label: t("harTilleggsopplysninger.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: tilleggsopplysninger,
      type: "langTekst",
      label: t("tilleggsopplysninger.label"),
      maksLengde: 500,
      visHvis: (svar: TilleggsopplysningerSvar) => svar[harTilleggsopplysninger] === "ja",
    },
  ];
}
