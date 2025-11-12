import { z } from "zod";
import {
  annenRotasjonBeskrivelse,
  arbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  arbeidsforholdModalKomponenter,
  ArbeidsforholdModalSvar,
  arbeidsforholdKomponenter,
  ArbeidsforholdSvar,
  erTilbakenavigering,
  fastArbeidstidI6MånederEllerMer,
  fastArbeidstidIMindreEnn6Måneder,
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
  seksjonsvar,
  pdfGrunnlag,
  varierendeArbeidstidDeSiste12Månedene,
  varighetPåArbeidsforholdetFraOgMedDato,
  varighetPåArbeidsforholdetTilOgMedDato,
} from "./arbeidsforhold.komponenter";
import {
  arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter,
  jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  jegErOppsagtHvaHarDuSvartPåTilbudet,
  jegErOppsagtHvaVarÅrsaken,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import {
  arbeidsforholdModalJegHarSagtOppSelvKomponenter,
  jegHarSagtOppHvaVarÅrsaken,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  arbeidsforholdModalJegHarFåttAvskjedKomponenter,
  avskjedigetHvaVarÅrsaken,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import {
  arbeidsforholdModalKontraktenErUgåttKomponenter,
  kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUgått";
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
  arbeidsforholdModalArbeidsgiverErKonkursKomponenter,
  konkursDekkerLønnsgarantiordningenKravetDitt,
  konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
  konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
  konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn,
  konkursHarDuSøktOmLønnsgarantimidler,
  konkursNårStartetDuIDenneJobben,
  konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
  konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
  konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import {
  arbeidsforholdModalJegErPermittertKomponenter,
  permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato,
  permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien,
  permittertHvorMangeProsentErDuPermittert,
  permittertLønnsperiodeFraOgMedDato,
  permittertLønnsperiodeTilOgMedDato,
  permittertNårErDuPermittertFraOgMedDato,
  permittertNårErDuPermittertTilOgMedDato,
  permittertNårStartetDuIDenneJobben,
  permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
  permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import {
  arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter,
  ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import { valider } from "~/utils/validering.utils";

export const arbeidsforholdSchema = z
  .object({
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
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
    versjon: z.number().optional(),
  })
  .superRefine((data, context) => {
    if (data[erTilbakenavigering]) {
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
    [varighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [varighetPåArbeidsforholdetTilOgMedDato]: z.string().optional(),
    [hvordanHarDetteArbeidsforholdetEndretSeg]: z.string().optional(),
    [jegErOppsagtHvaVarÅrsaken]: z.string().optional(),
    [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [jegErOppsagtHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [jegHarSagtOppHvaVarÅrsaken]: z.string().optional(),
    [avskjedigetHvaVarÅrsaken]: z.string().optional(),
    [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
      z.string().optional(),
    [kontraktenErUgåttHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [arbeidstidenErRedusertHvaErÅrsaken]: z.string().optional(),
    [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]: z.string().optional(),
    [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]: z.string().optional(),
    [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato]: z.string().optional(),
    [konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]: z.string().optional(),
    [konkursNårStartetDuIDenneJobben]: z.string().optional(),
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
    [permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato]: z
      .string()
      .optional(),
    [permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]: z.string().optional(),
    [permittertNårStartetDuIDenneJobben]: z.string().optional(),
    [permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien]: z.string().optional(),
    [permittertNårErDuPermittertFraOgMedDato]: z.string().optional(),
    [permittertNårErDuPermittertTilOgMedDato]: z.string().optional(),
    [permittertHvorMangeProsentErDuPermittert]: z.string().optional(),
    [permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr]: z.string().optional(),
    [permittertLønnsperiodeFraOgMedDato]: z.string().optional(),
    [permittertLønnsperiodeTilOgMedDato]: z.string().optional(),
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
      .concat(arbeidsforholdModalKontraktenErUgåttKomponenter)
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
