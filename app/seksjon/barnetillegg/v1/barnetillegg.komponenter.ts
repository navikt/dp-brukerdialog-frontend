import { endOfDay } from "date-fns";
import type { TFunction } from "i18next";
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

export function lagBarnetilleggForklarendeTekst(t: TFunction): KomponentType[] {
  return [
    {
      id: "barnetilleggForklarendeTekst",
      type: "forklarendeTekst",
      description:
        `<p>${t("forklarendeTekst.avsnitt1")}</p>` +
        `<p>${t("forklarendeTekst.avsnitt2")}</p>` +
        `<p>${t("forklarendeTekst.avsnitt3")}</p>`,
    },
  ];
}

export function lagBarnetilleggKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: forsørgerDuBarnSomIkkeVisesHer,
      type: "envalg",
      label: t("forsørgerDuBarnSomIkkeVisesHer.label"),
      description: t("forsørgerDuBarnSomIkkeVisesHer.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
  ];
}

export const fornavnOgMellomnavn = "fornavnOgMellomnavn";
export const etternavn = "etternavn";
export const fødselsdato = "fødselsdato";
export const bostedsland = "bostedsland";
export const forsørgerDuBarnet = "forsørgerDuBarnet";

export function lagBarnFraPdlKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: fornavnOgMellomnavn,
      type: "registeropplysning",
      label: t("barnFraPdl.fornavnOgMellomnavn.label"),
    },
    {
      id: etternavn,
      type: "registeropplysning",
      label: t("barnFraPdl.etternavn.label"),
    },
    {
      id: fødselsdato,
      type: "registeropplysning",
      label: t("barnFraPdl.fødselsdato.label"),
    },
    {
      id: bostedsland,
      type: "registeropplysning",
      label: t("barnFraPdl.bostedsland.label"),
    },
    {
      id: forsørgerDuBarnet,
      type: "envalg",
      label: t("barnFraPdl.forsørgerDuBarnet.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
  ];
}

export type LeggTilBarnManueltSvar = {
  [fornavnOgMellomnavn]?: string;
  [etternavn]?: string;
  [fødselsdato]?: string;
  [bostedsland]?: string;
};

export function lagLeggTilBarnManueltModalKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: fornavnOgMellomnavn,
      type: "kortTekst",
      label: t("leggTilBarnManuelt.fornavnOgMellomnavn.label"),
      maksLengde: 200,
    },
    {
      id: etternavn,
      type: "kortTekst",
      label: t("leggTilBarnManuelt.etternavn.label"),
      maksLengde: 200,
    },
    {
      id: fødselsdato,
      type: "dato",
      label: t("leggTilBarnManuelt.fødselsdato.label"),
      tilOgMed: endOfDay(new Date()),
    },
    {
      id: bostedsland,
      type: "land",
      label: t("leggTilBarnManuelt.bostedsland.label"),
    },
    {
      id: "lesMerOmBarnetBostedLesMer",
      type: "lesMer",
      label: t("leggTilBarnManuelt.lesMer.label"),
      description: t("leggTilBarnManuelt.lesMer.description"),
    },
    {
      id: "barnLagtTilManueltDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("leggTilBarnManuelt.dokumentasjonskravindikator.label"),
    },
  ];
}
