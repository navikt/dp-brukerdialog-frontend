import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const harTilleggsopplysninger = "harTilleggsopplysninger";
export const tilleggsopplysninger = "tilleggsopplysninger";

export type TilleggsopplysningerSvar = {
  [harTilleggsopplysninger]?: "ja" | "nei";
  [tilleggsopplysninger]?: string;
};

export const tilleggsopplysningerSpørsmål: KomponentType[] = [
  {
    id: harTilleggsopplysninger,
    type: "envalg",
    label: "Har du noen flere opplysninger du mener er viktige for søknaden din?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: tilleggsopplysninger,
    type: "langTekst",
    label: "Skriv inn tilleggsopplysninger her (maks 500 tegn)",
    maxLength: 500,
    visHvis: (svar: TilleggsopplysningerSvar) => svar.harTilleggsopplysninger === "ja",
  },
];
