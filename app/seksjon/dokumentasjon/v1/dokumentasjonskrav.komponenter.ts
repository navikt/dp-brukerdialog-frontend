import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";

export const velgHvaDuVilGjøre = "velgHvaDuVilGjøre";
export const hvaErGrunnenTilAtDuSenderDokumentetSenere =
  "hvaErGrunnenTilAtDuSenderDokumentetSenere";
export const nårSendteDuDokumentet = "nårSendteDuDokumentet";
export const hvaErGrunnenTilAtDuIkkeSenderDokumentet = "hvaErGrunnenTilAtDuIkkeSenderDokumentet";

export const dokumentkravSvarSendNå = "dokumentkravSvarSendNå";
export const dokumentkravSvarSenderIkke = "dokumentkravSvarSenderIkke";
export const dokumentkravSvarSenderSenere = "dokumentkravSvarSenderSenere";
export const dokumentkravSvarSendtTidligere = "dokumentkravSvarSendtTidligere";
export const dokumentkravEttersendt = "dokumentkravEttersendt";

export type DokumentasjonskravSvar = {
  [velgHvaDuVilGjøre]?:
    | typeof dokumentkravSvarSendNå
    | typeof dokumentkravSvarSenderIkke
    | typeof dokumentkravSvarSenderSenere
    | typeof dokumentkravSvarSendtTidligere
    | typeof dokumentkravEttersendt;
  [hvaErGrunnenTilAtDuSenderDokumentetSenere]?: string;
  [nårSendteDuDokumentet]?: string;
  [hvaErGrunnenTilAtDuIkkeSenderDokumentet]?: string;
};

export function lagDokumentasjonKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: "dokumentasjonForklarendeTekst",
      type: "forklarendeTekst",
      description: t("info.forklarendeTekst"),
    },
    {
      id: "dokumentasjonManglerDuNoenDokumenterLesMer",
      type: "lesMer",
      label: t("info.manglerDokumenterTittel"),
      description: t("info.manglerDokumenter"),
    },
    {
      id: "dokumentasjonHarDuSendtInnDokumentasjonTilNavTidligereLesMer",
      type: "lesMer",
      label: t("info.sendtTidligereTittel"),
      description: t("info.sendtTidligere"),
    },
    {
      id: "dokumentasjonDokumenterDuSkalSendeInnForklarendeTekst",
      type: "headingTekst",
      nivå: "3",
      størrelse: "small",
      label: t("info.dokumenterDuSkalSendeInn"),
    },
  ];
}

export function lagDokumentasjonskravKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: velgHvaDuVilGjøre,
      type: "envalg",
      label: t("skjema.velgHvaDuVilGjøre.label"),
      options: [
        { value: dokumentkravSvarSendNå, label: t("skjema.svar.sendNå") },
        { value: dokumentkravSvarSenderSenere, label: t("skjema.svar.senderSenere") },
        {
          value: dokumentkravSvarSendtTidligere,
          label: t("skjema.svar.sendtTidligere"),
        },
        { value: dokumentkravSvarSenderIkke, label: t("skjema.svar.senderIkke") },
      ],
    },
    {
      id: hvaErGrunnenTilAtDuSenderDokumentetSenere,
      type: "langTekst",
      label: t("skjema.hvaErGrunnenTilAtDuSenderDokumentetSenere.label"),
      description: t("skjema.hvaErGrunnenTilAtDuSenderDokumentetSenere.description"),
      maksLengde: 500,
      visHvis: (svar: DokumentasjonskravSvar) =>
        svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderSenere,
    },
    {
      id: nårSendteDuDokumentet,
      type: "langTekst",
      label: t("skjema.nårSendteDuDokumentet.label"),
      description: t("skjema.nårSendteDuDokumentet.description"),
      maksLengde: 500,
      visHvis: (svar: DokumentasjonskravSvar) =>
        svar[velgHvaDuVilGjøre] === dokumentkravSvarSendtTidligere,
    },
    {
      id: "jegSenderIkkeInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("skjema.jegSenderIkkeInformasjonskort.label"),
      description: t("skjema.jegSenderIkkeInformasjonskort.description"),
      visHvis: (svar: DokumentasjonskravSvar) =>
        svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderIkke,
    },
    {
      id: hvaErGrunnenTilAtDuIkkeSenderDokumentet,
      type: "langTekst",
      label: t("skjema.hvaErGrunnenTilAtDuIkkeSenderDokumentet.label"),
      maksLengde: 500,
      visHvis: (svar: DokumentasjonskravSvar) =>
        svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderIkke,
    },
  ];
}
