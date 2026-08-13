import type { TFunction } from "i18next";
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
export const hvorMangeProsentAvInntektenGårTilSamboerEktefelle =
  "hvorMangeProsentAvInntektenGårTilSamboerEktefelle";
export const hvorMangeProsentAvInntektenGårTilAndre = "hvorMangeProsentAvInntektenGårTilAndre";
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

export function lagEgenNæringEgenNæringsvirksomhetKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: driverDuEgenNæringsvirksomhet,
      type: "envalg",
      label: t("næringsvirksomhet.driverDuEgenNæringsvirksomhet.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: "driverDuEgenNæringsvirksomhetLesMer",
      type: "lesMer",
      label: t("næringsvirksomhet.lesMer.label"),
      description: t("næringsvirksomhet.lesMer.description"),
    },
    {
      id: "driverDuEgenNæringsvirksomhetInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("næringsvirksomhet.informasjonskort.label"),
      description: t("næringsvirksomhet.informasjonskort.description"),
      visHvis: (svar: EgenNæringSvar) => svar[driverDuEgenNæringsvirksomhet] === "ja",
    },
  ];
}

export function lagEgenNæringEgetGårdsbrukKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: driverDuEgetGårdsbruk,
      type: "envalg",
      label: t("gårdsbruk.driverDuEgetGårdsbruk.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
    },
    {
      id: "driverDuEgetGårdsbrukInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("gårdsbruk.informasjonskort.label"),
      description: t("gårdsbruk.informasjonskort.description"),
      visHvis: (svar: EgenNæringSvar) => svar[driverDuEgetGårdsbruk] === "ja",
    },
  ];
}

export type LeggTilNæringsvirksomhetSvar = {
  [organisasjonsnummer]?: string;
  [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]?: number;
  [hvorMangeTimerJobbetPerUkeNå]?: number;
};

export function lagLeggTilNæringsvirksomhetKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: virksomhetensNavn,
      type: "kortTekst",
      label: t("næringsvirksomhet.felt.virksomhetensNavn.label"),
      maksLengde: 200,
    },
    {
      id: organisasjonsnummer,
      type: "kortTekst",
      label: t("næringsvirksomhet.felt.organisasjonsnummer.label"),
    },
    {
      id: nårBleArbeidstidenRedusert,
      type: "dato",
      label: t("næringsvirksomhet.felt.nårBleArbeidstidenRedusert.label"),
    },
    {
      id: hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
      type: "tall",
      label: t("næringsvirksomhet.felt.timerFørReduksjon.label"),
    },
    {
      id: hvorMangeTimerJobbetPerUkeNå,
      type: "tall",
      label: t("næringsvirksomhet.felt.timerNå.label"),
      description: t("næringsvirksomhet.felt.timerNå.description"),
    },
  ];
}

export type LeggTilGårdsbrukSvar = {
  [gårdsbruketsNavn]?: string;
  [organisasjonsnummer]?: string;
  [hvilkeTypeGårdsbrukDriverDu]?: Array<typeof dyr | typeof jord | typeof skog | typeof annet>;
  [hvemEierGårdsbruket]?: Array<typeof jeg | typeof samboerEktefelle | typeof andre>;
  [hvorMangeProsentAvInntektenGårTilDeg]?: string;
  [hvorMangeProsentAvInntektenGårTilSamboerEktefelle]?: string;
  [hvorMangeProsentAvInntektenGårTilAndre]?: string;
  [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]?: string;
  [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]?: string;
  [hvordanHarDuBeregnetAntallArbeidstimerTotalt]?: string;
};

export function lagLeggTilGårdsbrukKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: gårdsbruketsNavn,
      type: "kortTekst",
      label: t("gårdsbruk.felt.gårdsbruketsNavn.label"),
      maksLengde: 200,
    },
    {
      id: organisasjonsnummer,
      type: "kortTekst",
      label: t("gårdsbruk.felt.organisasjonsnummer.label"),
      maksLengde: 30,
    },
    {
      id: hvilkeTypeGårdsbrukDriverDu,
      type: "flervalg",
      label: t("gårdsbruk.felt.hvilkeTypeGårdsbruk.label"),
      description: t("gårdsbruk.felt.hvilkeTypeGårdsbruk.description"),
      options: [
        { value: dyr, label: t("gårdsbruk.felt.hvilkeTypeGårdsbruk.options.dyr") },
        { value: jord, label: t("gårdsbruk.felt.hvilkeTypeGårdsbruk.options.jord") },
        { value: skog, label: t("gårdsbruk.felt.hvilkeTypeGårdsbruk.options.skog") },
        { value: annet, label: t("gårdsbruk.felt.hvilkeTypeGårdsbruk.options.annet") },
      ],
    },
    {
      id: hvemEierGårdsbruket,
      type: "flervalg",
      label: t("gårdsbruk.felt.hvemEier.label"),
      description: t("gårdsbruk.felt.hvemEier.description"),
      options: [
        { value: jeg, label: t("gårdsbruk.felt.hvemEier.options.jeg") },
        { value: samboerEktefelle, label: t("gårdsbruk.felt.hvemEier.options.samboerEktefelle") },
        { value: andre, label: t("gårdsbruk.felt.hvemEier.options.andre") },
      ],
    },
    {
      id: hvorMangeProsentAvInntektenGårTilDeg,
      type: "tall",
      label: t("gårdsbruk.felt.prosentTilDeg.label"),
      maksVerdi: 100,
      visHvis: (svar: LeggTilGårdsbrukSvar) => svar[hvemEierGårdsbruket]?.includes(jeg) || false,
    },
    {
      id: hvorMangeProsentAvInntektenGårTilSamboerEktefelle,
      type: "tall",
      label: t("gårdsbruk.felt.prosentTilSamboerEktefelle.label"),
      maksVerdi: 100,
      visHvis: (svar: LeggTilGårdsbrukSvar) =>
        svar[hvemEierGårdsbruket]?.includes(samboerEktefelle) || false,
    },
    {
      id: hvorMangeProsentAvInntektenGårTilAndre,
      type: "tall",
      label: t("gårdsbruk.felt.prosentTilAndre.label"),
      maksVerdi: 100,
      visHvis: (svar: LeggTilGårdsbrukSvar) => svar[hvemEierGårdsbruket]?.includes(andre) || false,
    },
    {
      id: hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
      type: "nedtrekksliste",
      options: genererÅrstallOptions(),
      label: t("gårdsbruk.felt.arbeidstimerValgtÅr.label"),
    },
    {
      id: hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
      type: "tall",
      label: t("gårdsbruk.felt.arbeidstimerAntallTimer.label"),
    },
    {
      id: hvordanHarDuBeregnetAntallArbeidstimerTotalt,
      type: "langTekst",
      label: t("gårdsbruk.felt.hvordanBeregnet.label"),
      maksLengde: 500,
    },
  ];
}
