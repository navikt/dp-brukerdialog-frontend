import type { TFunction } from "i18next";
import { startOfDay, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import {
  hvordanHarDetteArbeidsforholdetEndretSeg,
  kontraktenErUtgått,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import type { ArbeidsforholdModalSvar } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato =
  "kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato";
export const kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato =
  "kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato";
export const kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver =
  "kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver";
export const kontraktenErUtgåttHvaHarDuSvartPåTilbudet =
  "kontraktenErUtgåttHvaHarDuSvartPåTilbudet";
export const kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet";

type ArbeidsforholdT = TFunction;

const jaNeiOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagArbeidsforholdModalKontraktenErUtgåttKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
    type: "periodeFra",
    periodeLabel: t("modal.kontraktenErUtgatt.varighetPaArbeidsforholdet.label"),
    label: t("felles.dato.fraDato"),
    referanseId: kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
  },
  {
    id: kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
    type: "periodeTil",
    label: t("felles.dato.tilDato"),
    referanseId: kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
  },
  {
    id: "kontraktenErGåttUtArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.kontraktenErUtgatt.dokumentasjonskrav.arbeidsavtale"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
  },
  {
    id: kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
    type: "envalg",
    label: t("modal.kontraktenErUtgatt.tilbudOmForlengelse.label"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
  },
  {
    id: kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
    type: "envalg",
    label: t("modal.kontraktenErUtgatt.hvaHarDuSvart.label"),
    options: [
      { value: "ja", label: t("felles.svar.ja") },
      { value: "nei", label: t("felles.svar.nei") },
      { value: "harIkkeSvart", label: t("felles.svar.harIkkeSvart") },
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
    label: t("modal.kontraktenErUtgatt.informasjonskort.label"),
    description:
      `<p>${t("modal.kontraktenErUtgatt.informasjonskort.description.karantene")}</p>` +
      `<p>${t("modal.kontraktenErUtgatt.informasjonskort.description.sokNa")}</p>` +
      `<p>${t("modal.kontraktenErUtgatt.informasjonskort.description.meldekort")}</p>`,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[kontraktenErUtgåttHvaHarDuSvartPåTilbudet] === "nei",
  },
  {
    id: kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: t("modal.kontraktenErUtgatt.grunnTilIkkeTattImot.label"),
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[kontraktenErUtgåttHvaHarDuSvartPåTilbudet] === "nei",
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdModalKontraktenErUtgåttKomponenter =
  lagArbeidsforholdModalKontraktenErUtgåttKomponenter(fallbackT);
