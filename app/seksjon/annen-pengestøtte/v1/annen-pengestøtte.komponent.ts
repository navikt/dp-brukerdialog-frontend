import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  pengestøtteFraAndreEøsLandKomponenter,
  PengestøtteFraAndreEøsLandModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter,
  mottarDuPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeKomponenter,
  PengestøtteFraNorgeModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { PengestøtteFraTidligereArbeidsgiverModalSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const handling = "handling";

export type AnnenPengestøtteSvar = {
  [mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver]?: "ja" | "nei";
  [mottarDuPengestøtteFraAndreEnnNav]?: "ja" | "nei";
  [harMottattEllerSøktOmPengestøtteFraAndreEøsLand]?: "ja" | "nei";
};

export type AnnenPengestøtteResponse = AnnenPengestøtteSvar & {
  pengestøtteFraTidligereArbeidsgiver?: PengestøtteFraTidligereArbeidsgiverModalSvar[];
  pengestøtteFraNorge?: PengestøtteFraNorgeModalSvar[];
  pengestøtteFraAndreEøsLand?: PengestøtteFraAndreEøsLandModalSvar[];
};

export const annenPengestøtteKomponenter =
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter
    .concat(pengestøtteFraNorgeKomponenter)
    .concat(pengestøtteFraAndreEøsLandKomponenter);
