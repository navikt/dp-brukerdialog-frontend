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

export type DokumentasjonskravSvar = {
  [velgHvaDuVilGjøre]?:
    | typeof dokumentkravSvarSendNå
    | typeof dokumentkravSvarSenderIkke
    | typeof dokumentkravSvarSenderSenere
    | typeof dokumentkravSvarSendtTidligere;
  [hvaErGrunnenTilAtDuSenderDokumentetSenere]?: string;
  [nårSendteDuDokumentet]?: string;
  [hvaErGrunnenTilAtDuIkkeSenderDokumentet]?: string;
};

export const dokumentasjonskravKomponenter: KomponentType[] = [
  {
    id: velgHvaDuVilGjøre,
    type: "envalg",
    label: "Velg hva du vil gjøre",
    options: [
      { value: dokumentkravSvarSendNå, label: "Jeg vil laste opp nå" },
      { value: dokumentkravSvarSenderSenere, label: "Jeg sender det senere" },
      {
        value: dokumentkravSvarSendtTidligere,
        label: "Jeg har sendt det i en tidligere søknad om dagpenger",
      },
      { value: dokumentkravSvarSenderIkke, label: "Jeg sender det ikke" },
    ],
  },
  {
    id: hvaErGrunnenTilAtDuSenderDokumentetSenere,
    type: "langTekst",
    label: "Hva er grunnen til at du sender dokumentet senere?",
    maxLength: 200,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderSenere,
  },
  {
    id: nårSendteDuDokumentet,
    type: "langTekst",
    label: "Når sendte du dokumentet?",
    description:
      "Er du usikker på om du har sendt dokumentet i en tidligere søknad om dagpenger, bør du sende det på nytt.",
    maxLength: 200,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSendtTidligere,
  },
  {
    id: "test",
    type: "varselmelding",
    variant: "warning",
    description:
      "Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn dokumentene vi trenger for å behandle saken din. Ta kontakt med Nav hvis du ikke får tak i dokumentet.",
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderIkke,
  },
  {
    id: hvaErGrunnenTilAtDuIkkeSenderDokumentet,
    type: "langTekst",
    label: "Hva er grunnen til at du ikke sender dokumentet?",
    maxLength: 200,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderIkke,
  },
];
