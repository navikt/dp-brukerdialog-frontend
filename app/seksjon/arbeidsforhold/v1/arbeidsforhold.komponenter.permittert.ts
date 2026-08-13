import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegErPermittert,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { startOfDay, subYears } from "date-fns";

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

export function lagArbeidsforholdModalJegErPermittertKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: permittertVarighetPåArbeidsforholdetFraOgMedDato,
      type: "dato",
      label: t("permittert.nårStartetArbeidsforholdet"),
      fraOgMed: startOfDay(subYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: permittertNårErDuPermittertFraOgMedDato,
      type: "periodeFra",
      label: t("felles.fraOgMedDato"),
      periodeLabel: t("permittert.nårErDuPermittert.periodeLabel"),
      description: t("permittert.nårErDuPermittert.description"),
      referanseId: permittertNårErDuPermittertTilOgMedDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: permittertNårErDuPermittertTilOgMedDato,
      type: "periodeTil",
      label: t("felles.tilOgMedDato"),
      optional: true,
      referanseId: permittertNårErDuPermittertFraOgMedDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: "permittertInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("felles.informasjon"),
      description: t("permittert.informasjonskort"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: "permittertArbeidsavtaleDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.arbeidsavtale"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: "permittertPermitteringsvarselDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("permittert.permitteringsvarsel"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato,
      type: "envalg",
      label: t("permittert.erDuMidlertidigAnsatt.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
        { value: "vetIkke", label: t("envalg.svar.vetIkke") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin,
      type: "dato",
      label: t("permittert.oppgiSluttdato.label"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato] === "ja",
    },
    {
      id: permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien,
      type: "envalg",
      label: t("permittert.erDuPermittertFraFiskeindustrien.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: permittertHvorMangeProsentErDuPermittert,
      type: "tall",
      label: t("permittert.hvorMangeProsentErDuPermittert.label"),
      maksVerdi: 100,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr,
      type: "envalg",
      label: t("permittert.vetDuNårLønnspliktperiodenEr.label"),
      description: t("permittert.vetDuNårLønnspliktperiodenEr.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermittert,
    },
    {
      id: permittertLønnsperiodeFraOgMedDato,
      type: "periodeFra",
      periodeLabel: t("permittert.lønnspliktperiode.periodeLabel"),
      label: t("felles.fraOgMedDato"),
      referanseId: permittertLønnsperiodeTilOgMedDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr] === "ja",
    },
    {
      id: permittertLønnsperiodeTilOgMedDato,
      type: "periodeTil",
      label: t("felles.tilOgMedDato"),
      optional: true,
      referanseId: permittertLønnsperiodeFraOgMedDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr] === "ja",
    },
  ];
}
