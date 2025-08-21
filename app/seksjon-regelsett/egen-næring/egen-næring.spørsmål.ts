import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const driverDuEgenNæringsvirksomhet = "driver-du-egen-næringsvirksomhet";
export const driverDuEgetGårdsbruk = "driver-du-eget-gårdsbruk";

export type EgenNæringSvar = {
  [driverDuEgenNæringsvirksomhet]?: "ja" | "nei";
  [driverDuEgetGårdsbruk]?: "ja" | "nei";
};

export const egenNæringEgenNæringsvirksomhetSpørsmål: KomponentType[] = [
  {
    id: driverDuEgenNæringsvirksomhet,
    type: "envalg",
    label: "Driver du egen næringsvirksomhet?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "driverDuEgenNæringsvirksomhetLesMer",
    type: "lesMer",
    label: "For deg som driver eget aksjeselskap",
    description: "Hvis du er ansatt i ditt eget aksjeselskap, må du legge til arbeidsforholdet i forrige steg. På dette spørsmålet skal du kun legge til egen næring, som enkeltpersonsforetak."
  },
  {
    id: "driverDuEgenNæringsvirksomhetVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description: "Selv om du driver egen næring må du være villig til å ta annet arbeid. Du må legge til organisasjonsnummer for egen næring.",
    visHvis: (svar: EgenNæringSvar)=> svar[driverDuEgenNæringsvirksomhet] === "ja"
  }
];

export const egenNæringEgetGårdsbrukSpørsmål: KomponentType[] = [
  {
    id: driverDuEgetGårdsbruk,
    type: "envalg",
    label: "Driver du eget gårdsbruk?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "driverDuEgetGårdsbrukVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Selv om du driver et eget gårdsbruk må du være villig til å ta annet arbeid.<br/><br/>Hvis du jobber mer enn 50 prosent av tidligere arbeidstid har du ikke rett til dagpenger.<br/><br/>Når du driver gårdsbruk tar Nav utgangspunkt i størrelsen på bruket, arbeidsomfang, mekaniseringsgrad og beliggenhet.",
    visHvis: (svar: EgenNæringSvar) => svar[driverDuEgetGårdsbruk] === "ja",
  },
];
