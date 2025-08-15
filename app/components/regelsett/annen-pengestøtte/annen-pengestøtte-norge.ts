import { Sporsmal } from "../../sporsmal/sporsmal.types";
import {
  AnnenPengestøtteSvar,
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
} from "~/components/regelsett/annen-pengestøtte/annen-pengestøtte-svar";

export const pengestøtteFraNorgeSpørsmål: Sporsmal[] = [
  {
    id: mottarEllerHarSøktOmPengestøtteFraAndreEnnNav,
    type: "envalg",
    label: "Mottar du eller har du søkt om ytelser fra andre enn Nav?",
    description:
      "<ul><li>Pensjon fra andre enn NAV</li><li>Etterlønn</li><li>Garantilott for fiskere</li><li>Stønad under arbeidsløshet fra Garantikassen for fiskere</li><li>Annen ytelse</li><li>TODO: Rendre med Aksel sin LIST i stedet?</li></ul>",
    lesMerDescription:
      "På grunnlag av en sømløs tidshorisont tas det høyde for relasjonene i tillegg til forholdene.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav,
    type: "flervalg",
    label: "Mottar du eller har du søkt om ytelser fra andre enn Nav?",
    options: [
      { value: "pensjonFraAndreEnnNav", label: "Pensjon fra andre enn Nav" },
      { value: "garantiLottForFiskere", label: "Pengestøtte under arbeidsløshet eller garantilott fra Garantikassen for fiskere (GFF)" },
      { value: "etterlønnFraArbeidsgiver", label: "Etterlønn fra arbeidsgiver" },
      {
        value: "dagpengerFraAnnetEøsLand",
        label: "Dagpenger fra et annet EØS-land TODO: Faktisk EØS her, under Norge? Sjekk med Chris/Kamile.",
      },
      { value: "annenYtelse", label: "Annen ytelse" },
    ],
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[mottarEllerHarSøktOmPengestøtteFraAndreEnnNav] === "ja",
  },
];

export const pensjonFraAndreEnnNavSpørsmål: Sporsmal[] = [
  {
    id: hvemUtbetalerPensjonen,
    type: "kortTekst",
    label: "Hvem utbetaler pensjonen?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("pensjonFraAndreEnnNav") ||
      false,
  },
  {
    id: hvilkenPeriodeGjelderPensjonenForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("pensjonFraAndreEnnNav") ||
      false,
  },
  {
    id: hvilkenPeriodeGjelderPensjonenForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("pensjonFraAndreEnnNav") ||
      false,
  },
];

export const utbetalingFraGarantikassenForFiskere: Sporsmal[] = [
  {
    id: hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("garantiLottForFiskere") ||
      false,
  },
  {
    id: hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("garantiLottForFiskere") ||
      false,
  },
];

export const etterlønnFraArbeidsgiverSpørsmål: Sporsmal[] = [
  {
    id: hvemUtbetalerEtterlønnen,
    type: "kortTekst",
    label: "Hvem utbetaler etterlønnen?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("etterlønnFraArbeidsgiver") || false,
  },
  {
    id: hvilkenPeriodeGjelderEtterlønnenForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("etterlønnFraArbeidsgiver") || false,
  },
  {
    id: hvilkenPeriodeGjelderEtterlønnenForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("etterlønnFraArbeidsgiver") || false,
  },
];

export const dagpengerFraEtAnnetEøsLandSpørsmål: Sporsmal[] = [
  {
    id: hvilketEøsLandUtbetalerDagpengene,
    type: "land",
    label: "Hvilket annet EØS-land utbetaler dagpengene?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
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
    visHvis: (svar: AnnenPengestøtteSvar) =>
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
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes(
        "dagpengerFraAnnetEøsLand"
      ) || false,
  },
];

export const annenPengestøtteFraAndreEnnNav: Sporsmal[] = [
  {
    id: hvilkenAnnenPengestøtteMottas,
    type: "kortTekst",
    label: "Hvilken annen pengestøtte er det du mottar?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("annenYtelse") || false,
  },
  {
    id: hvemUtbetalerPengestøtten,
    type: "kortTekst",
    label: "Hvem utbetaler pengestøtten?",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("annenYtelse") || false,
  },
  {
    id: hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed,
    type: "dato",
    label: "Fra dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("annenYtelse") || false,
  },
  {
    id: hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed,
    type: "dato",
    label: "Til dato",
    description:
      "TODO: Bytt ut denne med nytt komponent fra Nattaphong når det er tilgjengelig i main",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?.includes("annenYtelse") || false,
  },
];

export const fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål: Sporsmal[] = [
  {
    id: fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
    type: "envalg",
    label:
      "Får du eller kommer du til å få lønn eller andre økonomiske goder fra tidligere arbeidsgiver?",
    description:
      "Du må gi oss beskjed hvis du får lønn, sluttvederlag eller tilsvarende økonomiske goder fra arbeidsgiver. Du trenger ikke å opplyse om feriepenger.",
    lesMerDescription:
      "Under forutsetning av en inkluderende overveielse realiseres incitamentet for så vidt gjelder ressurssituasjonen.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
    type: "kortTekst",
    label: "Skriv inn hva du får beholde",
    lesMerDescription:
      "Sammenholdt med en tverrfaglig agenda iverksettes økningen på linje med satsingsområdet.",
    visHvis: (svar: AnnenPengestøtteSvar) =>
      svar[fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver] === "ja",
  },
];
