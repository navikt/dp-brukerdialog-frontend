import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  arbeidsgiverErKonkurs,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";

export const konkursMidlertidigArbeidsforholdMedKontraktsfestetSluttdato =
  "konkurs-midlertidig-arbeidsforhold-med-kontraktsfestet-sluttdato";
export const konkursVetDuHvorMangeTimerDuJobbetIUka =
  "konkurs-vet-du-hvor-mange-timer-du-jobbet-i-uka";
export const konkursHvorMangeTimerHarDuJobbetIUka = "konkurs-hvor-mange-timer-har-du-jobbet-i-uka";

export const arbeidsforholdModalArbeidsgiverErKonkursSpørsmål: KomponentType[] = [
  {
    id: konkursMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
    type: "envalg",
    label: "Er dette et midlertidig arbeidsforhold med en kontraktfestet sluttdato?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
      {
        value: "vetIkke",
        label: "Jeg vet ikke",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: konkursVetDuHvorMangeTimerDuJobbetIUka,
    type: "envalg",
    label: "Vet du hvor mange timer du har jobbet i uka før arbeidsgiver gikk konkurs?",
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
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: konkursHvorMangeTimerHarDuJobbetIUka,
    type: "kortTekst",
    label: "Skriv inn hvor mange timer du har jobbet per uke før arbeidsgiver gikk konkurs",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: "konkursHvorMangeTimerHarDuJobbetIUkaLesMer",
    type: "lesMer",
    label: "Dette skal du oppgi som arbeidstid",
    description:
      "Har du jobbet like mye hver uke, oppgir du denne arbeidstiden. Hvis du ikke har jobbet like mye hver uke, oppgir du det antall timer du har jobbet i snitt de seks siste månedene.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler", // TODO LAG EN ID HER
    type: "envalg",
    label: "Ønsker du å søke om forskudd på lønnsgarantimidler?",
    description:
      "Lønnsgarantimidler erstatter lønn som du ikke har fått utbetalt fordi arbeidsgiveren din går konkurs. Er du usikker på om du har rett på lønnsgarantimidler, anbefaler vi at du søker om forskudd her.",
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
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
];
