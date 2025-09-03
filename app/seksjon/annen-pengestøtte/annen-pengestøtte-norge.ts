import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  AnnenPengestøtteSvar,
  annenYtelse,
  dagpengerFraAnnetEøsLand,
  etterlønnFraArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  garantiLottForFiskere,
  hvemUtbetalerEtterlønnen,
  hvemUtbetalerPengestøtten,
  hvemUtbetalerPensjonen,
  hvilkenAnnenPengestøtteMottas,
  hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed,
  hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed,
  hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed,
  hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed,
  hvilkenPeriodeGjelderEtterlønnenForFraOgMed,
  hvilkenPeriodeGjelderEtterlønnenForTilOgMed,
  hvilkenPeriodeGjelderPensjonenForFraOgMed,
  hvilkenPeriodeGjelderPensjonenForTilOgMed,
  hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed,
  hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed,
  hvilketEøsLandUtbetalerDagpengene,
  hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav,
  mottarEllerHarSøktOmPengestøtteFraAndreEnnNav,
  pensjonFraAndreEnnNav,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";

export const pengestøtteFraNorgeSpørsmål: KomponentType[] = [
  {
    id: mottarEllerHarSøktOmPengestøtteFraAndreEnnNav,
    type: "envalg",
    label: "Mottar du eller har du søkt om ytelser fra andre enn Nav?",
    description:
      "<ul><li>Pensjon fra andre enn NAV</li><li>Etterlønn</li><li>Garantilott for fiskere</li><li>Stønad under arbeidsløshet fra Garantikassen for fiskere</li><li>Annen ytelse</li><li>TODO: Rendre med Aksel sin LIST i stedet?</li></ul>",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "mottarEllerHarSøktOmPengestøtteFraAndreEnnNavLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette?",
    description:
      "På grunnlag av en sømløs tidshorisont tas det høyde for relasjonene i tillegg til forholdene.",
  },
  {
    id: hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav,
    type: "flervalg",
    label: "Mottar du eller har du søkt om ytelser fra andre enn Nav?",
    options: [
      { value: pensjonFraAndreEnnNav, label: "Pensjon fra andre enn Nav" },
      {
        value: garantiLottForFiskere,
        label:
          "Pengestøtte under arbeidsløshet eller garantilott fra Garantikassen for fiskere (GFF)",
      },
      { value: etterlønnFraArbeidsgiver, label: "Etterlønn fra arbeidsgiver" },
      {
        value: dagpengerFraAnnetEøsLand,
        label:
          "Dagpenger fra et annet EØS-land TODO: Faktisk EØS her, under Norge? Sjekk med Chris/Kamile.",
      },
      { value: annenYtelse, label: "Annen ytelse" },
    ],
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[mottarEllerHarSøktOmPengestøtteFraAndreEnnNav] === "ja",
  },
];

export const pensjonFraAndreEnnNavSpørsmål: KomponentType[] = [
  {
    id: "pensjonFraAndreEnnNavDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon på hvem som utbetaler pensjonen, og hvilken periode den gjelder for",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(pensjonFraAndreEnnNav) ||
      false,
  },
  {
    id: hvemUtbetalerPensjonen,
    type: "kortTekst",
    label: "Hvem utbetaler pensjonen?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(pensjonFraAndreEnnNav) ||
      false,
  },
  {
    id: hvilkenPeriodeGjelderPensjonenForFraOgMed,
    periodeLabel: "Hvilken periode gjelder pensjonen for?",
    type: "periodeFra",
    label: "Fra dato",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(pensjonFraAndreEnnNav) ||
      false,
  },
  {
    id: hvilkenPeriodeGjelderPensjonenForTilOgMed,
    type: "periodeTil",
    label: "Til dato",
    optional: true,
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(pensjonFraAndreEnnNav) ||
      false,
  },
];

export const utbetalingFraGarantikassenForFiskereSpørsmål: KomponentType[] = [
  {
    id: "utbetalingFraGarantikassenForFiskereDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon som viser hvilken periode Garantikassen for fiskere utbetaler ytelsen",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(garantiLottForFiskere) ||
      false,
  },
  {
    id: hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed,
    type: "periodeFra",
    periodeLabel: "Hvilken periode gjelder utbetalingen fra GFF for?",
    label: "Fra dato",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(garantiLottForFiskere) ||
      false,
  },
  {
    id: hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed,
    type: "periodeTil",
    label: "Til dato",
    optional: true,
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(garantiLottForFiskere) ||
      false,
  },
];

export const etterlønnFraArbeidsgiverSpørsmål: KomponentType[] = [
  {
    id: "etterlønnFraArbeidsgiverDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon av hvem som utbetaler etterlønnen, og hvilken periode den gjelder for",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        etterlønnFraArbeidsgiver
      ) || false,
  },
  {
    id: hvemUtbetalerEtterlønnen,
    type: "kortTekst",
    label: "Hvem utbetaler etterlønnen?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        etterlønnFraArbeidsgiver
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderEtterlønnenForFraOgMed,
    type: "periodeFra",
    periodeLabel: "Hvilken periode gjelder etterlønnen fra arbeidsgiver for?",
    label: "Fra dato",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        etterlønnFraArbeidsgiver
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderEtterlønnenForTilOgMed,
    type: "periodeTil",
    label: "Til dato",
    optional: true,
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        etterlønnFraArbeidsgiver
      ) || false,
  },
];

export const dagpengerFraEtAnnetEøsLandSpørsmål: KomponentType[] = [
  {
    id: "dagpengerFraEtAnnetEøsLandDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label:
      "Dokumentasjon av hvilket land som utbetaler dagpengene, og hvilken periode den gjelder for",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        dagpengerFraAnnetEøsLand
      ) || false,
  },
  {
    id: hvilketEøsLandUtbetalerDagpengene,
    type: "land",
    label: "Hvilket annet EØS-land utbetaler dagpengene?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        dagpengerFraAnnetEøsLand
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed,
    type: "periodeFra",
    periodeLabel: "Hvilken periode gjelder dagpengene fra det andre EØS-landet for?",
    label: "Fra dato",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        dagpengerFraAnnetEøsLand
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed,
    type: "periodeTil",
    label: "Til dato",
    optional: true,
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        dagpengerFraAnnetEøsLand
      ) || false,
  },
];

export const annenPengestøtteFraAndreEnnNavSpørsmål: KomponentType[] = [
  {
    id: "annenPengestøtteFraAndreEnnNavDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label:
      "dokumentasjon av hvilken ytelse dette er, hvem som utbetaler den, og hvilken periode den gjelder for",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(annenYtelse) || false,
  },
  {
    id: hvilkenAnnenPengestøtteMottas,
    type: "kortTekst",
    label: "Hvilken annen pengestøtte er det du mottar?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(annenYtelse) || false,
  },
  {
    id: hvemUtbetalerPengestøtten,
    type: "kortTekst",
    label: "Hvem utbetaler pengestøtten?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(annenYtelse) || false,
  },
  {
    id: hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed,
    type: "periodeFra",
    periodeLabel: "Hvilken periode gjelder ytelsen for?",
    label: "Fra dato",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(annenYtelse) || false,
  },
  {
    id: hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed,
    type: "periodeTil",
    label: "Til dato",
    optional: true,
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(annenYtelse) || false,
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
