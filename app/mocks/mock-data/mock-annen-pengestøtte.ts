import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";
import { harMottattEllerSøktOmPengestøtteFraAndreEøsLand } from "~/seksjon/annen-pengestøtte/annen-pengestøtte-eøs.spørsmål";
import {
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte-norge.spørsmål";

export const mockAnnenPengestøtte: AnnenPengestøtteResponse = {
  [harMottattEllerSøktOmPengestøtteFraAndreEøsLand]: "ja",
  pengestøtteFraAndreEøsLand: [],
  [mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav]: "nei",
  pengestøtteFraNorge: [],
  [fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver]: "nei",
};
