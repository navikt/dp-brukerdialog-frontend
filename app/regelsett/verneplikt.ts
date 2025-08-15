import { Sporsmal } from "~/components/sporsmal/sporsmal.types";

export type VernepliktSvar = {
  avtjentVerneplikt?: "ja" | "nei";
  dokumenterAvtjentVernepliktNå?: String;
  lasteOppSenereBegrunnelse?: String;
  naarSendtDokumentasjonTidligere?: String;
  senderIkkeDokumentasjonBegrunnelse?: String;
};

export const vernepliktSporsmal: Sporsmal[] = [
  {
    id: "avtjentVerneplikt",
    type: "envalg",
    label: "Har du avtjent verneplikt i minst tre måneder de siste tolv månedene?",
    description:
      "Du kan ha rett til dagpenger hvis du har avtjent militærtjeneste eller obligatorisk sivilforsvarstjeneste i minst tre av de siste tolv månedene.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "dokumenterAvtjentVernepliktNå",
    type: "envalg",
    label: "Ønsker du å dokumentere dette nå?",
    description:
      "Du har krysset av for at du har avtjent verneplikt i minst tre av de siste tolv månedene. " +
      "Du må sende inn tjenestebevis fra forsvaret der start- og sluttdato for tjenesteperiden kommer tydelig frem.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "etterkant", label: "Nei, jeg ønsker å sende dette inn i etterkant" },
      { value: "tidligere", label: "Jeg har sendt dette i en tidligere søknad om dagpenger" },
      { value: "nei", label: "Jeg sender det ikke" },
    ],
    visHvis: (svar: VernepliktSvar) => svar.avtjentVerneplikt === "ja",
  },
  {
    id: "lasteOppSenereBegrunnelse",
    type: "kortTekst",
    label: "Hva er grunnen til at du sender dokumenetet senere?",
    visHvis: (svar: VernepliktSvar) => svar.dokumenterAvtjentVernepliktNå === "etterkant",
  },
  {
    id: "naarSendtDokumentasjonTidligere",
    type: "kortTekst",
    label: "Når sendte du dokumentasjon?",
    description:
      "Er du usikker på om du har sendt dokumentet i en tidligere søknad om dagpenger, bør du sende det på nytt.",
    visHvis: (svar: VernepliktSvar) => svar.dokumenterAvtjentVernepliktNå === "tidligere",
  },
  {
    id: "senderIkkeDokumentasjonBegrunnelse",
    type: "kortTekst",
    label: "Hva er grunnen til at du ikke sender inn dokumentet?",
    description:
      "Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn dokumentene vi trenger for å behandle saken din. Ta kontakt med NAV hvis du ikke får tak i dokumentet.",
    visHvis: (svar: VernepliktSvar) => svar.dokumenterAvtjentVernepliktNå === "nei",
  },
];
