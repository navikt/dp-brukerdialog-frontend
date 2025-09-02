import {
  avreiseDatoFra,
  avreiseDatoTil,
  bostedsland,
  BostedslandSvar,
  hvorforReistDuFraNorge,
  reisteDuHjemTilLandetDuBorI,
  reisteDuITaktMedRotasjon,
  reistTilbakeTilBostedslandet,
} from "~/seksjon-regelsett/bostedsland/bostedsland.spørsmål";

export const mockBostedsland: BostedslandSvar = {
  [bostedsland]: "FI",
  [reistTilbakeTilBostedslandet]: "ja",
  [reisteDuHjemTilLandetDuBorI]: "nei",
  [reisteDuITaktMedRotasjon]: "nei",
  [avreiseDatoFra]: "2025-08-13",
  [avreiseDatoTil]: "2025-08-15",
  [hvorforReistDuFraNorge]: "Fordi ..",
};
