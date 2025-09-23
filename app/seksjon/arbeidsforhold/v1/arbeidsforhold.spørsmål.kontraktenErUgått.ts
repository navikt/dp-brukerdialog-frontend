import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  kontraktenErUgått,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";

export const kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka =
  "kontrakten-er-ugått-vet-du-hvor-mange-timer-du-jobbet-i-uka-før-du-kontrakten-gikk-ut";
export const kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka =
  "kontrakten-er-ugått-hvor-mange-timer-har-du-jobbet-i-uka-i-dette-arbeidsforholdet";
export const kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver =
  "kontrakten-er-ugått-har-du-fått-tilbud-om-forlengelse-av-arbeidskontrakten-eller-tilbud-om-en-annen-stilling-hos-arbeidsgiver";
export const kontraktenErUgåttHvaHarDuSvartPåTilbudet =
  "kontrakten-er-ugått-hva-har-du-svart-på-tilbudet";
export const kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "kontrakten-er-ugått-hva-er-grunnen-til-at-du-ikke-har-tatt-imot-tilbudet";

export const arbeidsforholdModalKontraktenErUgåttSpørsmål: KomponentType[] = [
  {
    id: "kontraktenErGåttUtArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUgått,
  },
  {
    id: kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka,
    type: "envalg",
    label: "Vet du hvor mange timer du har jobbet i uka før kontrakten gikk ut?",
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
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUgått,
  },
  {
    id: kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka,
    type: "kortTekst",
    label: "Skriv inn hvor mange timer du har jobbet per uke før kontrakten gikk ut",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: "kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUkaLesMer",
    type: "lesMer",
    label: "Dette skal du oppgi som arbeidstid",
    description:
      "Har du jobbet like mye hver uke, oppgir du denne arbeidstiden. Hvis du ikke har jobbet like mye hver uke, oppgir du det antall timer du har jobbet i snitt de seks siste månedene.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
    type: "envalg",
    label:
      "Har du fått tilbud om forlengelse av arbeidskontrakten eller tilbud om annen stilling hos arbeidsgiveren din?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUgått,
  },
  {
    id: kontraktenErUgåttHvaHarDuSvartPåTilbudet,
    type: "envalg",
    label: "Hva har du svart på tilbudet?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
      { value: "harIkkeSvart", label: "Har ikke svart" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver
      ] === "ja",
  },
  {
    id: kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: "Hva er grunnen til at du ikke har tatt imot tilbudet?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[kontraktenErUgåttHvaHarDuSvartPåTilbudet] === "nei",
  },
];
