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
      "Hvis du forsørger barn under 18 år, eller er bidragspliktig, kan du få barnetillegg uavhengig av om barnet bor hos deg.<br /><br />" +
      "Barnet må være bosatt i Norge, et annet EØS-land, Sveits eller Storbritannia. Du får ikke barnetillegg hvis barnet oppholder seg utenfor disse områdene mer enn 90 dager i løpet av 12 måneder.<br /><br />" +
      "Hvis vi har registrert noen barn på deg vises de under.<br/><br/>",
  },
];

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
  {
    id: "barnLagtTilManueltDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Fødselsattest",
    description:
      "Her kommer en lang beskrivelse av hva som må være med i dokumentasjonen. Denne trenger " +
      "vi ikke å vise til bruker i søknaden, men vi kan vise den i Dokumentopplasting-seksjonen. " +
      "Nødvendige hjelpetekster er også tett knyttet til seksjonen hvor dokumentasjonskravet oppstår." +
      "<strong>HTML</strong> kan brukes",
  },
];
