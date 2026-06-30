import type { TFunction } from "i18next";
import { addYears, endOfDay, startOfDay, subMonths, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import {
  arbeidsgiverErKonkurs,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import type { ArbeidsforholdModalSvar } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const konkursVarighetPåArbeidsforholdetFraDato = "konkursVarighetPåArbeidsforholdetFraDato";
export const konkursVarighetPåArbeidsforholdetTilDato = "konkursVarighetPåArbeidsforholdetTilDato";
export const konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato =
  "konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato";
export const konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet =
  "konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet";
export const konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler =
  "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler";
export const konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet =
  "konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet";
export const konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler =
  "konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler";
export const konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen =
  "konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen";
export const konkursHarDuSøktOmLønnsgarantimidler = "konkursHarDuSøktOmLønnsgarantimidler";
export const konkursDekkerLønnsgarantiordningenKravetDitt =
  "konkursDekkerLønnsgarantiordningenKravetDitt";
export const konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet =
  "konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet";
export const konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn =
  "konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn";

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

export const lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: konkursVarighetPåArbeidsforholdetFraDato,
    type: "periodeFra",
    periodeLabel: t("modal.konkurs.varighetPaArbeidsforholdet.label"),
    label: t("felles.dato.fraDato"),
    referanseId: konkursVarighetPåArbeidsforholdetTilDato,
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: konkursVarighetPåArbeidsforholdetTilDato,
    type: "periodeTil",
    label: t("felles.dato.tilDato"),
    referanseId: konkursVarighetPåArbeidsforholdetFraDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.konkurs.dokumentasjonskrav.arbeidsavtale"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursOppsigelseDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.konkurs.dokumentasjonskrav.oppsigelse"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
    type: "envalg",
    label: t("modal.konkurs.midlertidigArbeidsforhold.label"),
    description: t("modal.konkurs.midlertidigArbeidsforhold.description"),
    options: jaNeiVetIkkeOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
    type: "dato",
    label: t("modal.konkurs.kontraktsfestetSluttdato.label"),
    fraOgMed: startOfDay(subMonths(new Date(), 9)),
    tilOgMed: endOfDay(addYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato] === "ja",
  },
  {
    id: konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
    type: "envalg",
    label: t("modal.konkurs.forskuddPaLonnsgarantimidler.label"),
    description: t("modal.konkurs.forskuddPaLonnsgarantimidler.description"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidlerLesMer",
    type: "lesMer",
    label: t("modal.konkurs.forskuddPaLonnsgarantimidlerLesMer.label"),
    description: t("modal.konkurs.forskuddPaLonnsgarantimidlerLesMer.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidlerVarselemdling",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("modal.konkurs.forskuddPaLonnsgarantimidlerVarselmelding.label"),
    description: t("modal.konkurs.forskuddPaLonnsgarantimidlerVarselmelding.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
    type: "envalg",
    label: t("modal.konkurs.dagpengerITilleggForskudd.label"),
    description: t("modal.konkurs.dagpengerITilleggForskudd.description"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: "konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidlerLesMer",
    type: "lesMer",
    label: t("modal.konkurs.dagpengerITilleggForskuddLesMer.label"),
    description: t("modal.konkurs.dagpengerITilleggForskuddLesMer.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet,
    type: "envalg",
    label: t("modal.konkurs.trekkePengerFraKonkursboet.label"),
    description: t("modal.konkurs.trekkePengerFraKonkursboet.description"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboetLesMer",
    type: "lesMer",
    label: t("modal.konkurs.trekkePengerFraKonkursboetLesMer.label"),
    description: t("modal.konkurs.trekkePengerFraKonkursboetLesMer.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "godtarDuAtNavTrekkerPengerDirekteFraKonkursboetInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("modal.konkurs.tilbakebetalingInformasjonskort.label"),
    description: t("modal.konkurs.tilbakebetalingInformasjonskort.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet] === "nei",
  },
  {
    id: konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
    type: "envalg",
    label: t("modal.konkurs.trekkeForskuddFraLonnsgarantiordningen.label"),
    description: t("modal.konkurs.trekkeForskuddFraLonnsgarantiordningen.description"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: "konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningenInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("modal.konkurs.avslagForskuddInformasjonskort.label"),
    description: t("modal.konkurs.avslagForskuddInformasjonskort.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen
      ] === "nei",
  },
  {
    id: konkursHarDuSøktOmLønnsgarantimidler,
    type: "envalg",
    label: t("modal.konkurs.harSoktOmLonnsgarantimidler.label"),
    description: t("modal.konkurs.harSoktOmLonnsgarantimidler.description"),
    options: [
      { value: "ja", label: t("felles.svar.ja") },
      {
        value: "neiMenSkalSøke",
        label: t("modal.konkurs.harSoktOmLonnsgarantimidler.options.neiMenSkalSoke"),
      },
      { value: "nei", label: t("felles.svar.nei") },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: "konkursHarDuSøktOmLønnsgarantimidlerInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("modal.konkurs.harSoktOmLonnsgarantimidlerInformasjonskort.label"),
    description: t("modal.konkurs.harSoktOmLonnsgarantimidlerInformasjonskort.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursHarDuSøktOmLønnsgarantimidler] === "nei",
  },
  {
    id: konkursDekkerLønnsgarantiordningenKravetDitt,
    type: "envalg",
    label: t("modal.konkurs.dekkerLonnsgarantiordningen.label"),
    options: jaNeiVetIkkeOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet,
    type: "envalg",
    label: t("modal.konkurs.utbetaltLonnEtterKonkurs.label"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn,
    type: "dato",
    label: t("modal.konkurs.sisteDagUtbetaltLonn.label"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet
      ] === "ja",
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdModalArbeidsgiverErKonkursKomponenter =
  lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter(fallbackT);
