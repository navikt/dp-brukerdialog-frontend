import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  kontraktenErUgått,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";

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
