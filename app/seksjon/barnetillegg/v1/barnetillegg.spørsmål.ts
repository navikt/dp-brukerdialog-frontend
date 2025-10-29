import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const forsørgerDuBarnSomIkkeVisesHer = "forsørger-du-barn-som-ikke-vises-her";
export const erTilbakenavigering = "erTilbakenavigering";

export type Barn = {
  id: string;
  [fornavnOgMellomnavn]: string;
  [etternavn]: string;
  [fødselsdato]: string;
  [bostedsland]: string;
  dokumentasjonskravId?: string;
  [forsørgerDuBarnet]?: "ja" | "nei";
};

export type BarnetilleggSvar = {
  [forsørgerDuBarnSomIkkeVisesHer]?: "ja" | "nei";
};

export const barnetilleggSpørsmål: KomponentType[] = [
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

export const fornavnOgMellomnavn = "fornavn-og-mellomnavn";
export const etternavn = "etternavn";
export const fødselsdato = "fødselsdato";
export const bostedsland = "bostedsland";
export const forsørgerDuBarnet = "forsørger-du-barnet";

export const barnFraPdlSpørsmål: KomponentType[] = [
  {
    id: fornavnOgMellomnavn,
    type: "registeropplysning",
    label: "",
  },
  {
    id: etternavn,
    type: "registeropplysning",
    label: "",
  },
  {
    id: fødselsdato,
    type: "registeropplysning",
    label: "",
  },
  {
    id: bostedsland,
    type: "registeropplysning",
    label: "",
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
