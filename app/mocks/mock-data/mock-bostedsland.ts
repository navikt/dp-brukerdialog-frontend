import {
  avreiseDatoFra,
  avreiseDatoTil,
  bostedsland,
  BostedslandSvar,
  hvorforReistDuFraNorge,
  reisteDuHjemTilLandetDuBorI,
  reisteDuITaktMedRotasjon,
  reistTilbakeTilBostedslandet,
} from "~/seksjon/bostedsland/v1/bostedsland.spørsmål";

export const mockBostedsland: BostedslandSvar = {
  [bostedsland]: "FIN",
  [reistTilbakeTilBostedslandet]: "ja",
  [reisteDuHjemTilLandetDuBorI]: "nei",
  [reisteDuITaktMedRotasjon]: "nei",
  [avreiseDatoFra]: "2025-08-13",
  [avreiseDatoTil]: "2025-08-15",
  [hvorforReistDuFraNorge]: "Fordi ..",
};
