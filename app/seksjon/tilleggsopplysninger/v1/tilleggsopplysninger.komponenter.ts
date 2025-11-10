import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const harTilleggsopplysninger = "harTilleggsopplysninger";
export const tilleggsopplysninger = "tilleggsopplysninger";
export const erTilbakenavigering = "erTilbakenavigering";

export type TilleggsopplysningerSvar = {
  [harTilleggsopplysninger]?: "ja" | "nei";
  [tilleggsopplysninger]?: string;
};

export const tilleggsopplysningerKomponenter: KomponentType[] = [
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
    label: "Skriv inn tilleggsopplysninger her",
    maxLength: 500,
    visHvis: (svar: TilleggsopplysningerSvar) => svar[harTilleggsopplysninger] === "ja",
  },
];
