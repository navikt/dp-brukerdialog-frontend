import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  kontraktenErUgått,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver =
  "kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver";
export const kontraktenErUgåttHvaHarDuSvartPåTilbudet = "kontraktenErUgåttHvaHarDuSvartPåTilbudet";
export const kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet";

export const arbeidsforholdModalKontraktenErUgåttKomponenter: KomponentType[] = [
  {
    id: "kontraktenErGåttUtArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUgått,
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
