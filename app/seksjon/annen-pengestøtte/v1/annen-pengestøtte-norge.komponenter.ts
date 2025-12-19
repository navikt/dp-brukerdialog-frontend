import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";

export const mottarDuPengestøtteFraAndreEnnNav = "mottarDuPengestøtteFraAndreEnnNav";
export const hvilkenPengestøtteFraAndreEnnNavMottarDu = "hvilkenPengestøtteFraAndreEnnNavMottarDu";
export const pensjonFraAndreEnnNav = "pensjonFraAndreEnnNav";
export const dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere =
  "dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere";
export const hvemUtbetalerPengestøtten = "hvemUtbetalerPengestøtten";
export const iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraOgMed =
  "iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraOgMed";
export const iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilOgMed =
  "iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilOgMed";
export const mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiver =
  "mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiver";

export type PengestøtteFraNorgeModalSvar = {
  [hvilkenPengestøtteFraAndreEnnNavMottarDu]?:
    | typeof pensjonFraAndreEnnNav
    | typeof dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere;
  [hvemUtbetalerPengestøtten]?: string;
  [iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraOgMed]?: string;
  [iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilOgMed]?: string;
};

export const pengestøtteFraNorgeKomponenter: KomponentType[] = [
  {
    id: mottarDuPengestøtteFraAndreEnnNav,
    type: "envalg",
    label: "Mottar du pengestøtte fra andre enn Nav?",
    description:
      "<p><ul>" +
      "<li>Pensjon fra andre enn Nav</li>" +
      "<li>Dagpenger for fiskere eller garantilott fra Garantikassen for fiskere (GFF)</li>" +
      "</ul></p>",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "mottarDuPengestøtteFraAndreEnnNavLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette",
    description:
      "Hvis du mottar pengestøtte fra andre enn Nav, kan det ha betydning for retten din til dagpenger.",
  },
  {
    id: "mottarDuPengestøtteFraAndreEnnNavForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<strong>Dine pengestøtter fra Norge</strong><br />" +
      "Du må legge til alle pengestøttene du mottar som som ikke er fra Nav.",
    visHvis: (svar: AnnenPengestøtteSvar) => svar[mottarDuPengestøtteFraAndreEnnNav] === "ja",
  },
];

export const pengestøtteFraNorgeModalKomponenter: KomponentType[] = [
  {
    id: hvilkenPengestøtteFraAndreEnnNavMottarDu,
    type: "envalg",
    label: "Hvilken pengestøtte fra andre enn Nav mottar du?",
    options: [
      { value: pensjonFraAndreEnnNav, label: "Pensjon fra andre enn Nav" },
      {
        value: dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
        label:
          "Dagpenger under arbeidsløshet eller garantilott fra Garantikassen for fiskere (GFF)",
      },
    ],
  },
  {
    id: "hvilkenPengestøtteFraAndreEnnNavMottarDuInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Viktig informasjon",
    description:
      "Har du søkt om en pengestøtte, men ikke fått søknaden behandlet ferdig, må du informere oss så snart du har fått svar.",
  },
  {
    id: "hvilkePengestøtteFraAndreEnnNavMottarDuPensjonFraAndreEnnNavDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon av pensjon fra andre enn Nav",
    visHvis: (svar: PengestøtteFraNorgeModalSvar) =>
      svar[hvilkenPengestøtteFraAndreEnnNavMottarDu] === pensjonFraAndreEnnNav,
  },
  {
    id: "hvilkePengestøtteFraAndreEnnNavMottarDuPengestøtteFraGffDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon av pengestøtte fra Garantikassen for fiskere",
    visHvis: (svar: PengestøtteFraNorgeModalSvar) =>
      svar[hvilkenPengestøtteFraAndreEnnNavMottarDu] ===
      dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
  },
  {
    id: hvemUtbetalerPengestøtten,
    type: "kortTekst",
    label: "Hvem utbetaler pengestøtten?",
    visHvis: (svar: PengestøtteFraNorgeModalSvar) =>
      svar[hvilkenPengestøtteFraAndreEnnNavMottarDu] === "pensjonFraAndreEnnNav",
  },
  {
    id: iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraOgMed,
    type: "periodeFra",
    periodeLabel: "I hvilken periode har du mottatt eller søkt om pengestøtten?",
    label: "Fra og med",
  },
  {
    id: iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilOgMed,
    type: "periodeTil",
    label: "Til og med",
    description: "Hvis du ikke vet hvor lenge du skal motta pengestøtten, så legger du ikke til en dato her.",
    optional: true,
  },
];

export const mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiverKomponenter: KomponentType[] = [
  {
    id: mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiver,
    type: "envalg",
    label:
      "Mottar du andre utbetalinger eller gode fra din tidligere arbeidsgiver enn din vanlige lønn?",
    description:
      "Du må gi oss beskjed hvis du får lønn, etterlønn, sluttvederlag eller tilsvarende økonomiske goder fra arbeidsgiver. Du trenger ikke å opplyse om lønn i oppsigelsestiden eller feriepenger.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiverLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette",
    description:
      "Hvis du mottar utbetalinger eller økonomiske goder fra tidligere arbeidsgiver, kan det ha betydning for retten din til dagpenger.",
  },
  {
    id: "mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiverForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<strong>Dine utbetalinger og økonomiske goder fra tidligere arbeidsgiver</strong><br />" +
      "Du må legge til utbetalinger og økonomiske goder du har fått fra din tidligere arbeidsgiver.",
    visHvis: (svar: AnnenPengestøtteSvar) => svar[mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiver] === "ja",
  },
];
