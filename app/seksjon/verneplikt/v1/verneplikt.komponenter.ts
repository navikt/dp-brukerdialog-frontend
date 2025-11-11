import { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const erTilbakenavigering = "erTilbakenavigering";
export const avtjentVerneplikt = "avtjentVerneplikt";

export type VernepliktSvar = {
  [avtjentVerneplikt]?: "ja" | "nei";
};

export const vernepliktKomponenter: KomponentType[] = [
  {
    id: avtjentVerneplikt,
    type: "envalg",
    label: "Har du avtjent verneplikt i minst tre måneder de siste tolv månedene?",
    description:
      "Du kan ha rett til dagpenger hvis du har avtjent militærtjeneste eller obligatorisk sivilforsvarstjeneste i minst tre av de siste tolv månedene.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "avtjentVernepliktDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Tjenestebevis",
    visHvis: (svar: VernepliktSvar) => svar[avtjentVerneplikt] === "ja",
  },
];
