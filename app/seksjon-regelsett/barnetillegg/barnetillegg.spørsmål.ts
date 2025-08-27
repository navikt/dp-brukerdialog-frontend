import { EnvalgSpørsmål, KomponentType } from "~/components/spørsmål/spørsmål.types";

export const forsørgerDuBarnet = "forsørgerDuBarnet";
export const forsørgerDuBarnetSomIkkeVisesHer = "forsørgerDuBarnetSomIkkeVisesHer";
export const payload = "payload";

export type Barn = {
  fornavnOgMellomnavn: string;
  etternavn: string;
  fødselsdato: string;
  bostedsland: string;
  forsørgerDuBarnet?: "ja" | "nei";
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

export const fornavnOgMellomnavn = "fornavnOgMellomnavn";
export const etternavn = "etternavn";
export const fødselsdato = "fødselsdato";
export const bostedsland = "bostedsland";
export const lesMerOmBarnetBosted = "lesMerOmBarnetBosted";

export type LeggTilBarnManueltSvar = {
  [fornavnOgMellomnavn]?: string;
  [etternavn]?: string;
  [fødselsdato]?: string;
  [bostedsland]?: string;
};

export const leggTilBarnManueltSpørsmål: KomponentType[] = [
  {
    id: fornavnOgMellomnavn,
    type: "kortTekst",
    label: "Fornavn og mellomnavn",
  },
  {
    id: etternavn,
    type: "kortTekst",
    label: "Etternavn",
  },
  {
    id: fødselsdato,
    type: "dato",
    label: "Fødselsdato",
  },
  {
    id: bostedsland,
    type: "land",
    label: "Hvilket land bor barnet i?",
  },
  {
    id: lesMerOmBarnetBosted,
    type: "lesMer",
    label: "Les mer om barnets bosted",
    description: "Her kan du lese mer om hvordan vi behandler informasjon om barnets bosted.",
  },
];
