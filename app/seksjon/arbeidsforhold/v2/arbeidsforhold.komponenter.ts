import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  jegErOppsagtHvaHarDuSvartPåTilbudet,
  jegErOppsagtHvaVarÅrsaken,
  jegErOppsagtVarighetPåArbeidsforholdetFraDato,
  jegErOppsagtVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.jegErOppsagt";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  jegHarFåttAvskjedHvaVarÅrsaken,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.avskjediget";
import {
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.kontraktenErUtgått";
import {
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  arbeidstidenErRedusertHvaErÅrsaken,
  arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import {
  konkursDekkerLønnsgarantiordningenKravetDitt,
  konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
  konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
  konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn,
  konkursHarDuSøktOmLønnsgarantimidler,
  konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
  konkursVarighetPåArbeidsforholdetFraDato,
  konkursVarighetPåArbeidsforholdetTilDato,
  konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
  konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.konkurs";
import {
  permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato,
  permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien,
  permittertHvorMangeProsentErDuPermittert,
  permittertLønnsperiodeFraOgMedDato,
  permittertLønnsperiodeTilOgMedDato,
  permittertNårErDuPermittertFraOgMedDato,
  permittertNårErDuPermittertTilOgMedDato,
  permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin,
  permittertVarighetPåArbeidsforholdetFraOgMedDato,
  permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.permittert";
import {
  ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.ikkeEndret";
import { startOfDay, subYears } from "date-fns";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const handling = "handling";
export const hvordanHarDuJobbet = "hvordanHarDuJobbet";
export const fastArbeidstidIMindreEnn6Måneder = "fastArbeidstidIMindreEnn6Måneder";
export const fastArbeidstidI6MånederEllerMer = "fastArbeidstidI6MånederEllerMer";
export const varierendeArbeidstidDeSiste12Månedene = "varierendeArbeidstidDeSiste12Månedene";
export const jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene =
  "jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene";
export const harIkkeJobbetDeSiste36Månedene = "harIkkeJobbetDeSiste36Månedene";
export const harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene =
  "harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene";
export const navnetPåBedriften = "navnetPåBedriften";
export const hvilketLandJobbetDuI = "hvilketLandJobbetDuI";
export const oppgiPersonnummeretPinDuHaddeIDetteLandet =
  "oppgiPersonnummeretPinDuHaddeIDetteLandet";
export const hvordanHarDetteArbeidsforholdetEndretSeg = "hvordanHarDetteArbeidsforholdetEndretSeg";
export const arbeidsgiverenMinHarSagtMegOpp = "arbeidsgiverenMinHarSagtMegOpp";
export const jegHarSagtOppSelv = "jegHarSagtOppSelv";
export const jegHarFåttAvskjed = "jegHarFåttAvskjed";
export const kontraktenErUtgått = "kontraktenErUtgått";
export const arbeidstidenErRedusert = "arbeidstidenErRedusert";
export const arbeidsgiverErKonkurs = "arbeidsgiverErKonkurs";
export const jegErPermittert = "jegErPermittert";
export const arbeidsforholdetErIkkeEndret = "arbeidsforholdetErIkkeEndret";
export const harDuJobbetSkiftTurnusEllerRotasjon = "harDuJobbetSkiftTurnusEllerRotasjon";
export const skiftEllerTurns = "skiftEllerTurns";
export const rotasjon = "rotasjon";
export const hverkenSkiftTurnusEllerRotasjon = "hverkenSkiftTurnusEllerRotasjon";
export const annenRotasjon = "annenRotasjon";
export const hvilkenTypeRotasjonsordningJobbetDu = "hvilkenTypeRotasjonsordningJobbetDu";
export const annenRotasjonBeskrivelse = "annenRotasjonBeskrivelse";
export const oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto =
  "oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDato";
export const oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato =
  "oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato";

export type Arbeidsforhold = ArbeidsforholdModalSvar & {
  id: string;
  dokumentasjonskrav?: string[];
};

export type ArbeidsforholdModalSvar = {
  [navnetPåBedriften]?: string;
  [hvilketLandJobbetDuI]?: string;
  [oppgiPersonnummeretPinDuHaddeIDetteLandet]?: string;
  [hvordanHarDetteArbeidsforholdetEndretSeg]?: string;
  [jegErOppsagtVarighetPåArbeidsforholdetFraDato]?: string;
  [jegErOppsagtVarighetPåArbeidsforholdetTilDato]?: string;
  [jegErOppsagtHvaVarÅrsaken]?: string;
  [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [jegErOppsagtHvaHarDuSvartPåTilbudet]?: string;
  [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato]?: string;
  [jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato]?: string;
  [jegHarSagtOppHvaVarÅrsaken]?: string;
  [jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato]?: string;
  [jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato]?: string;
  [jegHarFåttAvskjedHvaVarÅrsaken]?: string;
  [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]?: string;
  [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]?: string;
  [arbeidstidenErRedusertHvaErÅrsaken]?: string;
  [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]?: string;
  [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato]?: string;
  [kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato]?: string;
  [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]?: string;
  [kontraktenErUtgåttHvaHarDuSvartPåTilbudet]?: string;
  [kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [konkursVarighetPåArbeidsforholdetFraDato]?: string;
  [konkursVarighetPåArbeidsforholdetTilDato]?: string;
  [konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato]?: string;
  [konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]?: string;
  [konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler]?: string;
  [konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler]?: string;
  [konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet]?: string;
  [konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen]?: string;
  [konkursHarDuSøktOmLønnsgarantimidler]?: string;
  [konkursDekkerLønnsgarantiordningenKravetDitt]?: string;
  [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet]?: string;
  [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn]?: string;
  [permittertVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [permittertNårErDuPermittertFraOgMedDato]?: string;
  [permittertNårErDuPermittertTilOgMedDato]?: string;
  [permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato]?: string;
  [permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin]?: string;
  [permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien]?: string;
  [permittertHvorMangeProsentErDuPermittert]?: string;
  [permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr]?: string;
  [permittertLønnsperiodeFraOgMedDato]?: string;
  [permittertLønnsperiodeTilOgMedDato]?: string;
  [ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet]?: string;
  [ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet]?: string;
  [harDuJobbetSkiftTurnusEllerRotasjon]?: string;
  [hvilkenTypeRotasjonsordningJobbetDu]?: string;
  [annenRotasjonBeskrivelse]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato]?: string;
};

export type ArbeidsforholdSvar = {
  [hvordanHarDuJobbet]?:
    | typeof fastArbeidstidIMindreEnn6Måneder
    | typeof fastArbeidstidI6MånederEllerMer
    | typeof varierendeArbeidstidDeSiste12Månedene
    | typeof jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene
    | typeof harIkkeJobbetDeSiste36Månedene;
  [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]?: "ja" | "nei";
};

export type ArbeidsforholdResponse = ArbeidsforholdSvar & {
  registrerteArbeidsforhold?: ArbeidsforholdModalSvar[];
};

export function lagArbeidsforholdKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: hvordanHarDuJobbet,
      type: "envalg",
      label: t("hvordanHarDuJobbet.label"),
      options: [
        {
          value: fastArbeidstidIMindreEnn6Måneder,
          label: t("hvordanHarDuJobbet.svar.fastArbeidstidIMindreEnn6Måneder"),
        },
        {
          value: fastArbeidstidI6MånederEllerMer,
          label: t("hvordanHarDuJobbet.svar.fastArbeidstidI6MånederEllerMer"),
        },
        {
          value: varierendeArbeidstidDeSiste12Månedene,
          label: t("hvordanHarDuJobbet.svar.varierendeArbeidstidDeSiste12Månedene"),
        },
        {
          value: jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
          label: t(
            "hvordanHarDuJobbet.svar.jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene"
          ),
        },
        {
          value: harIkkeJobbetDeSiste36Månedene,
          label: t("hvordanHarDuJobbet.svar.harIkkeJobbetDeSiste36Månedene"),
        },
      ],
    },
    {
      id: "lesMerOmArbeidstidLesMer",
      type: "lesMer",
      label: t("lesMerOmArbeidstidLesMer.label"),
      description: t("lesMerOmArbeidstidLesMer.description"),
    },
    {
      id: harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
      type: "envalg",
      label: t("harDuJobbetIEøs.label"),
      description: t("harDuJobbetIEøs.description"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdSvar) =>
        (svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene) ||
        false,
    },
    {
      id: "harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneLesMer",
      type: "lesMer",
      label: t("harDuJobbetIEøsLesMer.label"),
      description: t("harDuJobbetIEøsLesMer.description"),
      visHvis: (svar: ArbeidsforholdSvar) =>
        (svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene) ||
        false,
    },
    {
      id: "harIkkeJobbetDeSiste36MånedeneInformasjonskort",
      type: "informasjonskort",
      variant: "advarsel",
      label: t("harIkkeJobbetDeSiste36MånedeneInformasjonskort.label"),
      description: t("harIkkeJobbetDeSiste36MånedeneInformasjonskort.description"),
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[hvordanHarDuJobbet] === harIkkeJobbetDeSiste36Månedene,
    },
  ];
}

export function lagArbeidsforholdForklarendeTekstKomponenter(t: TFunction): KomponentType[] {
  const overskrift = t("dineArbeidsforhold.overskrift");
  const ingenDokumentasjon = t("dineArbeidsforhold.ingenDokumentasjon");

  return [
    {
      id: "harJobbetIEøsOgFastArbeidstidIMindreEnn6MånederForklarendeTekst",
      type: "forklarendeTekst",
      description: overskrift + t("dineArbeidsforhold.eøs12Måneder") + ingenDokumentasjon,
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ===
          "ja" && svar[hvordanHarDuJobbet] === fastArbeidstidIMindreEnn6Måneder,
    },
    {
      id: "harJobbetIEøsOgFastArbeidstidI6MånederEllerMerForklarendeTekst",
      type: "forklarendeTekst",
      description: overskrift + t("dineArbeidsforhold.eøs6Måneder") + ingenDokumentasjon,
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ===
          "ja" && svar[hvordanHarDuJobbet] === fastArbeidstidI6MånederEllerMer,
    },
    {
      id: "harJobbetIEøsOgVarierendeArbeidstidDeSiste12MånedeneForklarendeTekst",
      type: "forklarendeTekst",
      description: overskrift + t("dineArbeidsforhold.eøs12Måneder") + ingenDokumentasjon,
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ===
          "ja" && svar[hvordanHarDuJobbet] === varierendeArbeidstidDeSiste12Månedene,
    },
    {
      id: "harJobbetIEøsOgJobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12MånedeneForklarendeTekst",
      type: "forklarendeTekst",
      description: overskrift + t("dineArbeidsforhold.eøs36Måneder") + ingenDokumentasjon,
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ===
          "ja" &&
        svar[hvordanHarDuJobbet] === jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
    },
    {
      id: "harIkkeJobbetIEøsOgfastArbeidstidIMindreEnn6MånederForklarendeTekst",
      type: "forklarendeTekst",
      description: overskrift + t("dineArbeidsforhold.norge12Måneder") + ingenDokumentasjon,
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ===
          "nei" && svar[hvordanHarDuJobbet] === fastArbeidstidIMindreEnn6Måneder,
    },
    {
      id: "harIkkeJobbetIEøsOgfastArbeidstidI6MånederEllerMerForklarendeTekst",
      type: "forklarendeTekst",
      description: overskrift + t("dineArbeidsforhold.norge6Måneder") + ingenDokumentasjon,
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ===
          "nei" && svar[hvordanHarDuJobbet] === fastArbeidstidI6MånederEllerMer,
    },
    {
      id: "harIkkeJobbetIEøsOgVarierendeArbeidstidDeSiste12MånedeneForklarendeTekst",
      type: "forklarendeTekst",
      description: overskrift + t("dineArbeidsforhold.norge12Måneder") + ingenDokumentasjon,
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ===
          "nei" && svar[hvordanHarDuJobbet] === varierendeArbeidstidDeSiste12Månedene,
    },
    {
      id: "harIkkeJobbetIEøsOgJobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12MånedeneForklarendeTekst",
      type: "forklarendeTekst",
      description: overskrift + t("dineArbeidsforhold.norge36Måneder") + ingenDokumentasjon,
      visHvis: (svar: ArbeidsforholdSvar) =>
        svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ===
          "nei" &&
        svar[hvordanHarDuJobbet] === jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
    },
  ];
}

export function lagArbeidsforholdModalKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: navnetPåBedriften,
      type: "kortTekst",
      label: t("navnetPåBedriften.label"),
      maksLengde: 200,
    },
    {
      id: hvilketLandJobbetDuI,
      type: "land",
      label: t("hvilketLandJobbetDuI.label"),
    },
    {
      id: oppgiPersonnummeretPinDuHaddeIDetteLandet,
      type: "kortTekst",
      label: t("oppgiPersonnummeretPinDuHaddeIDetteLandet.label"),
      maksLengde: 30,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        (svar[hvilketLandJobbetDuI] && svar[hvilketLandJobbetDuI] !== "NOR") || false,
    },
    {
      id: hvordanHarDetteArbeidsforholdetEndretSeg,
      type: "envalg",
      label: t("hvordanHarDetteArbeidsforholdetEndretSeg.label"),
      options: [
        {
          value: arbeidsgiverenMinHarSagtMegOpp,
          label: t("hvordanHarDetteArbeidsforholdetEndretSeg.svar.arbeidsgiverenMinHarSagtMegOpp"),
        },
        {
          value: jegHarSagtOppSelv,
          label: t("hvordanHarDetteArbeidsforholdetEndretSeg.svar.jegHarSagtOppSelv"),
        },
        {
          value: jegHarFåttAvskjed,
          label: t("hvordanHarDetteArbeidsforholdetEndretSeg.svar.jegHarFåttAvskjed"),
        },
        {
          value: kontraktenErUtgått,
          label: t("hvordanHarDetteArbeidsforholdetEndretSeg.svar.kontraktenErUtgått"),
        },
        {
          value: arbeidstidenErRedusert,
          label: t("hvordanHarDetteArbeidsforholdetEndretSeg.svar.arbeidstidenErRedusert"),
        },
        {
          value: arbeidsgiverErKonkurs,
          label: t("hvordanHarDetteArbeidsforholdetEndretSeg.svar.arbeidsgiverErKonkurs"),
        },
        {
          value: jegErPermittert,
          label: t("hvordanHarDetteArbeidsforholdetEndretSeg.svar.jegErPermittert"),
        },
        {
          value: arbeidsforholdetErIkkeEndret,
          label: t("hvordanHarDetteArbeidsforholdetEndretSeg.svar.arbeidsforholdetErIkkeEndret"),
        },
      ],
    },
  ];
}

export function lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter(
  t: TFunction
): KomponentType[] {
  return [
    {
      id: harDuJobbetSkiftTurnusEllerRotasjon,
      type: "envalg",
      label: t("harDuJobbetSkiftTurnusEllerRotasjon.label"),
      description: t("harDuJobbetSkiftTurnusEllerRotasjon.description"),
      options: [
        {
          value: skiftEllerTurns,
          label: t("harDuJobbetSkiftTurnusEllerRotasjon.svar.skiftEllerTurnus"),
        },
        { value: rotasjon, label: t("harDuJobbetSkiftTurnusEllerRotasjon.svar.rotasjon") },
        {
          value: hverkenSkiftTurnusEllerRotasjon,
          label: t("harDuJobbetSkiftTurnusEllerRotasjon.svar.hverken"),
        },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] !== undefined,
    },
    {
      id: "harDuJobbetSkiftTurnusEllerRotasjonLesMer",
      type: "lesMer",
      label: t("harDuJobbetSkiftTurnusEllerRotasjonLesMer.label"),
      description: t("harDuJobbetSkiftTurnusEllerRotasjonLesMer.description"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        (svar[hvordanHarDetteArbeidsforholdetEndretSeg] &&
          svar[hvordanHarDetteArbeidsforholdetEndretSeg] !== arbeidsforholdetErIkkeEndret) ||
        false,
    },
    {
      id: "jegHarJobbetRotasjonDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("jegHarJobbetRotasjonDokumentasjonskravindikator.label"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
    },
    {
      id: hvilkenTypeRotasjonsordningJobbetDu,
      type: "envalg",
      label: t("hvilkenTypeRotasjonsordningJobbetDu.label"),
      options: [
        { value: "2-4-rotasjon", label: t("hvilkenTypeRotasjonsordningJobbetDu.svar.toFire") },
        { value: "2-3-rotasjon", label: t("hvilkenTypeRotasjonsordningJobbetDu.svar.toTre") },
        { value: "1-1-rotasjon", label: t("hvilkenTypeRotasjonsordningJobbetDu.svar.enEn") },
        {
          value: annenRotasjon,
          label: t("hvilkenTypeRotasjonsordningJobbetDu.svar.annenRotasjon"),
        },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
    },
    {
      id: annenRotasjonBeskrivelse,
      type: "langTekst",
      maksLengde: 500,
      label: t("annenRotasjonBeskrivelse.label"),
      description: t("annenRotasjonBeskrivelse.description"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvilkenTypeRotasjonsordningJobbetDu] == annenRotasjon,
    },
    {
      id: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto,
      type: "periodeFra",
      periodeLabel: t("oppgiSisteArbeidsperiode.periodeLabel"),
      label: t("oppgiSisteArbeidsperiode.fraLabel"),
      referanseId: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato,
      fraOgMed: startOfDay(subYears(new Date(), 5)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
    },
    {
      id: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato,
      type: "periodeTil",
      label: t("oppgiSisteArbeidsperiode.tilLabel"),
      referanseId: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
    },
  ];
}
