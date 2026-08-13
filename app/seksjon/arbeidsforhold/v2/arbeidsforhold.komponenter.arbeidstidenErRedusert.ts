import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  arbeidstidenErRedusert,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter";
import { startOfDay, subYears } from "date-fns";

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

export function lagArbeidsforholdModalArbeidstidenErRedusertKomponenter(
  t: TFunction
): KomponentType[] {
  return [
    {
      id: arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
      type: "periodeFra",
      periodeLabel: t("felles.varighetPåArbeidsforholdet"),
      label: t("felles.fraDato"),
      description: t("arbeidstidenErRedusert.fraDatoDescription"),
      referanseId: arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
      fraOgMed: startOfDay(subYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
    },
    {
      id: arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
      type: "periodeTil",
      label: t("felles.tilDato"),
      description: t("arbeidstidenErRedusert.tilDatoDescription"),
      referanseId: arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
    },
    {
      id: "arbeidstidenErRedusertInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("felles.informasjon"),
      description: t("arbeidstidenErRedusert.informasjonskort"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
    },
    {
      id: "arbeidstidenErRedusertArbeidsavtaleDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.arbeidsavtale"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
    },
    {
      id: "arbeidstidenErRedusertDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("arbeidstidenErRedusert.dokumentasjonskravindikator"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
    },
    {
      id: arbeidstidenErRedusertHvaErÅrsaken,
      type: "langTekst",
      label: t("arbeidstidenErRedusert.hvaErÅrsaken"),
      maksLengde: 500,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
    },
    {
      id: arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
      type: "envalg",
      label: t("felles.harDuFåttTilbudOmÅFortsette"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
    },
    {
      id: arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
      type: "envalg",
      label: t("felles.hvaHarDuSvartPåTilbudet"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
        { value: "harIkkeSvart", label: t("envalg.svar.harIkkeSvart") },
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
      label: t("felles.informasjon"),
      description: t("felles.avslåttTilbudInformasjonskort"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[arbeidstidenErRedusertHvaHarDuSvartPåTilbudet] === "nei",
    },
    {
      id: arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
      type: "langTekst",
      label: t("felles.hvaErÅrsakenTilAtDuIkkeHarTattImotTilbudet"),
      maksLengde: 500,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[arbeidstidenErRedusertHvaHarDuSvartPåTilbudet] === "nei",
    },
  ];
}
