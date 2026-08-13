import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";

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

export function lagUtdanningKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: tarUtdanningEllerOpplæring,
      type: "envalg",
      label: t("tarUtdanningEllerOpplæring.label"),
      description: t("tarUtdanningEllerOpplæring.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: avsluttetUtdanningSiste6Måneder,
      type: "envalg",
      label: t("avsluttetUtdanningSiste6Måneder.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: UtdanningSvar) => svar[tarUtdanningEllerOpplæring] === "nei",
    },
    {
      id: "avsluttetUtdanningSiste6MånederInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("avsluttetUtdanningSiste6MånederInformasjonskort.label"),
      description: t("avsluttetUtdanningSiste6MånederInformasjonskort.description"),
      visHvis: (svar: UtdanningSvar) => svar[avsluttetUtdanningSiste6Måneder] === "ja",
    },
    {
      id: "avsluttetUtdanningSiste6MånederDokumentkravindikator",
      type: "dokumentasjonskravindikator",
      label: t("avsluttetUtdanningSiste6MånederDokumentkravindikator.label"),
      visHvis: (svar: UtdanningSvar) => svar[avsluttetUtdanningSiste6Måneder] === "ja",
    },
    {
      id: planleggerÅStarteEllerFullføreStudierSamtidig,
      type: "envalg",
      label: t("planleggerÅStarteEllerFullføreStudierSamtidig.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: UtdanningSvar) => svar[tarUtdanningEllerOpplæring] === "nei",
    },
    {
      id: "måSendeInnSøknadNav04-06.05Informasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("måSendeInnSøknadNav040605Informasjonskort.label"),
      description: t("måSendeInnSøknadNav040605Informasjonskort.description"),
      visHvis: (svar: UtdanningSvar) =>
        svar[tarUtdanningEllerOpplæring] === "ja" ||
        svar[planleggerÅStarteEllerFullføreStudierSamtidig] === "ja",
    },
  ];
}
