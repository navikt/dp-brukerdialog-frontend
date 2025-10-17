import {
  avreiseDatoFra,
  avreiseDatoTil,
  bostedsland, folkeregistrertAdresseErNorgeStemmerDet,
  hvorforReistDuFraNorge,
  PersonaliaSvar,
  reisteDuHjemTilLandetDuBorI,
  reisteDuITaktMedRotasjon,
  reistTilbakeTilBostedslandet,
} from "~/seksjon/personalia/v1/personalia.spørsmål";

export const mockPersonalia: PersonaliaSvar = {
  [folkeregistrertAdresseErNorgeStemmerDet]: "nei",
  [bostedsland]: "FIN",
  [reistTilbakeTilBostedslandet]: "ja",
  [reisteDuHjemTilLandetDuBorI]: "nei",
  [reisteDuITaktMedRotasjon]: "nei",
  [avreiseDatoFra]: "2025-08-13",
  [avreiseDatoTil]: "2025-08-15",
  [hvorforReistDuFraNorge]: "Fordi ..",
};
