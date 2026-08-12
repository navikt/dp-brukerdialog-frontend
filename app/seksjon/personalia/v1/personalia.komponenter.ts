import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import { endOfDay } from "date-fns";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const fornavnFraPdl = "fornavnFraPdl";
export const mellomnavnFraPdl = "mellomnavnFraPdl";
export const etternavnFraPdl = "etternavnFraPdl";
export const fødselsnummerFraPdl = "fødselsnummerFraPdl";
export const alderFraPdl = "alderFraPdl";
export const adresselinje1FraPdl = "adresselinje1FraPdl";
export const adresselinje2FraPdl = "adresselinje2FraPdl";
export const adresselinje3FraPdl = "adresselinje3FraPdl";
export const postnummerFraPdl = "postnummerFraPdl";
export const poststedFraPdl = "poststedFraPdl";
export const kontonummerFraKontoregister = "kontonummerFraKontoregister";
export const folkeregistrertAdresseErNorgeStemmerDet = "folkeregistrertAdresseErNorgeStemmerDet";
export const landkodeFraPdl = "landkodeFraPdl";
export const landFraPdl = "landFraPdl";
export const bostedsland = "bostedsland";
export const reistTilbakeTilBostedslandet = "reistTilbakeTilBostedslandet";
export const reisteDuHjemTilLandetDuBorI = "reisteDuHjemTilLandetDuBorI";
export const reisteDuITaktMedRotasjon = "reisteDuITaktMedRotasjon";
export const avreiseDatoFra = "avreiseDatoFra";
export const avreiseDatoTil = "avreiseDatoTil";
export const hvorforReistDuFraNorge = "hvorforReistDuFraNorge";
export const handling = "handling";

export type PersonaliaSvar = {
  [fornavnFraPdl]?: string;
  [mellomnavnFraPdl]?: string;
  [etternavnFraPdl]?: string;
  [fødselsnummerFraPdl]?: string;
  [alderFraPdl]?: string;
  [adresselinje1FraPdl]?: string;
  [adresselinje2FraPdl]?: string;
  [adresselinje3FraPdl]?: string;
  [postnummerFraPdl]?: string;
  [poststedFraPdl]?: string;
  [kontonummerFraKontoregister]?: string;
  [landkodeFraPdl]?: string;
  [landFraPdl]?: string;
  [folkeregistrertAdresseErNorgeStemmerDet]?: string;
  [bostedsland]?: string;
  [reistTilbakeTilBostedslandet]?: "ja" | "nei";
  [reisteDuHjemTilLandetDuBorI]?: "ja" | "nei";
  [reisteDuITaktMedRotasjon]?: "ja" | "nei";
  [avreiseDatoFra]?: string;
  [avreiseDatoTil]?: string;
  [hvorforReistDuFraNorge]?: string;
};

const jaNeiOptions = (t: TFunction) => [
  { value: "ja", label: t("envalg.svar.ja") },
  { value: "nei", label: t("envalg.svar.nei") },
];

export function lagPersonaliaKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: fornavnFraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.fornavn"),
    },
    {
      id: mellomnavnFraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.mellomnavn"),
    },
    {
      id: etternavnFraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.etternavn"),
    },
    {
      id: fødselsnummerFraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.fødselsnummer"),
    },
    {
      id: adresselinje1FraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.adresselinje1"),
    },
    {
      id: adresselinje2FraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.adresselinje2"),
    },
    {
      id: adresselinje3FraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.adresselinje3"),
    },
    {
      id: postnummerFraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.postnummer"),
    },
    {
      id: poststedFraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.poststed"),
    },
    {
      id: landkodeFraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.landkode"),
    },
    {
      id: landFraPdl,
      type: "registeropplysning",
      label: t("registeropplysninger.land"),
    },
    {
      id: kontonummerFraKontoregister,
      type: "registeropplysning",
      label: t("registeropplysninger.kontonummer"),
    },
    {
      id: "viHarRegistretAtDuErOver67Informasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("over67.label"),
      description: t("over67.description"),
      visHvis: (svar: PersonaliaSvar) => Number(svar[alderFraPdl]) >= 67,
    },
    {
      id: "personaliaBostedslandForklarendeTekst",
      type: "forklarendeTekst",
      description: `<h3>${t("bostedsland.heading")}</h3>`,
    },
    {
      id: folkeregistrertAdresseErNorgeStemmerDet,
      type: "envalg",
      label: t("folkeregistrertAdresseErNorgeStemmerDet.label"),
      description: t("folkeregistrertAdresseErNorgeStemmerDet.description"),
      options: [
        { value: "ja", label: t("folkeregistrertAdresseErNorgeStemmerDet.options.ja") },
        { value: "nei", label: t("folkeregistrertAdresseErNorgeStemmerDet.options.nei") },
      ],
      visHvis: (svar: PersonaliaSvar) => svar[landFraPdl] === "NORGE",
    },
  ];
}

export function lagPersonaliaBostedslandKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: bostedsland,
      type: "land",
      label: t("bostedsland.spørsmål.label"),
      description: t("bostedsland.spørsmål.description"),
      visHvis: (svar: PersonaliaSvar) =>
        svar[landFraPdl] !== "NORGE" || svar[folkeregistrertAdresseErNorgeStemmerDet] === "nei",
    },
    {
      id: "bostedslandLesMer",
      type: "lesMer",
      label: t("bostedsland.lesMer.label"),
      description: t("bostedsland.lesMer.description"),
      visHvis: (svar: PersonaliaSvar) =>
        svar[landFraPdl] !== "NORGE" || svar[folkeregistrertAdresseErNorgeStemmerDet] === "nei",
    },
    {
      id: reistTilbakeTilBostedslandet,
      type: "envalg",
      label: t("reistTilbakeTilBostedslandet.label"),
      options: jaNeiOptions(t),
      visHvis: (svar: PersonaliaSvar) => !!svar[bostedsland] && svar[bostedsland] !== "NOR",
    },
    {
      id: avreiseDatoFra,
      type: "periodeFra",
      label: t("felles.dato.fraDato"),
      tilOgMed: endOfDay(new Date()),
      periodeLabel: t("avreiseDato.periodeLabel"),
      referanseId: avreiseDatoTil,
      visHvis: (svar: PersonaliaSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
    },
    {
      id: avreiseDatoTil,
      type: "periodeTil",
      label: t("felles.dato.tilDato"),
      optional: true,
      referanseId: avreiseDatoFra,
      visHvis: (svar: PersonaliaSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
    },
    {
      id: hvorforReistDuFraNorge,
      type: "langTekst",
      label: t("hvorforReistDuFraNorge.label"),
      maksLengde: 500,
      visHvis: (svar: PersonaliaSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
    },
    {
      id: reisteDuHjemTilLandetDuBorI,
      type: "envalg",
      label: t("reisteDuHjemTilLandetDuBorI.label"),
      options: jaNeiOptions(t),
      visHvis: (svar: PersonaliaSvar) => !!svar[bostedsland] && svar[bostedsland] !== "NOR",
    },
    {
      id: reisteDuITaktMedRotasjon,
      type: "envalg",
      label: t("reisteDuITaktMedRotasjon.label"),
      options: jaNeiOptions(t),
      visHvis: (svar: PersonaliaSvar) => svar[reisteDuHjemTilLandetDuBorI] === "nei",
    },
  ];
}
