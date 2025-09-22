import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarFåttAvskjed,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";

export const avskjedigetHvaVarÅrsaken = "avskjediget-hva-var-årsaken";
export const avskjedigetVetDuHvorMangeTimerDuJobbetIUka =
  "avskjediget-vet-du-hvor-mange-timer-du-jobbet-i-uka";
export const avskjedigetHvorMangeTimerHarDuJobbetIUka =
  "avskjediget-hvor-mange-timer-har-du-jobbet-i-uka";

export const arbeidsforholdModalJegHarFåttAvskjedSpørsmål: KomponentType[] = [
  {
    id: "jegHarFåttAvskjedVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Hvis du har fått avskjed fra arbeidsgiver, må vi vite hvorfor.<br/><br/>" +
      "Avskjed betyr at du må slutte i jobben din umiddelbart, uten oppsigelsestid.<br/><br/>" +
      "Du må dokumentere eller beskrive grunnen og datoen for avskjeden. Dette kan for eksempel stå i avskjedsbrevet eller i møtereferat.<br/><br/>" +
      "Har du fått avskjed vil du normalt ikke få utbetalt dagpenger i 18 uker.<br/><br/>" +
      "Det er Nav som vurderer om grunnen til avskjeden får betydning for utbetalingen din.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: "jegHarFåttAvskjedArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: "jegHarFåttAvskjedDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Avskjedigelse",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: avskjedigetHvaVarÅrsaken,
    type: "langTekst",
    label: "Hva var årsaken til at du ble avskjediget?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: avskjedigetVetDuHvorMangeTimerDuJobbetIUka,
    type: "envalg",
    label: "Vet du hvor mange timer du har jobbet i uka før du ble avskjediget?",
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
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: avskjedigetHvorMangeTimerHarDuJobbetIUka,
    type: "kortTekst",
    label: "Skriv inn hvor mange timer du har jobbet per uke før du ble avskjediget",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[avskjedigetVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: "avskjedigetHvorMangeTimerHarDuJobbetIUkaLesMer",
    type: "lesMer",
    label: "Dette skal du oppgi som arbeidstid",
    description:
      "Har du jobbet like mye hver uke, oppgir du denne arbeidstiden. Hvis du ikke har jobbet like mye hver uke, oppgir du det antall timer du har jobbet i snitt de seks siste månedene.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[avskjedigetVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
];
