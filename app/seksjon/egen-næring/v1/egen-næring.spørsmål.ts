import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const payload = "payload";
export const erTilbakenavigering = "erTilbakenavigering";
export const driverDuEgenNæringsvirksomhet = "driver-du-egen-næringsvirksomhet";
export const næringsvirksomheter = "næringsvirksomheter";
export const gårdsbruk = "gårdsbruk";
export const driverDuEgetGårdsbruk = "driver-du-eget-gårdsbruk";
export const organisasjonsnummer = "organisasjonsnummer";
export const hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert =
  "hvor-mange-timer-jobbet-per-uke-før-arbeidstiden-ble-redusert";
export const hvorMangeTimerJobbetPerUkeNå = "hvor-mange-timer-jobbet-per-uke-nå";
export const hvilkeTypeGårdsbrukDriverDu = "hvilke-type-gårdsbruk-driver-du";
export const dyr = "dyr";
export const jord = "jord";
export const skog = "skog";
export const annet = "annet";
export const hvemEierGårdsbruket = "hvem-eier-gårdsbruket";
export const jeg = "jeg";
export const samboerEktefelle = "samboer-ektefelle";
export const andre = "andre";
export const hvorMangeProsentAvInntektenGårTilDeg = "hvor-mange-prosent-av-inntekten-går-til-deg";
export const hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr =
  "hvor-mange-arbeidstimer-blir-brukt-på-gårdsbruket-totalt-iløpet-av-et-år-valgt-år";
export const hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer =
  "hvor-mange-arbeidstimer-blir-brukt-på-gårdsbruket-totalt-iløpet-av-et-år-antall-timer";
export const hvordanHarDuBeregnetAntallArbeidstimerTotalt =
  "hvordan-har-du-beregnet-antall-arbeidstimer-totalt";

export type Næringsvirksomhet = {
  [organisasjonsnummer]: string;
  [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]: string;
  [hvorMangeTimerJobbetPerUkeNå]: string;
};

export type Gårdsbruk = {
  [organisasjonsnummer]: string;
  [hvilkeTypeGårdsbrukDriverDu]: ("dyr" | "jord" | "skog" | "annet")[];
  [hvemEierGårdsbruket]: ("jeg" | "samboer-ektefelle" | "andre")[];
  [hvorMangeProsentAvInntektenGårTilDeg]: string;
  [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]: string;
  [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]: string;
  [hvordanHarDuBeregnetAntallArbeidstimerTotalt]: string;
};

export type EgenNæringSvar = {
  [driverDuEgenNæringsvirksomhet]?: "ja" | "nei";
  [driverDuEgetGårdsbruk]?: "ja" | "nei";
};

export type EgenNæringResponse = EgenNæringSvar & {
  [næringsvirksomheter]?: Array<Næringsvirksomhet> | [];
  [gårdsbruk]?: Array<Gårdsbruk> | [];
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
    description:
      "Hvis du er ansatt i ditt eget aksjeselskap, må du legge til arbeidsforholdet i forrige steg. På dette spørsmålet skal du kun legge til egen næring, som enkeltpersonsforetak.",
  },
  {
    id: "driverDuEgenNæringsvirksomhetVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Selv om du driver egen næring må du være villig til å ta annet arbeid. Du må legge til organisasjonsnummer for egen næring.",
    visHvis: (svar: EgenNæringSvar) => svar[driverDuEgenNæringsvirksomhet] === "ja",
  },
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

export type LeggTilNæringsvirksomhetSvar = {
  [organisasjonsnummer]?: string;
  [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]?: number;
  [hvorMangeTimerJobbetPerUkeNå]?: number;
};

export const leggTilNæringsvirksomhetSpørsmål: KomponentType[] = [
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

export const leggTilGårdsbrukSpørsmål: KomponentType[] = [
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
    type: "tall",
    label: "Hvor mange arbeidstimer blir brukt på gårdsbruket totalt i løpet av ett år?",
    description: "Velg hvilket år du oppgir timer for først",
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
