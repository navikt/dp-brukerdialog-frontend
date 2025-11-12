import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  arbeidstidenErRedusert,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const arbeidstidenErRedusertHvaErÅrsaken = "arbeidstidenErRedusertHvaErÅrsaken";
export const arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet =
  "arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet";
export const arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert =
  "arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert";
export const arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge =
  "arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge";
export const arbeidstidenErRedusertHvaHarDuSvartPåTilbudet =
  "arbeidstidenErRedusertHvaHarDuSvartPåTilbudet";
export const arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet";

export const arbeidsforholdModalArbeidstidenErRedusertKomponenter: KomponentType[] = [
  {
    id: "arbeidstidenErRedusertVarselmelding",
    type: "varselmelding",
    variant: "info",
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
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[arbeidstidenErRedusertHvaHarDuSvartPåTilbudet] === "nei",
  },
];
