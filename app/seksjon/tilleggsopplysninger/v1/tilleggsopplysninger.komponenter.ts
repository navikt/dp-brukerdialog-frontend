import type { TFunction } from "i18next";
import type { KomponentType } from "~/components/Komponent.types";
import { fallbackT } from "~/utils/i18n.utils";

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
        { value: "ja", label: t("felles.svar.ja") },
        { value: "nei", label: t("felles.svar.nei") },
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

export const tilleggsopplysningerKomponenter = lagTilleggsopplysningerKomponenter(
  fallbackT as TFunction
);
