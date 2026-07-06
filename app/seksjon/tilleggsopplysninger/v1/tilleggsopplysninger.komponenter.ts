import type { TFunction } from "i18next";
import type { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const harTilleggsopplysninger = "harTilleggsopplysninger";
export const tilleggsopplysninger = "tilleggsopplysninger";
export const handling = "handling";

export type TilleggsopplysningerSvar = {
  [harTilleggsopplysninger]?: "ja" | "nei";
  [tilleggsopplysninger]?: string;
};

type TilleggsopplysningerT = TFunction;

const jaNeiOptions = (t: TilleggsopplysningerT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagTilleggsopplysningerKomponenter = (t: TilleggsopplysningerT): KomponentType[] => [
  {
    id: harTilleggsopplysninger,
    type: "envalg",
    label: t("harTilleggsopplysninger.label"),
    options: jaNeiOptions(t),
  },
  {
    id: tilleggsopplysninger,
    type: "langTekst",
    label: t("tilleggsopplysninger.label"),
    maksLengde: 500,
    visHvis: (svar: TilleggsopplysningerSvar) => svar[harTilleggsopplysninger] === "ja",
  },
];

const fallbackT = ((key: string) => key) as unknown as TilleggsopplysningerT;

export const tilleggsopplysningerKomponenter = lagTilleggsopplysningerKomponenter(fallbackT);
