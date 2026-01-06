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
  jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
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
  jegErOppsagtVarighetPåArbeidsforholdetFraDato,
  jegErOppsagtVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import {
  arbeidsforholdModalJegHarSagtOppSelvKomponenter,
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
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
  konkursVarighetPåArbeidsforholdetFraDato,
  konkursVarighetPåArbeidsforholdetTilDato,
  konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
  konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import {
  arbeidsforholdModalKontraktenErUtgåttKomponenter,
  kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
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
  oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto,
  oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato,
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
    [jegErOppsagtVarighetPåArbeidsforholdetFraDato]: z.string().optional(),
    [jegErOppsagtVarighetPåArbeidsforholdetTilDato]: z.string().optional(),
    [jegErOppsagtHvaVarÅrsaken]: z.string().optional(),
    [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [jegErOppsagtHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato]: z.string().optional(),
    [jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato]: z.string().optional(),
    [jegHarSagtOppHvaVarÅrsaken]: z.string().optional(),
    [jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato]: z.string().optional(),
    [jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato]: z.string().optional(),
    [jegHarFåttAvskjedHvaVarÅrsaken]: z.string().optional(),
    [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]: z.string().optional(),
    [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]: z.string().optional(),
    [arbeidstidenErRedusertHvaErÅrsaken]: z.string().optional(),
    [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato]: z.string().optional(),
    [kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato]: z.string().optional(),
    [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
      z.string().optional(),
    [kontraktenErUtgåttHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [konkursVarighetPåArbeidsforholdetFraDato]: z.string().optional(),
    [konkursVarighetPåArbeidsforholdetTilDato]: z.string().optional(),
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
    [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto]: z.string().optional(),
    [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato]: z.string().optional(),
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
