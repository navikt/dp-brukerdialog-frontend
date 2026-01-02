import { KomponentType } from "~/components/Komponent.types";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const forsørgerDuBarnSomIkkeVisesHer = "forsørgerDuBarnSomIkkeVisesHer";
export const handling = "handling";
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

export const barnetilleggForklarendeTekst: KomponentType[] = [
  {
    id: "barnetilleggForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<p>Hvis du forsørger barn under 18 år, eller er bidragspliktig, kan du få barnetillegg uavhengig av om barnet bor hos deg.</p>" +
      "<p>Barnet må være bosatt i Norge, et annet EØS-land, Sveits eller Storbritannia. Du får ikke barnetillegg hvis barnet oppholder seg utenfor disse områdene mer enn 90 dager i løpet av 12 måneder.</p>" +
      "<p>Hvis vi har opplysninger om at du er forelder til noen barn så vises de under.</p>",
  },
];

export const barnetilleggKomponenter: KomponentType[] = [
  {
    id: forsørgerDuBarnSomIkkeVisesHer,
    type: "envalg",
    label: "Forsørger du barn som ikke vises her?",
    description:
      "Hvis du har forsørgeransvar for barn under 18 år som ikke vises her, kan du legge dem til.",
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
    label: "Fornavn og mellomnavn",
  },
  {
    id: etternavn,
    type: "registeropplysning",
    label: "Etternavn",
  },
  {
    id: fødselsdato,
    type: "registeropplysning",
    label: "Fødsesldato",
  },
  {
    id: bostedsland,
    type: "registeropplysning",
    label: "Bostedsland",
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
    maksLengde: 200,
  },
  {
    id: etternavn,
    type: "kortTekst",
    label: "Etternavn",
    maksLengde: 200,
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
    description: "Bostedet du oppgir må være det landet barnet faktisk oppholder seg i til vanlig.",
  },
  {
    id: "barnLagtTilManueltDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Fødselsattest/bostedsbevis",
  },
];
