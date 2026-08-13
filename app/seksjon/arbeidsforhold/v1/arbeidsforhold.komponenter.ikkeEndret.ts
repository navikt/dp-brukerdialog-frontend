import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  arbeidsforholdetErIkkeEndret,
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { startOfDay, subYears } from "date-fns";

export const ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato =
  "ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato";
export const ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet";
export const ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet";

export function lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter(
  t: TFunction
): KomponentType[] {
  return [
    {
      id: ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato,
      type: "dato",
      label: t("ikkeEndret.nårStartetArbeidsforholdet"),
      fraOgMed: startOfDay(subYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
    },
    {
      id: "ikkeEndretArbeidsavtaleDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.arbeidsavtale"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
    },
    {
      id: ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
      type: "envalg",
      label: t("ikkeEndret.harDuTilleggsopplysninger.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
    },
    {
      id: ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
      type: "langTekst",
      maksLengde: 500,
      label: t("ikkeEndret.tilleggsopplysninger.label"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet] === "ja",
    },
  ];
}
