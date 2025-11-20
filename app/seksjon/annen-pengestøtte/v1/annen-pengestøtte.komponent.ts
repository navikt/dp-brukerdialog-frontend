import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  pengestøtteFraAndreEøsLandKomponenter,
  PengestøtteFraAndreEøsLandModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverKomponenter,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeKomponenter,
  PengestøtteFraNorgeModalSvar,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const handling = "handling";

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

export const annenPengestøtteKomponenter = pengestøtteFraAndreEøsLandKomponenter
  .concat(pengestøtteFraNorgeKomponenter)
  .concat(fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverKomponenter);
