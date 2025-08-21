import { EnvalgSpørsmål, KomponentType } from "~/components/spørsmål/spørsmål.types";

export const forsørgerDuBarnet = "forsørgerDuBarnet";
export const forsørgerDuBarnetSomIkkeVisesHer = "forsørgerDuBarnetSomIkkeVisesHer";

export type Barn = {
  fornavnOgMellomnavn?: string;
  etternavn?: string;
  fodselsnummer: Date;
  bostedsland?: string;
  forsørgerDuBarnet?: "ja" | "nei";
  dokumentereForsørgerNå?: string;
  dokumententasjonGrunn?: string;
  hentetFraPdl?: "ja" | "nei";
};

export type BarnetilleggSvar = {
  [forsørgerDuBarnetSomIkkeVisesHer]?: "ja" | "nei";
};

export const barnetilleggSpørsmål: KomponentType[] = [
  {
    id: forsørgerDuBarnetSomIkkeVisesHer,
    type: "envalg",
    label: "Forsørger du barnet som ikke vises her?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
];

export const barnFraPdlSpørsmål: EnvalgSpørsmål = {
  id: forsørgerDuBarnet,
  type: "envalg",
  label: "Forsørger du barnet som ikke vises her?",
  options: [
    { value: "ja", label: "Ja" },
    { value: "nei", label: "Nei" },
  ],
};
