import type { TFunction } from "i18next";
import { startOfDay, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import {
  arbeidsforholdetErIkkeEndret,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import type { ArbeidsforholdModalSvar } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato =
  "ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato";
export const ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet";
export const ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet";

type ArbeidsforholdT = TFunction;

const jaNeiOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato,
    type: "dato",
    label: t("modal.ikkeEndret.varighetPaArbeidsforholdet.label"),
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
  },
  {
    id: "ikkeEndretArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.ikkeEndret.dokumentasjonskrav.arbeidsavtale"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
  },
  {
    id: ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
    type: "envalg",
    label: t("modal.ikkeEndret.harDuTilleggsopplysninger.label"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
  },
  {
    id: ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
    type: "langTekst",
    maksLengde: 500,
    label: t("modal.ikkeEndret.tilleggsopplysninger.label"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet] === "ja",
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter =
  lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter(fallbackT);
