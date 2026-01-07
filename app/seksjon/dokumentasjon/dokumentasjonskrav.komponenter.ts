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

export type DokumentasjonSvar = {};

export const dokumentasjonKomponenter: KomponentType[] = [
  {
    id: "dokumentasjonForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<p>Du må laste opp dokumentasjon som bekrefter opplysningene i søknaden. Du får raskere svar på søknaden din hvis vi har all dokumentasjonen når vi starter behandlingen. Du kan bruke filformatene PDF, JPG og PNG.</p>" +
      "<p>Slik bruker du bilder som dokumentasjon i søknaden:</p>" +
      "<ol><li>Ta bilde av dokumentet med smarttelefon eller nettbrett</li>" +
      "<li>Sjekk at dokumentet er lett å lese</li>" +
      "<li>Last opp bildene her</li></ol>",
  },
  {
    id: "dokumentasjonManglerDuNoenDokumenterLesMer",
    type: "lesMer",
    label: "Mangler du noen dokumenter?",
    description:
      "<p>Du kan sende inn det du har nå og ettersende resten innen 14 dager. Hvis du ikke sender alle dokumentene innen fristen kan du få avslag på søknaden, fordi Nav mangler viktige opplysninger i saken din. Ta kontakt hvis du ikke rekker å ettersende alle dokumentene.</p>",
  },
  {
    id: "dokumentasjonHarDuSendtInnDokumentasjonTilNavTidligereLesMer",
    type: "lesMer",
    label: "Har du sendt inn dokumentene til Nav tidligere?",
    description:
      "<p>Hvis du har sendt inn dokumentene sammen med en tidligere søknad om dagpenger, trenger du ikke å sende det på nytt.</p>",
  },
  {
    id: "dokumentasjonDokumenterDuSkalSendeInnForklarendeTekst",
    type: "forklarendeTekst",
    description: "<h3>Dokumenter du skal sende inn</h3>", // Dette er ikke semantisk korrekt. H3 kan ikke ligge inni en p-tag
  },
];

const dokumentasjonskravKomponenter: KomponentType[] = [
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
    description: "Frist for ettersending er 14 dager etter at du sendte søknaden.",
    maksLengde: 500,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderSenere,
  },
  {
    id: nårSendteDuDokumentet,
    type: "langTekst",
    label: "Når sendte du dokumentet?",
    description:
      "Er du usikker på om du har sendt dokumentet i en tidligere søknad om dagpenger, bør du sende det på nytt.",
    maksLengde: 500,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSendtTidligere,
  },
  {
    id: "jegSenderIkkeInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få avslag på søknaden",
    description:
      "Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn dokumentene vi trenger for å behandle saken din. Ta kontakt med Nav hvis du ikke får tak i dokumentet.",
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderIkke,
  },
  {
    id: hvaErGrunnenTilAtDuIkkeSenderDokumentet,
    type: "langTekst",
    label: "Hva er grunnen til at du ikke sender dokumentet?",
    maksLengde: 500,
    visHvis: (svar: DokumentasjonskravSvar) =>
      svar[velgHvaDuVilGjøre] === dokumentkravSvarSenderIkke,
  },
];
export default dokumentasjonskravKomponenter;
