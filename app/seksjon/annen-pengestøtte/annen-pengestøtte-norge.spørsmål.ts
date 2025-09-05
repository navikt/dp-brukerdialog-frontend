import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  AnnenPengestøtteSvar,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";

export const pengestøtteFraNorge = "pengestøtte-fra-norge";
export const mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav =
  "mottar-du-eller-har-du-søkt-om-pengestøtte-fra-andre-enn-nav";
export const hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm =
  "hvilke-pengestøtte-fra-andre-enn-nav-mottar-du-eller-har-du-søkt-om";
export const pensjonFraAndreEnnNav = "pensjonFraAndreEnnNav";
export const pengestøtteUnderArbeidsledighetEllerGarantiLottForFiskere = "garantiLottForFiskere";
export const etterlønnFraArbeidsgiver = "etterlønnFraArbeidsgiver";
export const hvemUtbetalerPengestøtten = "hvem-utbetaler-pengestøtten";
export const iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed =
  "i-hvilken-periode-mottar-du-eller-har-du-søkt-om-pengestøtte-fra-norge-fra-og-med";
export const iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed =
  "i-hvilken-periode-mottar-du-eller-har-du-søkt-om-pengestøtte-fra-norge-til-og-med"
export const fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver =
  "får-eller-kommer-til-å-få-lønn-eller-andre-goder-fra-tidligere-arbeidsgiver";
export const skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver =
  "skriv-inn-hva-du-får-beholde-fra-tidligere-arbeidsgiver";

export type PengestøtteFraNorgeModalSvar = {
  [hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm]?:
    | typeof pensjonFraAndreEnnNav
    | typeof pengestøtteUnderArbeidsledighetEllerGarantiLottForFiskere
    | typeof etterlønnFraArbeidsgiver;
  [hvemUtbetalerPengestøtten]?: string;
  [iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed]?: string;
  [iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed]?: string;
};

export const pengestøtteFraNorgeSpørsmål: KomponentType[] = [
  {
    id: mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
    type: "envalg",
    label: "Mottar du eller har du søkt om pengestøtte fra andre enn Nav?",
    description:
      "<ul><li>Pensjon fra andre enn NAV</li><li>Etterlønn</li><li>Pengestøtte under arbeidsløshet eller garantilott fra Garantikassen for fiskere (GFF)</li></ul>",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "mottarEllerHarSøktOmPengestøtteFraAndreEnnNavLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette",
    description:
      "På grunnlag av en sømløs tidshorisont tas det høyde for relasjonene i tillegg til forholdene.",
  },
];

export const pengestøtteFraNorgeModalSpørsmål: KomponentType[] = [
  {
    id: hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm,
    type: "envalg",
    label: "Hvilke pengestøtte fra andre enn Nav har du mottatt eller søkt om?",
    options: [
      { value: pensjonFraAndreEnnNav, label: "Pensjon fra andre enn Nav" },
      { value: etterlønnFraArbeidsgiver, label: "Etterlønn fra arbeidsgiver" },
      {
        value: pengestøtteUnderArbeidsledighetEllerGarantiLottForFiskere,
        label:
          "Pengestøtte under arbeidsløshet eller garantilott fra Garantikassen for fiskere (GFF)",
      },
    ],
  },
  {
    id: "hvilkePengestøtteFraAndreEnnNavHarDuMottattEllerSøktOmVarselMelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Du må legge ved dokumentasjon på hvem som utbetaler pengestøtten, og hvilken periode den gjelder for.",
  },
  {
    id: hvemUtbetalerPengestøtten,
    type: "kortTekst",
    label: "Hvem utbetaler pengestøtten?",
    visHvis: (svar: PengestøtteFraNorgeModalSvar) =>
      svar[hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm] === "pensjonFraAndreEnnNav" ||
      svar[hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm] === "etterlønnFraArbeidsgiver",
  },
  {
    id: iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed,
    type: "periodeFra",
    periodeLabel: "I hvilken periode har du mottatt eller søkt om pengestøtten?",
    label: "Fra og med",
  },
  {
    id: iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed,
    type: "periodeTil",
    label: "Til og med",
    optional: true,
  },
];

export const fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål: KomponentType[] =
  [
    {
      id: fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
      type: "envalg",
      label:
        "Får du eller kommer du til å få lønn eller andre økonomiske goder fra tidligere arbeidsgiver?",
      description:
        "Du må gi oss beskjed hvis du får lønn, sluttvederlag eller tilsvarende økonomiske goder fra arbeidsgiver. Du trenger ikke å opplyse om feriepenger.",
      options: [
        { value: "ja", label: "Ja" },
        { value: "nei", label: "Nei" },
      ],
    },
    {
      id: "fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverLesMer",
      type: "lesMer",
      label: "Grunnen til at vi spør om dette?",
      description:
        "Under forutsetning av en inkluderende overveielse realiseres incitamentet for så vidt gjelder ressurssituasjonen.",
    },
    {
      id: "fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: "Avtale om økonomiske goder fra arbeidsgiver",
      visHvis: (svar: AnnenPengestøtteSvar) =>
        svar[fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver] === "ja",
    },
    {
      id: skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
      type: "kortTekst",
      label: "Skriv inn hva du får beholde",
      visHvis: (svar: AnnenPengestøtteSvar) =>
        svar[fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver] === "ja",
    },
  ];
