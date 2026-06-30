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

type DokumentasjonT = TFunction;

export const lagDokumentasjonKomponenter = (t: DokumentasjonT): KomponentType[] => [
  {
    id: "dokumentasjonForklarendeTekst",
    type: "forklarendeTekst",
    description:
      `<p>${t("forklarendeTekst.description.intro")}</p>` +
      `<p>${t("forklarendeTekst.description.bilder.tittel")}</p>` +
      "<ol>" +
      `<li>${t("forklarendeTekst.description.bilder.taBilde")}</li>` +
      `<li>${t("forklarendeTekst.description.bilder.sjekkLesbarhet")}</li>` +
      `<li>${t("forklarendeTekst.description.bilder.lastOpp")}</li>` +
      "</ol>",
  },
  {
    id: "dokumentasjonManglerDuNoenDokumenterLesMer",
    type: "lesMer",
    label: t("manglerDokumenterLesMer.label"),
    description: `<p>${t("manglerDokumenterLesMer.description")}</p>`,
  },
  {
    id: "dokumentasjonHarDuSendtInnDokumentasjonTilNavTidligereLesMer",
    type: "lesMer",
    label: t("sendtTidligereLesMer.label"),
    description: `<p>${t("sendtTidligereLesMer.description")}</p>`,
  },
  {
    id: "dokumentasjonDokumenterDuSkalSendeInnForklarendeTekst",
    type: "headingTekst",
    nivå: "3",
    størrelse: "small",
    label: t("dokumenterDuSkalSendeInn.heading"),
  },
];

export const lagDokumentasjonskravKomponenter = (t: DokumentasjonT): KomponentType[] => [
  {
    id: velgHvaDuVilGjøre,
    type: "envalg",
    label: t("dokumentasjonskrav.velgHvaDuVilGjore.label"),
    options: [
      {
        value: dokumentkravSvarSendNå,
        label: t("dokumentasjonskrav.velgHvaDuVilGjore.options.sendNa"),
      },
      {
        value: dokumentkravSvarSenderSenere,
        label: t("dokumentasjonskrav.velgHvaDuVilGjore.options.senderSenere"),
      },
      {
        value: dokumentkravSvarSendtTidligere,
        label: t("dokumentasjonskrav.velgHvaDuVilGjore.options.sendtTidligere"),
      },
      {
        value: dokumentkravSvarSenderIkke,
        label: t("dokumentasjonskrav.velgHvaDuVilGjore.options.senderIkke"),
      },
    ],
  },
  {
    id: hvaErGrunnenTilAtDuSenderDokumentetSenere,
    type: "langTekst",
    label: t("dokumentasjonskrav.senderSenereGrunn.label"),
    description: t("dokumentasjonskrav.senderSenereGrunn.description"),
    maksLengde: 500,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderSenere,
  },
  {
    id: nårSendteDuDokumentet,
    type: "langTekst",
    label: t("dokumentasjonskrav.narSendteDuDokumentet.label"),
    description: t("dokumentasjonskrav.narSendteDuDokumentet.description"),
    maksLengde: 500,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSendtTidligere,
  },
  {
    id: "jegSenderIkkeInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("dokumentasjonskrav.senderIkkeInformasjonskort.label"),
    description: t("dokumentasjonskrav.senderIkkeInformasjonskort.description"),
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderIkke,
  },
  {
    id: hvaErGrunnenTilAtDuIkkeSenderDokumentet,
    type: "langTekst",
    label: t("dokumentasjonskrav.senderIkkeGrunn.label"),
    maksLengde: 500,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderIkke,
  },
];

const fallbackT = ((key: string) => key) as unknown as DokumentasjonT;

export const dokumentasjonKomponenter = lagDokumentasjonKomponenter(fallbackT);

export const dokumentasjonskravKomponenter = lagDokumentasjonskravKomponenter(fallbackT);
