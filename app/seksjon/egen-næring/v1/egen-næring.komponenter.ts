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

export type LeggTilNæringsvirksomhetSvar = {
  [organisasjonsnummer]?: string;
  [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]?: number;
  [hvorMangeTimerJobbetPerUkeNå]?: number;
};

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

type EgenNæringT = TFunction;

const jaNeiOptions = (t: EgenNæringT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagEgenNæringEgenNæringsvirksomhetKomponenter = (t: EgenNæringT): KomponentType[] => [
  {
    id: driverDuEgenNæringsvirksomhet,
    type: "envalg",
    label: t("egenNaeringsvirksomhet.driverDuEgenNaeringsvirksomhet.label"),
    options: jaNeiOptions(t),
  },
  {
    id: "driverDuEgenNæringsvirksomhetLesMer",
    type: "lesMer",
    label: t("egenNaeringsvirksomhet.lesMer.label"),
    description: t("egenNaeringsvirksomhet.lesMer.description"),
  },
  {
    id: "driverDuEgenNæringsvirksomhetInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("felles.informasjon"),
    description: `<p>${t("egenNaeringsvirksomhet.informasjonskort.description")}</p>`,
    visHvis: (svar: EgenNæringSvar) => svar[driverDuEgenNæringsvirksomhet] === "ja",
  },
];

export const lagEgenNæringEgetGårdsbrukKomponenter = (t: EgenNæringT): KomponentType[] => [
  {
    id: driverDuEgetGårdsbruk,
    type: "envalg",
    label: t("egetGardsbruk.driverDuEgetGardsbruk.label"),
    options: jaNeiOptions(t),
  },
  {
    id: "driverDuEgetGårdsbrukInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("felles.informasjon"),
    description:
      `<p>${t("egetGardsbruk.informasjonskort.annetArbeid")}</p>` +
      `<p>${t("egetGardsbruk.informasjonskort.merEnn50Prosent")}</p>` +
      `<p>${t("egetGardsbruk.informasjonskort.vurdering")}</p>`,
    visHvis: (svar: EgenNæringSvar) => svar[driverDuEgetGårdsbruk] === "ja",
  },
];

export const lagLeggTilNæringsvirksomhetKomponenter = (t: EgenNæringT): KomponentType[] => [
  {
    id: virksomhetensNavn,
    type: "kortTekst",
    label: t("leggTilNaeringsvirksomhet.virksomhetensNavn.label"),
    maksLengde: 200,
  },
  {
    id: organisasjonsnummer,
    type: "kortTekst",
    label: t("leggTilNaeringsvirksomhet.organisasjonsnummer.label"),
  },
  {
    id: nårBleArbeidstidenRedusert,
    type: "dato",
    label: t("leggTilNaeringsvirksomhet.narBleArbeidstidenRedusert.label"),
  },
  {
    id: hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
    type: "tall",
    label: t("leggTilNaeringsvirksomhet.timerPerUkeFor.label"),
  },
  {
    id: hvorMangeTimerJobbetPerUkeNå,
    type: "tall",
    label: t("leggTilNaeringsvirksomhet.timerPerUkeNa.label"),
    description:
      `<p>${t("leggTilNaeringsvirksomhet.timerPerUkeNa.description.rettTilDagpenger")}</p>` +
      `<p>${t("leggTilNaeringsvirksomhet.timerPerUkeNa.description.ikkeRedusert")}</p>`,
  },
];

export const lagLeggTilGårdsbrukKomponenter = (t: EgenNæringT): KomponentType[] => [
  {
    id: gårdsbruketsNavn,
    type: "kortTekst",
    label: t("leggTilGardsbruk.gardsbruketsNavn.label"),
    maksLengde: 200,
  },
  {
    id: organisasjonsnummer,
    type: "kortTekst",
    label: t("leggTilGardsbruk.organisasjonsnummer.label"),
    maksLengde: 30,
  },
  {
    id: hvilkeTypeGårdsbrukDriverDu,
    type: "flervalg",
    label: t("leggTilGardsbruk.typeGardsbruk.label"),
    description: t("felles.flervalgDescription"),
    options: [
      { value: dyr, label: t("leggTilGardsbruk.typeGardsbruk.options.dyr") },
      { value: jord, label: t("leggTilGardsbruk.typeGardsbruk.options.jord") },
      { value: skog, label: t("leggTilGardsbruk.typeGardsbruk.options.skog") },
      { value: annet, label: t("leggTilGardsbruk.typeGardsbruk.options.annet") },
    ],
  },
  {
    id: hvemEierGårdsbruket,
    type: "flervalg",
    label: t("leggTilGardsbruk.hvemEierGardsbruket.label"),
    description: t("felles.flervalgDescription"),
    options: [
      { value: jeg, label: t("leggTilGardsbruk.hvemEierGardsbruket.options.jeg") },
      {
        value: samboerEktefelle,
        label: t("leggTilGardsbruk.hvemEierGardsbruket.options.samboerEktefelle"),
      },
      { value: andre, label: t("leggTilGardsbruk.hvemEierGardsbruket.options.andre") },
    ],
  },
  {
    id: hvorMangeProsentAvInntektenGårTilDeg,
    type: "tall",
    label: t("leggTilGardsbruk.prosentInntektDeg.label"),
    maksVerdi: 100,
    visHvis: (svar: LeggTilGårdsbrukSvar) => svar[hvemEierGårdsbruket]?.includes(jeg) || false,
  },
  {
    id: hvorMangeProsentAvInntektenGårTilSamboerEktefelle,
    type: "tall",
    label: t("leggTilGardsbruk.prosentInntektSamboerEktefelle.label"),
    maksVerdi: 100,
    visHvis: (svar: LeggTilGårdsbrukSvar) =>
      svar[hvemEierGårdsbruket]?.includes(samboerEktefelle) || false,
  },
  {
    id: hvorMangeProsentAvInntektenGårTilAndre,
    type: "tall",
    label: t("leggTilGardsbruk.prosentInntektAndre.label"),
    maksVerdi: 100,
    visHvis: (svar: LeggTilGårdsbrukSvar) => svar[hvemEierGårdsbruket]?.includes(andre) || false,
  },
  {
    id: hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
    type: "nedtrekksliste",
    options: genererÅrstallOptions(),
    label: t("leggTilGardsbruk.arbeidstimerTotaltValgtAr.label"),
  },
  {
    id: hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
    type: "tall",
    label: t("leggTilGardsbruk.arbeidstimerTotaltAntallTimer.label"),
  },
  {
    id: hvordanHarDuBeregnetAntallArbeidstimerTotalt,
    type: "langTekst",
    label: t("leggTilGardsbruk.beregningArbeidstimer.label"),
    maksLengde: 500,
  },
];

const fallbackT = ((key: string) => key) as unknown as EgenNæringT;

export const egenNæringEgenNæringsvirksomhetKomponenter =
  lagEgenNæringEgenNæringsvirksomhetKomponenter(fallbackT);

export const egenNæringEgetGårdsbrukKomponenter = lagEgenNæringEgetGårdsbrukKomponenter(fallbackT);

export const leggTilNæringsvirksomhetKomponenter =
  lagLeggTilNæringsvirksomhetKomponenter(fallbackT);

export const leggTilGårdsbrukKomponenter = lagLeggTilGårdsbrukKomponenter(fallbackT);
