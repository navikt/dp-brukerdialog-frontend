import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
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
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
  hvemUtbetalerPengestøtten,
  hvilkenPengestøtteFraAndreEnnNavMottarDu,
  mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiver,
  mottarDuPengestøtteFraAndreEnnNav,
  pensjonFraAndreEnnNav,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";

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
  [mottarDuPengestøtteFraAndreEnnNav]: "ja",
  pengestøtteFraNorge: [
    {
      [hvilkenPengestøtteFraAndreEnnNavMottarDu]:
        dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
    },
    {
      [hvilkenPengestøtteFraAndreEnnNavMottarDu]: pensjonFraAndreEnnNav,
      [hvemUtbetalerPengestøtten]: "Tant og Fjas AS",
    },
  ],
  [mottarDuAndreUtbetalingerEllerGoderFraTidligereArbeidsgiver]: "ja",
};
