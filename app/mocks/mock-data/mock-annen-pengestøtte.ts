import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import {
  foreldrepengerEllerSvangerskapspenger,
  fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato,
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  pleiepengerOmsorgspengerEllerOpplæringspenger,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
  hvemUtbetalerPengestøtten,
  hvilkenPengestøtteFraAndreEnnNavMottarDu,
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
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
      [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato]: "2023-01-25",
      [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato]: "2025-04-01",
    },
    {
      [hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]:
        pleiepengerOmsorgspengerEllerOpplæringspenger,
      [fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]: "SWE",
      [mottarDuFortsattPengestøttenFraAndreEøsLand]: "ja",
      [fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato]: "2024-03-01",
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
  [mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver]: "ja",
};
