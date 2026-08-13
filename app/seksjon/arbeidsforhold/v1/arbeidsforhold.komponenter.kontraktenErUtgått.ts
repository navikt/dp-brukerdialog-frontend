import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  kontraktenErUtgått,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { startOfDay, subYears } from "date-fns";

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

export function lagArbeidsforholdModalKontraktenErUtgåttKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
      type: "periodeFra",
      periodeLabel: t("felles.varighetPåArbeidsforholdet"),
      label: t("felles.fraDato"),
      referanseId: kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
      fraOgMed: startOfDay(subYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
    },
    {
      id: kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
      type: "periodeTil",
      label: t("felles.tilDato"),
      referanseId: kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
    },
    {
      id: "kontraktenErGåttUtArbeidsavtaleDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.arbeidsavtale"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
    },
    {
      id: kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
      type: "envalg",
      label: t("kontraktenErUtgått.harDuFåttTilbudOmForlengelse"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === kontraktenErUtgått,
    },
    {
      id: kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
      type: "envalg",
      label: t("felles.hvaHarDuSvartPåTilbudet"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
        { value: "harIkkeSvart", label: t("envalg.svar.harIkkeSvart") },
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
      label: t("felles.informasjon"),
      description: t("felles.avslåttTilbudInformasjonskort"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[kontraktenErUtgåttHvaHarDuSvartPåTilbudet] === "nei",
    },
    {
      id: kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
      type: "langTekst",
      label: t("felles.hvaErÅrsakenTilAtDuIkkeHarTattImotTilbudet"),
      maksLengde: 500,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[kontraktenErUtgåttHvaHarDuSvartPåTilbudet] === "nei",
    },
  ];
}
