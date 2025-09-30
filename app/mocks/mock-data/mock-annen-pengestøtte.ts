import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.spørsmål";
import {
  foreldrepengerEllerSvangerskapspenger,
  fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed,
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  pleiepengerOmsorgspengerEllerOpplæringspenger,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.spørsmål";
import {
  etterlønnFraArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  hvemUtbetalerPengestøtten,
  hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  pengestøtteUnderArbeidsledighetEllerGarantiLottForFiskere,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.spørsmål";

export const mockAnnenPengestøtte: AnnenPengestøtteResponse = {
  [harMottattEllerSøktOmPengestøtteFraAndreEøsLand]: "ja",
  pengestøtteFraAndreEøsLand: [
    {
      [hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]:
        foreldrepengerEllerSvangerskapspenger,
      [fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]: "DNK",
      [mottarDuFortsattPengestøttenFraAndreEøsLand]: "nei",
      [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed]: "2023-01-25",
      [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed]: "2025-04-01",
    },
    {
      [hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]:
        pleiepengerOmsorgspengerEllerOpplæringspenger,
      [fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]: "SWE",
      [mottarDuFortsattPengestøttenFraAndreEøsLand]: "ja",
      [fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed]: "2024-03-01",
    },
  ],
  [mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav]: "ja",
  pengestøtteFraNorge: [
    {
      [hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm]:
        pengestøtteUnderArbeidsledighetEllerGarantiLottForFiskere,
      [iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed]: "2027-01-01",
      [iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed]: "2027-01-05",
    },
    {
      [hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm]: etterlønnFraArbeidsgiver,
      [hvemUtbetalerPengestøtten]: "Tant og Fjas AS",
      [iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed]: "2027-01-01",
      [iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed]: "2027-01-05",
    },
  ],
  [fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver]: "ja",
  [skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver]: "En mekanisk okse og en sjokoladefontene.",
};
