import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const erTilbakenavigering = "erTilbakenavigering";
export const avtjentVerneplikt = "avtjent-verneplikt";
export const dokumenterAvtjentVernepliktNå = "dokumenter-avtjent-verneplikt-nå";
export const lasteOppSenereBegrunnelse = "laste-opp-senere-begrunnelse";
export const naarSendtDokumentasjonTidligere = "naar-sendt-dokumentasjon-tidligere";
export const senderIkkeDokumentasjonBegrunnelse = "sender-ikke-dokumentasjon-begrunnelse";

export type VernepliktSvar = {
  [avtjentVerneplikt]?: "ja" | "nei";
  [dokumenterAvtjentVernepliktNå]?: "ja" | "lastOppIEtterkant" | "lastetOppTidligere" | "nei";
  [lasteOppSenereBegrunnelse]?: string;
  [naarSendtDokumentasjonTidligere]?: string;
  [senderIkkeDokumentasjonBegrunnelse]?: string;
};

export const vernepliktSpørsmål: KomponentType[] = [
  {
    id: avtjentVerneplikt,
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
    id: "avtjentVernepliktDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Tjenestebevis",
    visHvis: (svar: VernepliktSvar) => svar[avtjentVerneplikt] === "ja",
  },
];
