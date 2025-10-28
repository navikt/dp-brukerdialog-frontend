import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const velgHvaDuVilGjøre = "velg-hva-du-vil-gjøre";
export const hvaErGrunnenTilAtDuSenderDokumentetSenere =
  "hva-er-grunnen-til-at-du-sender-dokumentet-senere";
export const nårSendteDuDokumentet = "når-sendte-du-dokumentet";
export const hvaErGrunnenTilAtDuIkkeSenderDokumentet =
  "hva-er-grunnen-til-at-du-ikke-sender-dokumentet";

export const DOKUMENTKRAV_SVAR_SEND_NAA = "dokumentkrav.svar.send.naa";
export const DOKUMENTKRAV_SVAR_SENDER_IKKE = "dokumentkrav.svar.sender.ikke";
export const DOKUMENTKRAV_SVAR_SENDER_SENERE = "dokumentkrav.svar.send.senere";
export const DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE = "dokumentkrav.svar.sendt.tidligere";

export type DokumentasjonskravSvar = {
  [velgHvaDuVilGjøre]?:
    | typeof DOKUMENTKRAV_SVAR_SEND_NAA
    | typeof DOKUMENTKRAV_SVAR_SENDER_SENERE
    | typeof DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE
    | typeof DOKUMENTKRAV_SVAR_SENDER_IKKE;
};

export const dokumentasjonskravSpørsmål: KomponentType[] = [
  {
    id: velgHvaDuVilGjøre,
    type: "envalg",
    label: "Velg hva du vil gjøre",
    options: [
      { value: DOKUMENTKRAV_SVAR_SEND_NAA, label: "Jeg vil laste opp nå" },
      { value: DOKUMENTKRAV_SVAR_SENDER_SENERE, label: "Jeg sender det senere" },
      {
        value: DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE,
        label: "Jeg har sendt det i en tidligere søknad om dagpenger",
      },
      { value: DOKUMENTKRAV_SVAR_SENDER_IKKE, label: "Jeg sender det ikke" },
    ],
  },
  {
    id: hvaErGrunnenTilAtDuSenderDokumentetSenere,
    type: "langTekst",
    label: "Hva er grunnen til at du sender dokumentet senere?",
    maxLength: 200,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === DOKUMENTKRAV_SVAR_SENDER_SENERE,
  },
  {
    id: nårSendteDuDokumentet,
    type: "langTekst",
    label: "Når sendte du dokumentet?",
    description:
      "Er du usikker på om du har sendt dokumentet i en tidligere søknad om dagpenger, bør du sende det på nytt.",
    maxLength: 200,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE,
  },
  {
    id: "test",
    type: "varselmelding",
    variant: "warning",
    label: "",
    description:
      "Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn dokumentene vi trenger for å behandle saken din. Ta kontakt med Nav hvis du ikke får tak i dokumentet.",
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === DOKUMENTKRAV_SVAR_SENDER_IKKE,
  },
  {
    id: hvaErGrunnenTilAtDuIkkeSenderDokumentet,
    type: "langTekst",
    label: "Hva er grunnen til at du ikke sender dokumentet?",
    maxLength: 200,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === DOKUMENTKRAV_SVAR_SENDER_IKKE,
  },
];
