import type { TFunction } from "i18next";
import { startOfDay, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import {
  arbeidstidenErRedusert,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import type { ArbeidsforholdModalSvar } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

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

type ArbeidsforholdT = TFunction;

const jaNeiOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

const jaNeiHarIkkeSvartOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
  { value: "harIkkeSvart", label: t("felles.svar.harIkkeSvart") },
];

export const lagArbeidsforholdModalArbeidstidenErRedusertKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
    type: "periodeFra",
    periodeLabel: t("modal.arbeidstidenErRedusert.varighetPaArbeidsforholdet.label"),
    label: t("felles.dato.fraDato"),
    description: t("modal.arbeidstidenErRedusert.startetArbeidsforholdet.description"),
    referanseId: arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
    type: "periodeTil",
    label: t("felles.dato.tilDato"),
    description: t("modal.arbeidstidenErRedusert.redusertFra.description"),
    referanseId: arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: "arbeidstidenErRedusertInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("modal.arbeidstidenErRedusert.informasjonskort.label"),
    description: t("modal.arbeidstidenErRedusert.informasjonskort.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: "arbeidstidenErRedusertArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.arbeidstidenErRedusert.dokumentasjonskrav.arbeidsavtale"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: "arbeidstidenErRedusertDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.arbeidstidenErRedusert.dokumentasjonskrav.redusertArbeidstid"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertHvaErÅrsaken,
    type: "langTekst",
    label: t("modal.arbeidstidenErRedusert.hvaErArsaken.label"),
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
    type: "envalg",
    label: t("modal.arbeidstidenErRedusert.tilbudOmAnnenStilling.label"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidstidenErRedusert,
  },
  {
    id: arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
    type: "envalg",
    label: t("modal.arbeidstidenErRedusert.hvaHarDuSvart.label"),
    options: jaNeiHarIkkeSvartOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge
      ] === "ja",
  },
  {
    id: "arbeidstidenErRedusertHvaHarDuSvartPåTilbudetOmÅFortsetteHosArbeidsgiverInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("modal.arbeidstidenErRedusert.tilbudAvslattInformasjonskort.label"),
    description:
      `<p>${t("modal.arbeidstidenErRedusert.tilbudAvslattInformasjonskort.description.karantene")}</p>` +
      `<p>${t("modal.arbeidstidenErRedusert.tilbudAvslattInformasjonskort.description.sokNa")}</p>` +
      `<p>${t("modal.arbeidstidenErRedusert.tilbudAvslattInformasjonskort.description.meldekort")}</p>`,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[arbeidstidenErRedusertHvaHarDuSvartPåTilbudet] === "nei",
  },
  {
    id: arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: t("modal.arbeidstidenErRedusert.grunnTilIkkeTattImot.label"),
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[arbeidstidenErRedusertHvaHarDuSvartPåTilbudet] === "nei",
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdModalArbeidstidenErRedusertKomponenter =
  lagArbeidsforholdModalArbeidstidenErRedusertKomponenter(fallbackT);
