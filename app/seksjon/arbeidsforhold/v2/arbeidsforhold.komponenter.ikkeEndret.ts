import { KomponentType } from "~/components/Komponent.types";
import {
  arbeidsforholdetErIkkeEndret,
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter";
import { startOfDay, subYears } from "date-fns";

export const ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato =
  "ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato";
export const ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet";
export const ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet";

export const arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter: KomponentType[] = [
  {
    id: ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato,
    type: "dato",
    label: "Når startet du i dette arbeidsforholdet?",
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
  },
  {
    id: "ikkeEndretArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
  },
  {
    id: ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
    type: "envalg",
    label: "Har du tilleggsopplysninger til dette arbeidsforholdet?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
  },
  {
    id: ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
    type: "langTekst",
    maksLengde: 500,
    label: "Tilleggsopplysninger",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet] === "ja",
  },
];
