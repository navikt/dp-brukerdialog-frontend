import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegErPermitert,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato =
  "permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato";
export const permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet =
  "permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet";
export const permittertNårStartetDuIDenneJobben = "permittertNårStartetDuIDenneJobben";
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
    id: "permittertVarselMelding",
    type: "varselmelding",
    variant: "info",
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
    label: "Er dette et midlertidig arbeidsforhold med en kontraktfestet sluttdato?",
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
    id: permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
    type: "dato",
    label: "Oppgi den kontraktsfestede sluttdatoen på dette arbeidsforholdet",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato] === "ja",
  },
  {
    id: permittertNårStartetDuIDenneJobben,
    type: "dato",
    label: "Når startet du i denne jobben?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato] === "ja" ||
      svar[permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato] === "nei",
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
    id: permittertNårErDuPermittertFraOgMedDato,
    type: "periodeFra",
    label: "Fra og med dato",
    periodeLabel: "Når du er permittert?",
    description:
      "Hvis du har hatt flere permitteringsperioder skal du oppgi dato for den siste permitteringen.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertNårErDuPermittertTilOgMedDato,
    type: "periodeTil",
    label: "Til og med dato",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertHvorMangeProsentErDuPermittert,
    type: "tall",
    label: "Hvor mange prosent er du permittert?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr,
    type: "envalg",
    label: "Vet du når lønnspliktperioden til arbeidsgiveren din er?",
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
    periodeLabel: "Fyll inn lønnsperioden",
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
