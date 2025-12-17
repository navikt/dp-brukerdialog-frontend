import { z } from "zod";
import {
  arbeidsforholdModalArbeidstidenErRedusertKomponenter,
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  arbeidstidenErRedusertHvaErÅrsaken,
  arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import {
  arbeidsforholdModalJegHarFåttAvskjedKomponenter,
  jegHarFåttAvskjedHvaVarÅrsaken,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import {
  arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter,
  ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import {
  arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter,
  jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  jegErOppsagtHvaHarDuSvartPåTilbudet,
  jegErOppsagtHvaVarÅrsaken,
  jegErOppsagtVarighetPåArbeidsforholdetFraOgMedDato,
  jegErOppsagtVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import {
  arbeidsforholdModalJegHarSagtOppSelvKomponenter,
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  arbeidsforholdModalArbeidsgiverErKonkursKomponenter,
  konkursDekkerLønnsgarantiordningenKravetDitt,
  konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
  konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
  konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn,
  konkursHarDuSøktOmLønnsgarantimidler,
  konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
  konkursVarighetPåArbeidsforholdetFraOgMedDato,
  konkursVarighetPåArbeidsforholdetTilOgMedDato,
  konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
  konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import {
  arbeidsforholdModalKontraktenErUtgåttKomponenter,
  kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
import {
  arbeidsforholdModalJegErPermittertKomponenter,
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
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { valider } from "~/utils/validering.utils";
import {
  annenRotasjonBeskrivelse,
  arbeidsforholdKomponenter,
  arbeidsforholdModalKomponenter,
  arbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  ArbeidsforholdModalSvar,
  ArbeidsforholdSvar,
  fastArbeidstidI6MånederEllerMer,
  fastArbeidstidIMindreEnn6Måneder,
  handling,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harDuJobbetSkiftTurnusEllerRotasjon,
  harIkkeJobbetDeSiste36Månedene,
  hvilkenTypeRotasjonsordningJobbetDu,
  hvilketLandJobbetDuI,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  hvordanHarDuJobbet,
  jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  navnetPåBedriften,
  oppgiPersonnummeretPinDuHaddeIDetteLandet,
  oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed,
  oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed,
  pdfGrunnlag,
  seksjonsvar,
  varierendeArbeidstidDeSiste12Månedene,
} from "./arbeidsforhold.komponenter";

export const arbeidsforholdSchema = z
  .object({
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [handling]: z.string().optional(),
    [hvordanHarDuJobbet]: z
      .enum([
        fastArbeidstidIMindreEnn6Måneder,
        fastArbeidstidI6MånederEllerMer,
        varierendeArbeidstidDeSiste12Månedene,
        jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
        harIkkeJobbetDeSiste36Månedene,
      ])
      .optional(),
    [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]: z
      .enum(["ja", "nei"])
      .optional(),
    dokumentasjonskrav: z.string().optional(),
    versjon: z.number().optional(),
  })
  .superRefine((data, context) => {
    if (data.handling === "tilbakenavigering" || data.handling === "fortsettSenere") {
      return;
    }
    arbeidsforholdKomponenter.forEach((komponent) => {
      const synlig = !komponent.visHvis || komponent.visHvis(data);
      const svar = data[komponent.id as keyof ArbeidsforholdSvar];
      valider(komponent, svar, synlig, context);
    });
  });

export const arbeidsforholdModalSchema = z
  .object({
    [navnetPåBedriften]: z.string().optional(),
    [hvilketLandJobbetDuI]: z.string().optional(),
    [oppgiPersonnummeretPinDuHaddeIDetteLandet]: z.string().optional(),
    [hvordanHarDetteArbeidsforholdetEndretSeg]: z.string().optional(),
    [jegErOppsagtVarighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [jegErOppsagtVarighetPåArbeidsforholdetTilOgMedDato]: z.string().optional(),
    [jegErOppsagtHvaVarÅrsaken]: z.string().optional(),
    [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [jegErOppsagtHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato]: z.string().optional(),
    [jegHarSagtOppHvaVarÅrsaken]: z.string().optional(),
    [jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato]: z.string().optional(),
    [jegHarFåttAvskjedHvaVarÅrsaken]: z.string().optional(),
    [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]: z.string().optional(),
    [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]: z.string().optional(),
    [arbeidstidenErRedusertHvaErÅrsaken]: z.string().optional(),
    [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato]: z.string().optional(),
    [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
      z.string().optional(),
    [kontraktenErUtgåttHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [konkursVarighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [konkursVarighetPåArbeidsforholdetTilOgMedDato]: z.string().optional(),
    [konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato]: z.string().optional(),
    [konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]: z.string().optional(),
    [konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler]: z.string().optional(),
    [konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler]: z.string().optional(),
    [konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet]: z.string().optional(),
    [konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen]: z
      .string()
      .optional(),
    [konkursHarDuSøktOmLønnsgarantimidler]: z.string().optional(),
    [konkursDekkerLønnsgarantiordningenKravetDitt]: z.string().optional(),
    [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet]:
      z.string().optional(),
    [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn]:
      z.string().optional(),
    [permittertVarighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [permittertNårErDuPermittertFraOgMedDato]: z.string().optional(),
    [permittertNårErDuPermittertTilOgMedDato]: z.string().optional(),
    [permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato]: z
      .string()
      .optional(),
    [permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin]: z.string().optional(),
    [permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien]: z.string().optional(),
    [permittertHvorMangeProsentErDuPermittert]: z.string().optional(),
    [permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr]: z.string().optional(),
    [permittertLønnsperiodeFraOgMedDato]: z.string().optional(),
    [permittertLønnsperiodeTilOgMedDato]: z.string().optional(),
    [ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet]: z.string().optional(),
    [ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet]: z.string().optional(),
    [harDuJobbetSkiftTurnusEllerRotasjon]: z.string().optional(),
    [hvilkenTypeRotasjonsordningJobbetDu]: z.string().optional(),
    [annenRotasjonBeskrivelse]: z.string().optional(),
    [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed]: z.string().optional(),
    [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed]: z.string().optional(),
  })
  .superRefine((data, context) => {
    arbeidsforholdModalKomponenter
      .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter)
      .concat(arbeidsforholdModalJegHarSagtOppSelvKomponenter)
      .concat(arbeidsforholdModalJegHarFåttAvskjedKomponenter)
      .concat(arbeidsforholdModalKontraktenErUtgåttKomponenter)
      .concat(arbeidsforholdModalArbeidstidenErRedusertKomponenter)
      .concat(arbeidsforholdModalArbeidsgiverErKonkursKomponenter)
      .concat(arbeidsforholdModalJegErPermittertKomponenter)
      .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter)
      .concat(arbeidsforholdModalSkiftTurnusRotasjonKomponenter)
      .forEach((komponent) => {
        const synlig = !komponent.visHvis || komponent.visHvis(data);
        const svar = data[komponent.id as keyof ArbeidsforholdModalSvar];
        valider(komponent, svar, synlig, context);
      });
  });
