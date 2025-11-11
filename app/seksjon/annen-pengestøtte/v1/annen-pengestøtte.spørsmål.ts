import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  PengestøtteFraAndreEøsLandModalSvar,
  pengestøtteFraAndreEøsLandKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  PengestøtteFraNorgeModalSvar,
  pengestøtteFraNorgeKomponenter,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
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

export const annenPengestøtteSpørsmål = pengestøtteFraAndreEøsLandKomponenter
  .concat(pengestøtteFraNorgeKomponenter)
  .concat(fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål);
