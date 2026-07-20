import type { TFunction } from "i18next";
import type { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const handling = "handling";
export const tarUtdanningEllerOpplæring = "tarUtdanningEllerOpplæring";
export const avsluttetUtdanningSiste6Måneder = "avsluttetUtdanningSiste6Måneder";
export const dokumenterAvsluttetUtdanningSiste6MånederNå =
  "dokumenterAvsluttetUtdanningSiste6MånederNå";
export const lasteOppSenereBegrunnelse = "lasteOppSenereBegrunnelse";
export const naarSendtDokumentasjonTidligere = "naarSendtDokumentasjonTidligere";
export const senderIkkeDokumentasjonBegrunnelse = "senderIkkeDokumentasjonBegrunnelse";
export const planleggerÅStarteEllerFullføreStudierSamtidig =
  "planleggerÅStarteEllerFullføreStudierSamtidig";

export type UtdanningSvar = {
  [tarUtdanningEllerOpplæring]?: "ja" | "nei";
  [avsluttetUtdanningSiste6Måneder]?: "ja" | "nei";
  [dokumenterAvsluttetUtdanningSiste6MånederNå]?: string;
  [lasteOppSenereBegrunnelse]?: string;
  [naarSendtDokumentasjonTidligere]?: string;
  [senderIkkeDokumentasjonBegrunnelse]?: string;
  [planleggerÅStarteEllerFullføreStudierSamtidig]?: "ja" | "nei";
};

type UtdanningT = TFunction;

const jaNeiOptions = (t: UtdanningT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagUtdanningKomponenter = (t: UtdanningT): KomponentType[] => [
  {
    id: tarUtdanningEllerOpplæring,
    type: "envalg",
    label: t("tarUtdanningEllerOpplaering.label"),
    description: t("tarUtdanningEllerOpplaering.description"),
    options: jaNeiOptions(t),
  },
  {
    id: avsluttetUtdanningSiste6Måneder,
    type: "envalg",
    label: t("avsluttetUtdanningSiste6Maneder.label"),
    options: jaNeiOptions(t),
    visHvis: (svar: UtdanningSvar) => svar[tarUtdanningEllerOpplæring] === "nei",
  },
  {
    id: "avsluttetUtdanningSiste6MånederInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("felles.informasjon"),
    description: t("avsluttetUtdanningSiste6Maneder.informasjonskort.description"),
    visHvis: (svar: UtdanningSvar) => svar[avsluttetUtdanningSiste6Måneder] === "ja",
  },
  {
    id: "avsluttetUtdanningSiste6MånederDokumentkravindikator",
    type: "dokumentasjonskravindikator",
    label: t("dokumentasjonskrav.utdanning.tittel"),
    visHvis: (svar: UtdanningSvar) => svar[avsluttetUtdanningSiste6Måneder] === "ja",
  },
  {
    id: planleggerÅStarteEllerFullføreStudierSamtidig,
    type: "envalg",
    label: t("planleggerStarteEllerFullforeStudier.label"),
    options: jaNeiOptions(t),
    visHvis: (svar: UtdanningSvar) => svar[tarUtdanningEllerOpplæring] === "nei",
  },
  {
    id: "måSendeInnSøknadNav04-06.05Informasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("felles.avslagTittel"),
    description: t("soknadOmBeholdeDagpenger.informasjonskort.description"),
    visHvis: (svar: UtdanningSvar) =>
      svar[tarUtdanningEllerOpplæring] === "ja" ||
      svar[planleggerÅStarteEllerFullføreStudierSamtidig] === "ja",
  },
];

const fallbackT = ((key: string) => key) as unknown as UtdanningT;

export const utdanningKomponenter = lagUtdanningKomponenter(fallbackT);
