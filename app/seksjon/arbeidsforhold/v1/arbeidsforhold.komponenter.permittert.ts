import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegErPermitert,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

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

export const arbeidsforholdModalJegErPermittertKomponenter: KomponentType[] = [
  {
    id: permittertVarighetPåArbeidsforholdetFraOgMedDato,
    type: "dato",
    label: "Når startet du i dette arbeidsforholdet?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertNårErDuPermittertFraOgMedDato,
    type: "periodeFra",
    label: "Fra og med dato",
    periodeLabel: "Når er du permittert?",
    description:
      "Hvis du har hatt flere permitteringsperioder skal du oppgi dato for den siste permitteringen.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertNårErDuPermittertTilOgMedDato,
    type: "periodeTil",
    label: "Til og med dato",
    optional: true,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: "permittertInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "For å ha rett til dagpenger under permittering, må arbeidstiden din være redusert med minst 50 prosent. Årsaken til permitteringen må være mangel på arbeid eller andre forhold som arbeidsgiver ikke kan påvirke.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: "permittertArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: "permittertPermiteringsvarselDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Permitteringsvarsel",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato,
    type: "envalg",
    label: "Er du midlertidig ansatt, og har kontrakt med sluttdato?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
      {
        value: "vetIkke",
        label: "Jeg vet ikke",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin,
    type: "dato",
    label: "Oppgi sluttdatoen i kontrakten din",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato] === "ja",
  },
  {
    id: permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien,
    type: "envalg",
    label: "Er du permittert fra fiskeforedlings- eller fiskeoljeindustrien?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertHvorMangeProsentErDuPermittert,
    type: "tall",
    label: "Hvor mange prosent er du permittert?",
    maksVerdi: 100,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr,
    type: "envalg",
    label: "Vet du når lønnspliktperioden til arbeidsgiveren din er?",
    description:
      "Du finner informasjon om arbeidsgivers lønnspliktperiode i permitteringsvarselet. Fra-datoen er den første dagen du ikke arbeider som normalt fordi du er permittert.",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertLønnsperiodeFraOgMedDato,
    type: "periodeFra",
    periodeLabel: "Fyll inn lønnspliktperioden",
    label: "Fra og med dato",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr] === "ja",
  },
  {
    id: permittertLønnsperiodeTilOgMedDato,
    type: "periodeTil",
    label: "Til og med dato",
    optional: true,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr] === "ja",
  },
];
