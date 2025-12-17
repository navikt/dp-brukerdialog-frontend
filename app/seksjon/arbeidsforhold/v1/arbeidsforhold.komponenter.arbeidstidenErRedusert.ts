import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  arbeidstidenErRedusert,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet =
  "arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet";
export const arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert =
  "arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert";
export const arbeidstidenErRedusertHvaErÅrsaken = "arbeidstidenErRedusertHvaErÅrsaken";
export const arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge =
  "arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge";
export const arbeidstidenErRedusertHvaHarDuSvartPåTilbudet =
  "arbeidstidenErRedusertHvaHarDuSvartPåTilbudet";
export const arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet";

export const arbeidsforholdModalArbeidstidenErRedusertKomponenter: KomponentType[] = [
  {
    id: arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
    type: "periodeFra",
    periodeLabel: "Varighet på arbeidsforholdet",
    label: "Fra og med",
    description: "Når startet du i dette arbeidsforholdet?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
    type: "periodeTil",
    label: "Til og med",
    description: "Når ble arbeidstiden din redusert?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: "arbeidstidenErRedusertInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Viktig informasjon",
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
    label: "Dokumentasjon av redusert arbeidstid",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertHvaErÅrsaken,
    type: "langTekst",
    label: "Hva er årsaken til at arbeidstiden din ble redusert?",
    maxLength: 500,
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
    id: "arbeidstidenErRedusertHvaHarDuSvartPåTilbudetOmÅFortsetteHosArbeidsgiverInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Viktig informasjon",
    description:
      "<p>Hvis du har svart nei til et tilbud om å fortsette hos arbeidsgiveren din, vil du ikke få utbetalt dagpenger de første 18 ukene av dagpengeperioden din.</p>" +
      "<p>Det er viktig at du ikke venter med å søke om dagpenger.</p>" +
      "<p>Du må være registrert som arbeidssøker og sende meldekort i ventetiden.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[arbeidstidenErRedusertHvaHarDuSvartPåTilbudet] === "nei",
  },
  {
    id: arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: "Hva er årsaken til at du ikke har tatt imot tilbudet?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[arbeidstidenErRedusertHvaHarDuSvartPåTilbudet] === "nei",
  },
];
