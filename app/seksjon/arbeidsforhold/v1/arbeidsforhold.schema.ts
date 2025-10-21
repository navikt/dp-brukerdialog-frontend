import { z } from "zod";
import {
  annenRotasjonBeskrivelse,
  arbeidsforholdModalSkiftTurnusRotasjonSpørsmål,
  arbeidsforholdModalSpørsmål,
  ArbeidsforholdModalSvar,
  arbeidsforholdSpørsmål,
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
  payload,
  varierendeArbeidstidDeSiste12Månedene,
  varighetPåArbeidsforholdetFraOgMedDato,
  varighetPåArbeidsforholdetTilOgMedDato,
} from "./arbeidsforhold.spørsmål";
import {
  arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål,
  jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  jegErOppsagtHvaHarDuSvartPåTilbudet,
  jegErOppsagtHvaVarÅrsaken,
  jegErOppsagtHvorMangeTimerHarDuJobbetIUka,
  jegErOppsagtVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegErOppsagt";
import {
  arbeidsforholdModalJegHarSagtOppSelvSpørsmål,
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppHvorMangeTimerHarDuJobbetIUka,
  jegHarSagtOppVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegHarSagtOpp";
import {
  arbeidsforholdModalJegHarFåttAvskjedSpørsmål,
  avskjedigetHvaVarÅrsaken,
  avskjedigetHvorMangeTimerHarDuJobbetIUka,
  avskjedigetVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.avskjediget";
import {
  arbeidsforholdModalKontraktenErUgåttSpørsmål,
  kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka,
  kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.kontraktenErUgått";
import {
  arbeidsforholdModalArbeidstidenErRedusertSpørsmål,
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  arbeidstidenErRedusertHvaErÅrsaken,
  arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
  arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka,
  arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.arbeidstidenErRedusert";
import {
  arbeidsforholdModalArbeidsgiverErKonkursSpørsmål,
  konkursDekkerLønnsgarantiordningenKravetDitt,
  konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
  konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
  konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn,
  konkursHarDuSøktOmLønnsgarantimidler,
  konkursHvorMangeTimerHarDuJobbetIUka,
  konkursNårStartetDuIDenneJobben,
  konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
  konkursVetDuHvorMangeTimerDuJobbetIUka,
  konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
  konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.konkurs";
import {
  arbeidsforholdModalJegErPermittertSpørsmål,
  permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato,
  permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien,
  permittertHvorMangeProsentErDuPermittert,
  permittertHvorMangeTimerHarDuJobbetIUka,
  permittertLønnsperiodeFraOgMedDato,
  permittertLønnsperiodeTilOgMedDato,
  permittertNårErDuPermittertFraOgMedDato,
  permittertNårErDuPermittertTilOgMedDato,
  permittertNårStartetDuIDenneJobben,
  permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
  permittertVetDuHvorMangeTimerDuJobbetIUka,
  permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.permittert";
import {
  arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål,
  ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretHvorMangeTimerHarDuJobbetIUka,
  ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.ikkeEndret";
import { valider } from "~/utils/validering.utils";

export const arbeidsforholdSchema = z
  .object({
    [payload]: z.string().optional(),
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
  .superRefine((data, ctx) => {
    if (data[erTilbakenavigering]) {
      return;
    }
    arbeidsforholdSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof ArbeidsforholdSvar;
      const svar = data[spørsmålId];

      const erSpørsmål =
        spørsmål.type !== "lesMer" &&
        spørsmål.type !== "varselmelding" &&
        spørsmål.type !== "dokumentasjonskravindikator";

      if (synlig && !svar && erSpørsmål && !spørsmål.optional) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
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
    [jegErOppsagtVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [jegErOppsagtHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [jegErOppsagtHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [jegHarSagtOppHvaVarÅrsaken]: z.string().optional(),
    [jegHarSagtOppHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [jegHarSagtOppVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [avskjedigetHvaVarÅrsaken]: z.string().optional(),
    [avskjedigetVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [avskjedigetHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
      z.string().optional(),
    [kontraktenErUgåttHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [arbeidstidenErRedusertHvaErÅrsaken]: z.string().optional(),
    [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]: z.string().optional(),
    [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]: z.string().optional(),
    [arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [konkursVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [konkursHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
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
    [permittertVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [permittertHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [permittertNårErDuPermittertFraOgMedDato]: z.string().optional(),
    [permittertNårErDuPermittertTilOgMedDato]: z.string().optional(),
    [permittertHvorMangeProsentErDuPermittert]: z.string().optional(),
    [permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr]: z.string().optional(),
    [permittertLønnsperiodeFraOgMedDato]: z.string().optional(),
    [permittertLønnsperiodeTilOgMedDato]: z.string().optional(),
    [ikkeEndretVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [ikkeEndretHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet]: z.string().optional(),
    [ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet]: z.string().optional(),
    [harDuJobbetSkiftTurnusEllerRotasjon]: z.string().optional(),
    [hvilkenTypeRotasjonsordningJobbetDu]: z.string().optional(),
    [annenRotasjonBeskrivelse]: z.string().optional(),
    [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed]: z.string().optional(),
    [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed]: z.string().optional(),
  })
  .superRefine((data, context) => {
    arbeidsforholdModalSpørsmål
      .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål)
      .concat(arbeidsforholdModalJegHarSagtOppSelvSpørsmål)
      .concat(arbeidsforholdModalJegHarFåttAvskjedSpørsmål)
      .concat(arbeidsforholdModalKontraktenErUgåttSpørsmål)
      .concat(arbeidsforholdModalArbeidstidenErRedusertSpørsmål)
      .concat(arbeidsforholdModalArbeidsgiverErKonkursSpørsmål)
      .concat(arbeidsforholdModalJegErPermittertSpørsmål)
      .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål)
      .concat(arbeidsforholdModalSkiftTurnusRotasjonSpørsmål)
      .forEach((spørsmål) => {
        const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
        const svar = data[spørsmål.id as keyof ArbeidsforholdModalSvar];
        valider(spørsmål, svar, synlig, context);
      });
  });
