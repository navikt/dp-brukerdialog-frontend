import { KomponentType } from "~/components/Komponent.types";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const erTilbakenavigering = "erTilbakenavigering";
export const driverDuEgenNæringsvirksomhet = "driverDuEgenNæringsvirksomhet";
export const næringsvirksomheter = "næringsvirksomheter";
export const gårdsbruk = "gårdsbruk";
export const driverDuEgetGårdsbruk = "driverDuEgetGårdsbruk";
export const organisasjonsnummer = "organisasjonsnummer";
export const hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert =
  "hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert";
export const hvorMangeTimerJobbetPerUkeNå = "hvorMangeTimerJobbetPerUkeNå";
export const hvilkeTypeGårdsbrukDriverDu = "hvilkeTypeGårdsbrukDriverDu";
export const dyr = "dyr";
export const jord = "jord";
export const skog = "skog";
export const annet = "annet";
export const hvemEierGårdsbruket = "hvemEierGårdsbruket";
export const jeg = "jeg";
export const samboerEktefelle = "samboerEktefelle";
export const andre = "andre";
export const hvorMangeProsentAvInntektenGårTilDeg = "hvorMangeProsentAvInntektenGårTilDeg";
export const hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr =
  "hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr";
export const hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer =
  "hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer";
export const hvordanHarDuBeregnetAntallArbeidstimerTotalt =
  "hvordanHarDuBeregnetAntallArbeidstimerTotalt";

export function genererÅrstallOptions() {
  const iÅr = new Date().getFullYear();
  const år: { value: string; label: string }[] = [];
  for (let a = iÅr; a > iÅr - 5; a--) {
    år.push({ value: a.toString(), label: a.toString() });
  }
  return år;
}

export type Næringsvirksomhet = {
  [organisasjonsnummer]: string;
  [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]: string;
  [hvorMangeTimerJobbetPerUkeNå]: string;
};

export type Gårdsbruk = {
  [organisasjonsnummer]: string;
  [hvilkeTypeGårdsbrukDriverDu]: ("dyr" | "jord" | "skog" | "annet")[];
  [hvemEierGårdsbruket]: ("jeg" | "samboerEktefelle" | "andre")[];
  [hvorMangeProsentAvInntektenGårTilDeg]: string;
  [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]: string;
  [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]: string;
  [hvordanHarDuBeregnetAntallArbeidstimerTotalt]: string;
};

export type EgenNæringSvar = {
  [driverDuEgenNæringsvirksomhet]?: "ja" | "nei";
  [driverDuEgetGårdsbruk]?: "ja" | "nei";
};

export const egenNæringEgenNæringsvirksomhetKomponenter: KomponentType[] = [
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
    description:
      "Hvis du er ansatt i ditt eget aksjeselskap, må du legge til arbeidsforholdet i forrige steg. På dette spørsmålet skal du kun legge til egen næring, som enkeltpersonsforetak.",
  },
  {
    id: "driverDuEgenNæringsvirksomhetVarselmelding",
    type: "varselmelding",
    variant: "info",
    description:
      "Selv om du driver egen næring må du være villig til å ta annet arbeid. Du må legge til organisasjonsnummer for egen næring.",
    visHvis: (svar: EgenNæringSvar) => svar[driverDuEgenNæringsvirksomhet] === "ja",
  },
];

export const egenNæringEgetGårdsbrukKomponenter: KomponentType[] = [
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
    description:
      "Selv om du driver et eget gårdsbruk må du være villig til å ta annet arbeid.<br/><br/>Hvis du jobber mer enn 50 prosent av tidligere arbeidstid har du ikke rett til dagpenger.<br/><br/>Når du driver gårdsbruk tar Nav utgangspunkt i størrelsen på bruket, arbeidsomfang, mekaniseringsgrad og beliggenhet.",
    visHvis: (svar: EgenNæringSvar) => svar[driverDuEgetGårdsbruk] === "ja",
  },
];

export type LeggTilNæringsvirksomhetSvar = {
  [organisasjonsnummer]?: string;
  [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]?: number;
  [hvorMangeTimerJobbetPerUkeNå]?: number;
};

export const leggTilNæringsvirksomhetKomponenter: KomponentType[] = [
  {
    id: organisasjonsnummer,
    type: "kortTekst",
    label: "Næringens organisasjonsnummer",
  },
  {
    id: hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
    type: "tall",
    label:
      "Skriv inn hvor mange timer du jobbet per uke i egen næring før arbeidstiden ble redusert",
  },
  {
    id: hvorMangeTimerJobbetPerUkeNå,
    type: "tall",
    label: "Skriv inn hvor mange timer du jobber per uke i egen næring nå",
    description:
      "For å vurdere om du har rett til dagpenger, må vi vite din nåværende ukentlige arbeidstid. Hvis du jobber mer enn 50 prosent av den totale arbeidstiden du hadde før, har du ikke rett til dagpenger.<br/><br/>" +
      "Hvis arbeidstiden din i egen næring ikke er redusert, kan du skrive inn samme antall timer som i spørsmålet over.",
  },
];

export type LeggTilGårdsbrukSvar = {
  [organisasjonsnummer]?: string;
  [hvilkeTypeGårdsbrukDriverDu]?: Array<typeof dyr | typeof jord | typeof skog | typeof annet>;
  [hvemEierGårdsbruket]?: Array<typeof jeg | typeof samboerEktefelle | typeof andre>;
  [hvorMangeProsentAvInntektenGårTilDeg]?: string;
  [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]?: string;
  [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]?: string;
  [hvordanHarDuBeregnetAntallArbeidstimerTotalt]?: string;
};

export const leggTilGårdsbrukKomponenter: KomponentType[] = [
  {
    id: organisasjonsnummer,
    type: "kortTekst",
    label: "Gårdsbrukets organisasjonsnummer",
  },
  {
    id: hvilkeTypeGårdsbrukDriverDu,
    type: "flervalg",
    options: [
      { value: dyr, label: "Dyr" },
      { value: jord, label: "Jord" },
      { value: skog, label: "Skog" },
      { value: annet, label: "Annet" },
    ],
    label: "Hvilken type gårdsbruk driver du?",
  },
  {
    id: hvemEierGårdsbruket,
    type: "flervalg",
    options: [
      { value: jeg, label: "Jeg" },
      { value: samboerEktefelle, label: "Samboer/ektefelle" },
      { value: andre, label: "Andre" },
    ],
    label: "Hvem eier gårdsbruket?",
  },
  {
    id: hvorMangeProsentAvInntektenGårTilDeg,
    type: "tall",
    label: "Hvor mange prosent av inntekten går til deg?",
  },
  {
    id: hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
    type: "nedtrekksliste",
    options: genererÅrstallOptions(),
    label:
      "Hvor mange arbeidstimer blir brukt på gårdsbruket totalt i løpet av ett år? Velg hvilket år du oppgir timer for først",
  },
  {
    id: hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
    type: "tall",
    label: "Skriv hvor mange arbeidstimer som ble brukt",
  },
  {
    id: hvordanHarDuBeregnetAntallArbeidstimerTotalt,
    type: "langTekst",
    label: "Forklar kort hvordan du har beregnet antall arbeidstimer totalt",
    maxLength: 500,
  },
];
