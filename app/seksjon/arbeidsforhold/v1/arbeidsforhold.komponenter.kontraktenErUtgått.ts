import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  kontraktenErUtgått,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato =
  "kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato";
export const kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato =
  "kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato";
export const kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver =
  "kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver";
export const kontraktenErUtgåttHvaHarDuSvartPåTilbudet = "kontraktenErUtgåttHvaHarDuSvartPåTilbudet";
export const kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet";

export const arbeidsforholdModalKontraktenErUtgåttKomponenter: KomponentType[] = [
  {
    id: kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
    type: "periodeFra",
    periodeLabel: "Varighet på arbeidsforholdet",
    label: "Fra dato",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
  },
  {
    id: kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
    type: "periodeTil",
    label: "Til dato",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
  },
  {
    id: "kontraktenErGåttUtArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
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
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
  },
  {
    id: kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
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
    id: "kontraktenErUtgåttHvaHarDuSvartPåTilbudetOmForlengelseAvArbeidskontraktenEllerAnnenStillingInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "<p>Hvis du har svart nei til et tilbud om å fortsette hos arbeidsgiveren din, vil du ikke få utbetalt dagpenger de første 18 ukene av dagpengeperioden din.</p>" +
      "<p>Det er viktig at du ikke venter med å søke om dagpenger.</p>" +
      "<p>Du må være registrert som arbeidssøker og sende meldekort i ventetiden.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[kontraktenErUtgåttHvaHarDuSvartPåTilbudet] === "nei",
  },
  {
    id: kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: "Hva er årsaken til at du ikke har tatt imot tilbudet?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[kontraktenErUtgåttHvaHarDuSvartPåTilbudet] === "nei",
  },
];
