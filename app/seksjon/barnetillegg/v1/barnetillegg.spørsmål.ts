import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const forsørgerDuBarnSomIkkeVisesHer = "forsørgerDuBarnSomIkkeVisesHer";
export const erTilbakenavigering = "erTilbakenavigering";
export const dokumentasjonskrav = "dokumentasjonskrav";
export const versjon = "versjon";

export type BarnLagtManuelt = {
  id: string;
  [fornavnOgMellomnavn]: string;
  [etternavn]: string;
  [fødselsdato]: string;
  [bostedsland]: string;
  [dokumentasjonskrav]?: string[];
};

export type BarnFraPdl = {
  id: string;
  [fornavnOgMellomnavn]: string;
  [etternavn]: string;
  [fødselsdato]: string;
  [bostedsland]: string;
  [forsørgerDuBarnet]?: "ja" | "nei";
};

export type BarnetilleggSvar = {
  [forsørgerDuBarnSomIkkeVisesHer]?: "ja" | "nei";
};

export const barnetilleggKomponenter: KomponentType[] = [
  {
    id: forsørgerDuBarnSomIkkeVisesHer,
    type: "envalg",
    label: "Forsørger du barn som ikke vises her?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
];

export const fornavnOgMellomnavn = "fornavnOgMellomnavn";
export const etternavn = "etternavn";
export const fødselsdato = "fødselsdato";
export const bostedsland = "bostedsland";
export const forsørgerDuBarnet = "forsørgerDuBarnet";

export const barnFraPdlSpørsmål: KomponentType[] = [
  {
    id: fornavnOgMellomnavn,
    type: "registeropplysning",
  },
  {
    id: etternavn,
    type: "registeropplysning",
  },
  {
    id: fødselsdato,
    type: "registeropplysning",
  },
  {
    id: bostedsland,
    type: "registeropplysning",
  },
  {
    id: forsørgerDuBarnet,
    type: "envalg",
    label: "Forsørger du barnet?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
];

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
    id: "lesMerOmBarnetBostedLesMer",
    type: "lesMer",
    label: "Les mer om barnets bosted",
    description: "Her kan du lese mer om hvordan vi behandler informasjon om barnets bosted.",
  },
];
