import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const forsørgerduBarnet = "forsørgerduBarnet";
export const forsørgerduBarnetSomIkkeVisesHer = "forsørgerduBarnetSomIkkeVisesHer";

export type Barn = {
  fornavnOgMellomnavn?: string;
  etternavn?: string;
  fodselsnummer: Date;
  bostedsland?: string;
  forsørgerduBarnet?: boolean;
  dokumentereForsørgerNå?: string;
  dokumententasjonGrunn?: string;
  hentetFraPdl?: boolean;
};

export type BarnetilleggSvar = {
  [forsørgerduBarnetSomIkkeVisesHer]?: "ja" | "nei";
};

export const barnetilleggSpørsmål: KomponentType[] = [
  {
    id: forsørgerduBarnetSomIkkeVisesHer,
    type: "envalg",
    label: "Forsørger du barnet som ikke vises her?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
];
