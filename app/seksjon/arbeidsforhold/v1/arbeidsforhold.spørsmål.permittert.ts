import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegErPermitert,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";

export const permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato =
  "permittert-er-dette-et-midlertidig-arbeidsforhold-med-en-kontraktfestet-sluttdato";
export const permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet =
  "permittert-oppgi-den-kontraktsfestede-sluttdatoen-på-dette-arbeidsforholdet";
export const permittertNårStartetDuIDenneJobben = "permittert-når-startet-du-idenne-jobben";
export const permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien =
  "permittert-er-du-permittert-fra-fiskeforedlings-eller-fiskeoljeindustrien";
export const permittertVetDuHvorMangeTimerDuJobbetIUka =
  "permittert-vet-du-hvor-mange-timer-du-jobbet-iuka";
export const permittertHvorMangeTimerHarDuJobbetIUka =
  "permittert-hvor-mange-timer-har-du-jobbet-iuka";
export const permittertNårErDuPermittertFraOgMedDato =
  "permittert-når-er-du-permittert-fra-og-med-dato";
export const permittertNårErDuPermittertTilOgMedDato =
  "permittert-når-er-du-permittert-til-og-med-dato";
export const permittertHvorMangeProsentErDuPermittert =
  "permittert-hvor-mange-prosent-er-du-permittert";
export const permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr =
  "permittert-vet-du-når-lønnspliktperioden-til-arbeidsgiveren-din-er";
export const permittertLønnsperiodeFraOgMedDato = "permittert-lønnsperiode-fra-og-med-dato";
export const permittertLønnsperiodeTilOgMedDato = "permittert-lønnsperiode-til-og-med-dato";

export const arbeidsforholdModalJegErPermittertSpørsmål: KomponentType[] = [
  {
    id: "permittertVarselMelding",
    type: "varselmelding",
    variant: "info",
    label: "",
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
    id: permittertVetDuHvorMangeTimerDuJobbetIUka,
    type: "envalg",
    label: "Vet du hvor mange timer du har jobbet i uka før du ble permittert?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label:
          "Nei, jeg er usikker, bruk opplysninger fra skatteetaten.no/mine inntekter for å beregne min vanlige arbeidstid.",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegErPermitert,
  },
  {
    id: permittertHvorMangeTimerHarDuJobbetIUka,
    type: "tall",
    label: "Skriv inn hvor mange timer du har jobbet per uke før du ble permittert?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: "permittertHvorMangeTimerHarDuJobbetIUkaLesMer",
    type: "lesMer",
    label: "Dette skal du oppgi som arbeidstid",
    description:
      "Har du jobbet like mye hver uke, oppgir du denne arbeidstiden. Hvis du ikke har jobbet like mye hver uke, oppgir du det antall timer du har jobbet i snitt de seks siste månedene.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[permittertVetDuHvorMangeTimerDuJobbetIUka] === "ja",
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
