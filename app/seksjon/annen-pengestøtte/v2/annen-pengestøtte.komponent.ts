import { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  lagPengestøtteFraAndreEøsLandKomponenter,
  PengestøtteFraAndreEøsLandModalSvar,
} from "./annen-pengestøtte-eøs.komponenter";
import {
  lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter,
  lagPengestøtteFraNorgeKomponenter,
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
  mottarDuPengestøtteFraAndreEnnNav,
  PengestøtteFraNorgeModalSvar,
} from "./annen-pengestøtte-norge.komponenter";
import { PengestøtteFraTidligereArbeidsgiverModalSvar } from "./annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";

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

export function lagAnnenPengestøtteKomponenter(t: TFunction): KomponentType[] {
  return lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter(t)
    .concat(lagPengestøtteFraNorgeKomponenter(t))
    .concat(lagPengestøtteFraAndreEøsLandKomponenter(t));
}
