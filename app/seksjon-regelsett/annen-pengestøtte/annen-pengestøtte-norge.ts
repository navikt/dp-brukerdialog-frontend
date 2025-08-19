import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  AnnenPengestøtteSpørsmål,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
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
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon-regelsett/annen-pengestøtte/annen-pengestøtte.spørsmål";

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
      { value: "pensjonFraAndreEnnNav", label: "Pensjon fra andre enn Nav" },
      {
        value: "garantiLottForFiskere",
        label:
          "Pengestøtte under arbeidsløshet eller garantilott fra Garantikassen for fiskere (GFF)",
      },
      { value: "etterlønnFraArbeidsgiver", label: "Etterlønn fra arbeidsgiver" },
      {
        value: "dagpengerFraAnnetEøsLand",
        label:
          "Dagpenger fra et annet EØS-land TODO: Faktisk EØS her, under Norge? Sjekk med Chris/Kamile.",
      },
      { value: "annenYtelse", label: "Annen ytelse" },
    ],
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[mottarEllerHarSøktOmPengestøtteFraAndreEnnNav] === "ja",
  },
];

export const pensjonFraAndreEnnNavSpørsmål: KomponentType[] = [
  {
    id: hvemUtbetalerPensjonen,
    type: "kortTekst",
    label: "Hvem utbetaler pensjonen?",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "pensjonFraAndreEnnNav"
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderPensjonenForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "pensjonFraAndreEnnNav"
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderPensjonenForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "pensjonFraAndreEnnNav"
      ) || false,
  },
];

export const utbetalingFraGarantikassenForFiskere: KomponentType[] = [
  {
    id: hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "garantiLottForFiskere"
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "garantiLottForFiskere"
      ) || false,
  },
];

export const etterlønnFraArbeidsgiverSpørsmål: KomponentType[] = [
  {
    id: hvemUtbetalerEtterlønnen,
    type: "kortTekst",
    label: "Hvem utbetaler etterlønnen?",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "etterlønnFraArbeidsgiver"
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderEtterlønnenForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "etterlønnFraArbeidsgiver"
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderEtterlønnenForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "etterlønnFraArbeidsgiver"
      ) || false,
  },
];

export const dagpengerFraEtAnnetEøsLandSpørsmål: KomponentType[] = [
  {
    id: hvilketEøsLandUtbetalerDagpengene,
    type: "land",
    label: "Hvilket annet EØS-land utbetaler dagpengene?",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "dagpengerFraAnnetEøsLand"
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "dagpengerFraAnnetEøsLand"
      ) || false,
  },
  {
    id: hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "dagpengerFraAnnetEøsLand"
      ) || false,
  },
];

export const annenPengestøtteFraAndreEnnNav: KomponentType[] = [
  {
    id: hvilkenAnnenPengestøtteMottas,
    type: "kortTekst",
    label: "Hvilken annen pengestøtte er det du mottar?",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("annenYtelse") || false,
  },
  {
    id: hvemUtbetalerPengestøtten,
    type: "kortTekst",
    label: "Hvem utbetaler pengestøtten?",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("annenYtelse") || false,
  },
  {
    id: hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("annenYtelse") || false,
  },
  {
    id: hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSpørsmål) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("annenYtelse") || false,
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
      id: skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
      type: "kortTekst",
      label: "Skriv inn hva du får beholde",
      visHvis: (svar: AnnenPengestøtteSpørsmål) =>
        svar[fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver] === "ja",
    },
    {
      id: "skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiverLesMer",
      type: "lesMer",
      label: "Grunnen til at vi spør om dette?",
      description:
        "Sammenholdt med en tverrfaglig agenda iverksettes økningen på linje med satsingsområdet.",
      visHvis: (svar: AnnenPengestøtteSpørsmål) =>
        svar[fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver] === "ja",
    },
  ];
