import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  arbeidsgiverErKonkurs,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter";
import { addYears, endOfDay, startOfDay, subMonths, subYears } from "date-fns";

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

export function lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter(
  t: TFunction
): KomponentType[] {
  return [
    {
      id: konkursVarighetPåArbeidsforholdetFraDato,
      type: "periodeFra",
      periodeLabel: t("felles.varighetPåArbeidsforholdet"),
      label: t("felles.fraDato"),
      referanseId: konkursVarighetPåArbeidsforholdetTilDato,
      fraOgMed: startOfDay(subYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: konkursVarighetPåArbeidsforholdetTilDato,
      type: "periodeTil",
      label: t("felles.tilDato"),
      referanseId: konkursVarighetPåArbeidsforholdetFraDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: "konkursArbeidsavtaleDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.arbeidsavtale"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: "konkursOppsigelseDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("konkurs.oppsigelseDokumentasjonskravindikator"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
      type: "envalg",
      label: t("konkurs.erDetteEtMidlertidigArbeidsforhold.label"),
      description: t("konkurs.erDetteEtMidlertidigArbeidsforhold.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
        { value: "vetIkke", label: t("envalg.svar.vetIkke") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
      type: "dato",
      label: t("konkurs.oppgiSluttdato.label"),
      fraOgMed: startOfDay(subMonths(new Date(), 9)),
      tilOgMed: endOfDay(addYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato] === "ja",
    },
    {
      id: konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
      type: "envalg",
      label: t("konkurs.ønskerDuÅSøkeOmForskudd.label"),
      description: t("konkurs.ønskerDuÅSøkeOmForskudd.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidlerLesMer",
      type: "lesMer",
      label: t("konkurs.ønskerDuÅSøkeOmForskuddLesMer.label"),
      description: t("konkurs.ønskerDuÅSøkeOmForskuddLesMer.description"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidlerVarselemdling",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("felles.informasjon"),
      description: t("konkurs.ønskerDuÅSøkeOmForskuddVarselmelding.description"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
    },
    {
      id: konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
      type: "envalg",
      label: t("konkurs.ønskerDuÅSøkeOmDagpengerITillegg.label"),
      description: t("konkurs.ønskerDuÅSøkeOmDagpengerITillegg.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
    },
    {
      id: konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet,
      type: "envalg",
      label: t("konkurs.godtarDuTrekkFraKonkursboet.label"),
      description: t("konkurs.godtarDuTrekkFraKonkursboet.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: "konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboetLesMer",
      type: "lesMer",
      label: t("konkurs.godtarDuTrekkFraKonkursboetLesMer.label"),
      description: t("konkurs.godtarDuTrekkFraKonkursboetLesMer.description"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
    },
    {
      id: "godtarDuAtNavTrekkerPengerDirekteFraKonkursboetInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("konkurs.godtarDuTrekkFraKonkursboetInformasjonskort.label"),
      description: t("konkurs.godtarDuTrekkFraKonkursboetInformasjonskort.description"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet] === "nei",
    },
    {
      id: konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
      type: "envalg",
      label: t("konkurs.godtarDuTrekkFraLønnsgarantiordningen.label"),
      description: t("konkurs.godtarDuTrekkFraLønnsgarantiordningen.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
    },
    {
      id: "konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningenInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("konkurs.godtarDuTrekkFraLønnsgarantiordningenInformasjonskort.label"),
      description: t("konkurs.godtarDuTrekkFraLønnsgarantiordningenInformasjonskort.description"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[
          konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen
        ] === "nei",
    },
    {
      id: konkursHarDuSøktOmLønnsgarantimidler,
      type: "envalg",
      label: t("konkurs.harDuSøktOmLønnsgarantimidler.label"),
      description: t("konkurs.harDuSøktOmLønnsgarantimidler.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        {
          value: "neiMenSkalSøke",
          label: t("konkurs.harDuSøktOmLønnsgarantimidler.svar.neiMenSkalSøke"),
        },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
    },
    {
      id: "konkursHarDuSøktOmLønnsgarantimidlerInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("konkurs.harDuSøktOmLønnsgarantimidlerInformasjonskort.label"),
      description: t("konkurs.harDuSøktOmLønnsgarantimidlerInformasjonskort.description"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursHarDuSøktOmLønnsgarantimidler] === "nei",
    },
    {
      id: konkursDekkerLønnsgarantiordningenKravetDitt,
      type: "envalg",
      label: t("konkurs.dekkerLønnsgarantiordningenKravet.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
        { value: "vetIkke", label: t("envalg.svar.vetIkke") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
    },
    {
      id: konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet,
      type: "envalg",
      label: t("konkurs.harDuFåttUtbetaltLønn.label"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
    },
    {
      id: konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn,
      type: "dato",
      label: t("konkurs.sisteDagMedLønn.label"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[
          konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet
        ] === "ja",
    },
  ];
}
