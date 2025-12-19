import { KomponentType } from "~/components/Komponent.types";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const handling = "handling";
export const driverDuEgenNæringsvirksomhet = "driverDuEgenNæringsvirksomhet";
export const næringsvirksomheter = "næringsvirksomheter";
export const gårdsbruk = "gårdsbruk";
export const driverDuEgetGårdsbruk = "driverDuEgetGårdsbruk";
export const virksomhetensNavn = "virksomhetensNavn";
export const nårBleArbeidstidenRedusert = "nårBleArbeidstidenRedusert";
export const organisasjonsnummer = "organisasjonsnummer";
export const hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert =
  "hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert";
export const hvorMangeTimerJobbetPerUkeNå = "hvorMangeTimerJobbetPerUkeNå";
export const gårdsbruketsNavn = "gårdsbruketsNavn";
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
  [virksomhetensNavn]: string;
  [organisasjonsnummer]: string;
  [nårBleArbeidstidenRedusert]: string;
  [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]: string;
  [hvorMangeTimerJobbetPerUkeNå]: string;
};

export type Gårdsbruk = {
  [gårdsbruketsNavn]: string;
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
    id: "driverDuEgenNæringsvirksomhetInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Viktig informasjon",
    description:
      "<p>Selv om du driver egen næring må du være villig til å ta annet arbeid. Du må legge til organisasjonsnummer for egen næring.</p>",
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
    id: "driverDuEgetGårdsbrukInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Viktig informasjon",
    description:
      "<p>Selv om du driver et eget gårdsbruk må du være villig til å ta annet arbeid.</p>" +
      "<p>Hvis du jobber mer enn 50 prosent av tidligere arbeidstid har du ikke rett til dagpenger.</p>" +
      "<p>Når du driver gårdsbruk tar Nav utgangspunkt i størrelsen på bruket, arbeidsomfang, mekaniseringsgrad og beliggenhet.</p>",
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
    id: virksomhetensNavn,
    type: "kortTekst",
    label: "Virksomhetens navn",
  },
  {
    id: organisasjonsnummer,
    type: "kortTekst",
    label: "Virksomhetens organisasjonsnummer",
  },
  {
    id: nårBleArbeidstidenRedusert,
    type: "dato",
    label: "Når ble arbeidstiden redusert",
  },
  {
    id: hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
    type: "tall",
    label: "Skriv inn hvor mange timer du jobber per uke i egen næring nå",
  },
  {
    id: hvorMangeTimerJobbetPerUkeNå,
    type: "tall",
    label: "Skriv inn hvor mange timer du jobber per uke i egen næring nå",
    description:
      "<p>For å vurdere om du har rett til dagpenger, må vi vite din nåværende ukentlige arbeidstid. Hvis du jobber mer enn 50 prosent av den totale arbeidstiden du hadde før, har du ikke rett til dagpenger.</p>" +
      "<p>Hvis arbeidstiden din i egen næring ikke er redusert, kan du skrive inn samme antall timer som i spørsmålet over.</p>",
  },
];

export type LeggTilGårdsbrukSvar = {
  [gårdsbruketsNavn]?: string;
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
    id: gårdsbruketsNavn,
    type: "kortTekst",
    label: "Gårdsbrukets navn",
  },
  {
    id: organisasjonsnummer,
    type: "kortTekst",
    label: "Gårdsbrukets organisasjonsnummer",
  },
  {
    id: hvilkeTypeGårdsbrukDriverDu,
    type: "flervalg",
    label: "Hvilken type gårdsbruk driver du?",
    description: "Du kan krysse av for flere",
    options: [
      { value: dyr, label: "Dyr" },
      { value: jord, label: "Jord" },
      { value: skog, label: "Skog" },
      { value: annet, label: "Annet" },
    ],
  },
  {
    id: hvemEierGårdsbruket,
    type: "flervalg",
    label: "Hvem eier gårdsbruket?",
    description: "Du kan krysse av for flere",
    options: [
      { value: jeg, label: "Jeg" },
      { value: samboerEktefelle, label: "Samboer/ektefelle" },
      { value: andre, label: "Andre" },
    ],
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
