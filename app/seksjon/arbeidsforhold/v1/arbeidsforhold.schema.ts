import { z } from "zod";
import { fallbackT } from "~/i18n";
import {
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  arbeidstidenErRedusertHvaErÅrsaken,
  arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
  lagArbeidsforholdModalArbeidstidenErRedusertKomponenter,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import {
  jegHarFåttAvskjedHvaVarÅrsaken,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
  lagArbeidsforholdModalJegHarFåttAvskjedKomponenter,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import {
  ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato,
  lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import {
  jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  jegErOppsagtHvaHarDuSvartPåTilbudet,
  jegErOppsagtHvaVarÅrsaken,
  jegErOppsagtVarighetPåArbeidsforholdetFraDato,
  jegErOppsagtVarighetPåArbeidsforholdetTilDato,
  lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
  lagArbeidsforholdModalJegHarSagtOppSelvKomponenter,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
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
  lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import {
  kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
  lagArbeidsforholdModalKontraktenErUtgåttKomponenter,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
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
  lagArbeidsforholdModalJegErPermittertKomponenter,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { valider } from "~/utils/validering.utils";
import {
  annenRotasjonBeskrivelse,
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
  lagArbeidsforholdKomponenter,
  lagArbeidsforholdModalKomponenter,
  lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  navnetPåBedriften,
  oppgiPersonnummeretPinDuHaddeIDetteLandet,
  oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto,
  oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato,
  pdfGrunnlag,
  seksjonsvar,
  varierendeArbeidstidDeSiste12Månedene,
} from "./arbeidsforhold.komponenter";

const arbeidsforholdKomponenter = lagArbeidsforholdKomponenter(fallbackT);
const arbeidsforholdModalKomponenter = lagArbeidsforholdModalKomponenter(fallbackT);
const arbeidsforholdModalSkiftTurnusRotasjonKomponenter =
  lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter(fallbackT);
const arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter =
  lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter(fallbackT);
const arbeidsforholdModalJegHarSagtOppSelvKomponenter =
  lagArbeidsforholdModalJegHarSagtOppSelvKomponenter(fallbackT);
const arbeidsforholdModalJegHarFåttAvskjedKomponenter =
  lagArbeidsforholdModalJegHarFåttAvskjedKomponenter(fallbackT);
const arbeidsforholdModalKontraktenErUtgåttKomponenter =
  lagArbeidsforholdModalKontraktenErUtgåttKomponenter(fallbackT);
const arbeidsforholdModalArbeidstidenErRedusertKomponenter =
  lagArbeidsforholdModalArbeidstidenErRedusertKomponenter(fallbackT);
const arbeidsforholdModalArbeidsgiverErKonkursKomponenter =
  lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter(fallbackT);
const arbeidsforholdModalJegErPermittertKomponenter =
  lagArbeidsforholdModalJegErPermittertKomponenter(fallbackT);
const arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter =
  lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter(fallbackT);

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
