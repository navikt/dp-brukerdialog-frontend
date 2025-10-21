import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  PengestøtteFraAndreEøsLandModalSvar,
  pengestøtteFraAndreEøsLandSpørsmål,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.spørsmål";
import {
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  PengestøtteFraNorgeModalSvar,
  pengestøtteFraNorgeSpørsmål,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.spørsmål";

export const payload = "payload"
export const erTilbakenavigering = "erTilbakenavigering";

export type AnnenPengestøtteSvar = {
  [harMottattEllerSøktOmPengestøtteFraAndreEøsLand]?: "ja" | "nei";
  [mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav]?: "ja" | "nei";
  [fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver]?: "ja" | "nei";
  [skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver]?: string;
};

export type AnnenPengestøtteResponse = AnnenPengestøtteSvar & {
  pengestøtteFraAndreEøsLand?: PengestøtteFraAndreEøsLandModalSvar[];
  pengestøtteFraNorge?: PengestøtteFraNorgeModalSvar[];
};

export const annenPengestøtteSpørsmål = pengestøtteFraAndreEøsLandSpørsmål
  .concat(pengestøtteFraNorgeSpørsmål)
  .concat(fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål);
