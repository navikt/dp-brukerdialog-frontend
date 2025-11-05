import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  arbeidsforholdetErIkkeEndret,
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";

export const ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikke-endret-har-du-tilleggsopplysninger-til-dette-arbeidsforholdet";
export const ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikke-endret-tilleggsopplysninger-til-dette-arbeidsforholdet";

export const arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål: KomponentType[] = [
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
    maxLength: 500,
    label: "Tilleggsopplysninger",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet] === "ja",
  },
];
