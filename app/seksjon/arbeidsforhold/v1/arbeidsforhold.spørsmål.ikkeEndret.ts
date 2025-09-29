import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  arbeidsforholdetErIkkeEndret,
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";

export const ikkeEndretVetDuHvorMangeTimerDuJobbetIUka =
  "ikke-endret-vet-du-hvor-mange-timer-du-jobbet-iuka";
export const ikkeEndretHvorMangeTimerHarDuJobbetIUka =
  "ikke-endret-hvor-mange-timer-har-du-jobbet-iuka";
export const ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikke-endret-har-du-tilleggsopplysninger-til-dette-arbeidsforholdet";
export const ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet =
  "ikke-endret-tilleggsopplysninger-til-dette-arbeidsforholdet";

export const arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål: KomponentType[] = [
  {
    id: ikkeEndretVetDuHvorMangeTimerDuJobbetIUka,
    type: "envalg",
    label: "Vet du hvor mange timer du jobber i uka i dette arbeidsforholdet?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label:
          "Nei, jeg er usikker, bruk opplysninger fra skatteetaten.no/mine inntekter for å beregne min vanlige arbeidstid.",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsforholdetErIkkeEndret,
  },
  {
    id: ikkeEndretHvorMangeTimerHarDuJobbetIUka,
    type: "kortTekst",
    label: "Skriv inn hvor mange timer du har jobber i uka i dette arbeidsforholdet",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[ikkeEndretVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: "ikkeEndretHvorMangeTimerHarDuJobbetIUkaLesMer",
    type: "lesMer",
    label: "Dette skal du oppgi som arbeidstid",
    description:
      "Har du jobbet like mye hver uke, oppgir du denne arbeidstiden. Hvis du ikke har jobbet like mye hver uke, oppgir du det antall timer du har jobbet i snitt de seks siste månedene.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[ikkeEndretHvorMangeTimerHarDuJobbetIUka] === "ja",
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
    maxLength: 500,
    label: "Tilleggsopplysninger",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet] === "ja",
  },
];
