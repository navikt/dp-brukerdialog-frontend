import type { TFunction } from "i18next";
import { endOfDay } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const forsørgerDuBarnSomIkkeVisesHer = "forsørgerDuBarnSomIkkeVisesHer";
export const handling = "handling";
export const dokumentasjonskrav = "dokumentasjonskrav";
export const versjon = "versjon";

export const fornavnOgMellomnavn = "fornavnOgMellomnavn";
export const etternavn = "etternavn";
export const fødselsdato = "fødselsdato";
export const bostedsland = "bostedsland";
export const forsørgerDuBarnet = "forsørgerDuBarnet";

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

export type LeggTilBarnManueltSvar = {
  [fornavnOgMellomnavn]?: string;
  [etternavn]?: string;
  [fødselsdato]?: string;
  [bostedsland]?: string;
};

type BarnetilleggT = TFunction;

const jaNeiOptions = (t: BarnetilleggT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagBarnetilleggForklarendeTekst = (t: BarnetilleggT): KomponentType[] => [
  {
    id: "barnetilleggForklarendeTekst",
    type: "forklarendeTekst",
    description:
      `<p>${t("forklarendeTekst.description.forsorgerBarn")}</p>` +
      `<p>${t("forklarendeTekst.description.bosted")}</p>` +
      `<p>${t("forklarendeTekst.description.pdl")}</p>`,
  },
];

export const lagBarnetilleggKomponenter = (t: BarnetilleggT): KomponentType[] => [
  {
    id: forsørgerDuBarnSomIkkeVisesHer,
    type: "envalg",
    label: t("forsorgerDuBarnSomIkkeVisesHer.label"),
    description: t("forsorgerDuBarnSomIkkeVisesHer.description"),
    options: jaNeiOptions(t),
  },
];

export const lagBarnFraPdlSpørsmål = (t: BarnetilleggT): KomponentType[] => [
  {
    id: fornavnOgMellomnavn,
    type: "registeropplysning",
    label: t("barn.fornavnOgMellomnavn.label"),
  },
  {
    id: etternavn,
    type: "registeropplysning",
    label: t("barn.etternavn.label"),
  },
  {
    id: fødselsdato,
    type: "registeropplysning",
    label: t("barn.fodselsdato.label"),
  },
  {
    id: bostedsland,
    type: "registeropplysning",
    label: t("barn.bostedsland.label"),
  },
  {
    id: forsørgerDuBarnet,
    type: "envalg",
    label: t("barn.forsorgerDuBarnet.label"),
    options: jaNeiOptions(t),
  },
];

export const lagLeggTilBarnManueltSpørsmål = (t: BarnetilleggT): KomponentType[] => [
  {
    id: fornavnOgMellomnavn,
    type: "kortTekst",
    label: t("barn.fornavnOgMellomnavn.label"),
    maksLengde: 200,
  },
  {
    id: etternavn,
    type: "kortTekst",
    label: t("barn.etternavn.label"),
    maksLengde: 200,
  },
  {
    id: fødselsdato,
    type: "dato",
    label: t("barn.fodselsdato.label"),
    tilOgMed: endOfDay(new Date()),
  },
  {
    id: bostedsland,
    type: "land",
    label: t("barn.bostedslandSporsmal.label"),
  },
  {
    id: "lesMerOmBarnetBostedLesMer",
    type: "lesMer",
    label: t("barn.bostedLesMer.label"),
    description: t("barn.bostedLesMer.description"),
  },
  {
    id: "barnLagtTilManueltDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("barn.dokumentasjonskrav.fodselsattestBostedsbevis"),
  },
];

const fallbackT = ((key: string) => key) as unknown as BarnetilleggT;

export const barnetilleggForklarendeTekst = lagBarnetilleggForklarendeTekst(fallbackT);

export const barnetilleggKomponenter = lagBarnetilleggKomponenter(fallbackT);

export const barnFraPdlSpørsmål = lagBarnFraPdlSpørsmål(fallbackT);

export const leggTilBarnManueltSpørsmål = lagLeggTilBarnManueltSpørsmål(fallbackT);
