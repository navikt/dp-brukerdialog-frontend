import type { TFunction } from "i18next";
import { startOfDay, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import {
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegErPermittert,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import type { ArbeidsforholdModalSvar } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const permittertVarighetPåArbeidsforholdetFraOgMedDato =
  "permittertVarighetPåArbeidsforholdetFraOgMedDato";
export const permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato =
  "permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato";
export const permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin =
  "permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin";
export const permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien =
  "permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien";
export const permittertNårErDuPermittertFraOgMedDato = "permittertNårErDuPermittertFraOgMedDato";
export const permittertNårErDuPermittertTilOgMedDato = "permittertNårErDuPermittertTilOgMedDato";
export const permittertHvorMangeProsentErDuPermittert = "permittertHvorMangeProsentErDuPermittert";
export const permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr =
  "permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr";
export const permittertLønnsperiodeFraOgMedDato = "permittertLønnsperiodeFraOgMedDato";
export const permittertLønnsperiodeTilOgMedDato = "permittertLønnsperiodeTilOgMedDato";

type ArbeidsforholdT = TFunction;

const jaNeiOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

const jaNeiVetIkkeOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
  { value: "vetIkke", label: t("felles.svar.vetIkke") },
];

export const lagArbeidsforholdModalJegErPermittertKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: permittertVarighetPåArbeidsforholdetFraOgMedDato,
    type: "dato",
    label: t("modal.permittert.varighetPaArbeidsforholdet.label"),
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: permittertNårErDuPermittertFraOgMedDato,
    type: "periodeFra",
    label: t("felles.dato.fraOgMedDato"),
    periodeLabel: t("modal.permittert.permitteringsperiode.label"),
    description: t("modal.permittert.permitteringsperiode.description"),
    referanseId: permittertNårErDuPermittertTilOgMedDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: permittertNårErDuPermittertTilOgMedDato,
    type: "periodeTil",
    label: t("felles.dato.tilOgMedDato"),
    optional: true,
    referanseId: permittertNårErDuPermittertFraOgMedDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: "permittertInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("modal.permittert.informasjonskort.label"),
    description: t("modal.permittert.informasjonskort.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: "permittertArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.permittert.dokumentasjonskrav.arbeidsavtale"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: "permittertPermitteringsvarselDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.permittert.dokumentasjonskrav.permitteringsvarsel"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato,
    type: "envalg",
    label: t("modal.permittert.midlertidigArbeidsforhold.label"),
    options: jaNeiVetIkkeOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin,
    type: "dato",
    label: t("modal.permittert.kontraktsfestetSluttdato.label"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato] === "ja",
  },
  {
    id: permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien,
    type: "envalg",
    label: t("modal.permittert.fiskeforedlingEllerFiskeolje.label"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: permittertHvorMangeProsentErDuPermittert,
    type: "tall",
    label: t("modal.permittert.hvorMangeProsent.label"),
    maksVerdi: 100,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr,
    type: "envalg",
    label: t("modal.permittert.lonnspliktperiodeVetDuNar.label"),
    description: t("modal.permittert.lonnspliktperiodeVetDuNar.description"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
  },
  {
    id: permittertLønnsperiodeFraOgMedDato,
    type: "periodeFra",
    periodeLabel: t("modal.permittert.lonnspliktperiode.label"),
    label: t("felles.dato.fraOgMedDato"),
    referanseId: permittertLønnsperiodeTilOgMedDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr] === "ja",
  },
  {
    id: permittertLønnsperiodeTilOgMedDato,
    type: "periodeTil",
    label: t("felles.dato.tilOgMedDato"),
    optional: true,
    referanseId: permittertLønnsperiodeFraOgMedDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr] === "ja",
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdModalJegErPermittertKomponenter =
  lagArbeidsforholdModalJegErPermittertKomponenter(fallbackT);
