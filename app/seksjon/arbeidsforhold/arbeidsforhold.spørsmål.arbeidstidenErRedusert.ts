import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  arbeidstidenErRedusert,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";
import { jegErOppsagtHvaHarDuSvartPåTilbudet } from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.jegErOppsagt";

export const arbeidstidenErRedusertHvaErÅrsaken = "arbeidstiden-er-redusert-hva-er-årsaken";
export const arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet =
  "arbeidstiden-er-redusert-hvilken-dato-startet-arbeidsforholdet";
export const arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert =
  "arbeidstiden-er-redusert-fra-hvilken-dato-er-arbeidstiden-redusert";
export const arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka =
  "arbeidstiden-er-redusert-vet-du-hvor-mange-timer-du-jobbet-i-uka";
export const arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka =
  "arbeidstiden-er-redusert-hvor-mange-timer-har-du-jobbet-i-uka";
export const arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge =
  "arbeidstiden-er-redusert-har-du-fått-tilbud-om-å-fortsette-hos-arbeidsgiveren-din-i-annen-stilling-eller-et-annet-sted-i-norge";
export const arbeidstidenErRedusertHvaHarDuSvartPåTilbudet =
  "arbeidstiden-er-redusert-hva-har-du-svart-på-tilbudet";
export const arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "arbeidstiden-er-redusert-hva-er-grunnen-til-at-du-ikke-har-tatt-imot-tilbudet";

export const arbeidsforholdModalArbeidstidenErRedusertSpørsmål: KomponentType[] = [
  {
    id: "arbeidstidenErRedusertVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Hvis arbeidstiden din er redusert med minst 50 prosent, kan du søke om dagpenger for den reduserte arbeidstiden.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: "arbeidstidenErRedusertArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: "arbeidstidenErRedusertDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon på redusert arbeidstid",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertHvaErÅrsaken,
    type: "langTekst",
    label: "Hva var årsaken til at arbeidstiden ble redusert?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
    type: "dato",
    label: "Hvilken dato startet arbeidsforholdet?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
    type: "dato",
    label: "Fra hvilken dato er arbeidstiden redusert?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka,
    type: "envalg",
    label: "Vet du hvor mange timer du har jobbet i uka før arbeidstiden ble redusert?",
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
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka,
    type: "kortTekst",
    label: "Skriv inn hvor mange timer du har jobbet per uke før arbeidstiden ble redusert?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: "arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUkaLesMer",
    type: "lesMer",
    label: "Dette skal du oppgi som arbeidstid",
    description:
      "Har du jobbet like mye hver uke, oppgir du denne arbeidstiden. Hvis du ikke har jobbet like mye hver uke, oppgir du det antall timer du har jobbet i snitt de seks siste månedene.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
    type: "envalg",
    label:
      "Har du fått tilbud om å fortsette hos arbeidsgiveren din i en annen stilling eller et annet sted i Norge?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
    type: "envalg",
    label: "Hva har du svart på tilbudet?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
      { value: "harIkkeSvart", label: "Har ikke svart" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge
      ] === "ja",
  },
  {
    id: arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: "Hva er grunnen til at du ikke har tatt imot tilbudet?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) => svar[arbeidstidenErRedusertHvaHarDuSvartPåTilbudet] === "nei",
  },
];
