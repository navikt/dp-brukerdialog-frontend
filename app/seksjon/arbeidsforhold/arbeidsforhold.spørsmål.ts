import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  jegErOppsagtHvaHarDuSvartPåTilbudet,
  jegErOppsagtHvaVarÅrsaken,
  jegErOppsagtHvorMangeTimerHarDuJobbetIUka,
  jegErOppsagtVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.jegErOppsagt";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppHvorMangeTimerHarDuJobbetIUka,
  jegHarSagtOppVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.jegHarSagtOpp";
import {
  avskjedigetHvaVarÅrsaken,
  avskjedigetHvorMangeTimerHarDuJobbetIUka,
  avskjedigetVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.avskjediget";
import {
  kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka,
  kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.kontraktenErUgått";
import {
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  arbeidstidenErRedusertHvaErÅrsaken,
  arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
  arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka,
  arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.arbeidstidenErRedusert";
import {
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
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.konkurs";
import {
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
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.permittert";
import {
  ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretHvorMangeTimerHarDuJobbetIUka,
  ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.ikkeEndret";

export const payload = "payload";
export const hvordanHarDuJobbet = "hvordan-har-du-jobbet";
export const fastArbeidstidIMindreEnn6Måneder = "fast-arbeidstid-i-mindre-enn-6-måneder";
export const fastArbeidstidI6MånederEllerMer = "fast-arbeidstid-i-6-måneder-eller-mer";
export const varierendeArbeidstidDeSiste12Månedene = "varierende-arbeidstid-de-siste-12-månedene";
export const jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene =
  "jobbet-mer-igjennomsnitt-de-siste-36-månedene-enn-de-siste-12-månedenen";
export const harIkkeJobbetDeSiste36Månedene = "har-ikke-jobbet-de-siste-36-månedene";
export const harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene =
  "har-du-jobbet-i-et-annet-eøs-land-sveits-eller-storbritannia-i-løpet-av-de-siste-36-månedene";
export const navnetPåBedriften = "navn-på-bedriften";
export const hvilketLandJobbetDuI = "hvilket-land-jobbet-du-i";
export const oppgiPersonnummeretPinDuHaddeIDetteLandet =
  "oppgi-personnummeret-pin-du-hadde-i-dette-landet";
export const varighetPåArbeidsforholdetFraOgMedDato =
  "varighet-på-arbeidsforholdet-fra-og-med-dato";
export const varighetPåArbeidsforholdetTilOgMedDato =
  "varighet-på-arbeidsforholdet-til-og-med-dato";
export const hvordanHarDetteArbeidsforholdetEndretSeg =
  "hvordan-har-dette-arbeidsforholdet-endret-seg";
export const arbeidsgiverenMinHarSagtMegOpp = "arbeidsgiverenMinHarSagtMegOpp";
export const jegHarSagtOppSelv = "jeg-har-sagt-opp-selv";
export const jegHarFåttAvskjed = "jeg-har-fått-avskjed";
export const kontraktenErUgått = "kontrakten-er-ugått";
export const arbeidstidenErRedusert = "arbeidstiden-er-redusert";
export const arbeidsgiverErKonkurs = "arbeidsgiver-er-konkurs";
export const jegErPermitert = "jeg-er-permitert";
export const arbeidsforholdetErIkkeEndret = "arbeidsforholdet-er-ikke-endret";
export const harDuJobbetSkiftTurnusEllerRotasjon = "har-du-jobbet-skift-turnus-eller-rotasjon";
export const hvilkenTypeRotasjonsordningJobbetDu = "hvilken-type-rotasjonsordning-jobbet-du";
export const annenRotasjonBeskrivelse = "annen-rotasjon-beskrivelse";
export const oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed =
  "oppgi-siste-arbeidsperiode-iden-siste-rotasjonen-din-dato-fra-og-med";
export const oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed =
  "oppgi-siste-arbeidsperiode-iden-siste-rotasjonen-din-dato-til-og-med";

export type Arbeidsforhold = {
  [navnetPåBedriften]?: string;
  [hvilketLandJobbetDuI]?: string;
  [oppgiPersonnummeretPinDuHaddeIDetteLandet]?: string;
  [varighetPåArbeidsforholdetFraOgMedDato]?: string;
  [varighetPåArbeidsforholdetTilOgMedDato]?: string;
  [hvordanHarDetteArbeidsforholdetEndretSeg]?: string;
  [jegErOppsagtHvaVarÅrsaken]?: string;
  [jegErOppsagtVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [jegErOppsagtHvorMangeTimerHarDuJobbetIUka]?: string;
  [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [jegErOppsagtHvaHarDuSvartPåTilbudet]?: string;
  [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [jegHarSagtOppHvaVarÅrsaken]?: string;
  [jegHarSagtOppVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [jegHarSagtOppHvorMangeTimerHarDuJobbetIUka]?: string;
  [avskjedigetHvaVarÅrsaken]?: string;
  [avskjedigetVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [avskjedigetHvorMangeTimerHarDuJobbetIUka]?: string;
  [arbeidstidenErRedusertHvaErÅrsaken]?: string;
  [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]?: string;
  [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]?: string;
  [arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka]?: string;
  [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]?: string;
  [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka]?: string;
  [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]?: string;
  [kontraktenErUgåttHvaHarDuSvartPåTilbudet]?: string;
  [kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [konkursVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [konkursHvorMangeTimerHarDuJobbetIUka]?: string;
  [konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato]?: string;
  [konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]?: string;
  [konkursNårStartetDuIDenneJobben]?: string;
  [konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler]?: string;
  [konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler]?: string;
  [konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet]?: string;
  [konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen]?: string;
  [konkursHarDuSøktOmLønnsgarantimidler]?: string;
  [konkursDekkerLønnsgarantiordningenKravetDitt]?: string;
  [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet]?: string;
  [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn]?: string;
  [permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato]?: string;
  [permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]?: string;
  [permittertNårStartetDuIDenneJobben]?: string;
  [permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien]?: string;
  [permittertVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [permittertHvorMangeTimerHarDuJobbetIUka]?: string;
  [permittertNårErDuPermittertFraOgMedDato]?: string;
  [permittertNårErDuPermittertTilOgMedDato]?: string;
  [permittertHvorMangeProsentErDuPermittert]?: string;
  [permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr]?: string;
  [permittertLønnsperiodeFraOgMedDato]?: string;
  [permittertLønnsperiodeTilOgMedDato]?: string;
  [ikkeEndretVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [ikkeEndretHvorMangeTimerHarDuJobbetIUka]?: string;
  [ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet]?: string;
  [ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet]?: string;
  [harDuJobbetSkiftTurnusEllerRotasjon]?: string;
  [hvilkenTypeRotasjonsordningJobbetDu]?: string;
  [annenRotasjonBeskrivelse]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed]?: string;
};

export type ArbeidsforholdModalSvar = {
  [navnetPåBedriften]?: string;
  [hvilketLandJobbetDuI]?: string;
  [oppgiPersonnummeretPinDuHaddeIDetteLandet]?: string;
  [varighetPåArbeidsforholdetFraOgMedDato]?: string;
  [varighetPåArbeidsforholdetTilOgMedDato]?: string;
  [hvordanHarDetteArbeidsforholdetEndretSeg]?: string;
  [jegErOppsagtHvaVarÅrsaken]?: string;
  [jegErOppsagtVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [jegErOppsagtHvorMangeTimerHarDuJobbetIUka]?: string;
  [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [jegErOppsagtHvaHarDuSvartPåTilbudet]?: string;
  [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [jegHarSagtOppHvaVarÅrsaken]?: string;
  [jegHarSagtOppVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [jegHarSagtOppHvorMangeTimerHarDuJobbetIUka]?: string;
  [avskjedigetHvaVarÅrsaken]?: string;
  [avskjedigetVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [avskjedigetHvorMangeTimerHarDuJobbetIUka]?: string;
  [arbeidstidenErRedusertHvaErÅrsaken]?: string;
  [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]?: string;
  [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]?: string;
  [arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka]?: string;
  [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]?: string;
  [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka]?: string;
  [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]?: string;
  [kontraktenErUgåttHvaHarDuSvartPåTilbudet]?: string;
  [kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [konkursVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [konkursHvorMangeTimerHarDuJobbetIUka]?: string;
  [konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato]?: string;
  [konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]?: string;
  [konkursNårStartetDuIDenneJobben]?: string;
  [konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler]?: string;
  [konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler]?: string;
  [konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet]?: string;
  [konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen]?: string;
  [konkursHarDuSøktOmLønnsgarantimidler]?: string;
  [konkursDekkerLønnsgarantiordningenKravetDitt]?: string;
  [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet]?: string;
  [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn]?: string;
  [permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato]?: string;
  [permittertOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]?: string;
  [permittertNårStartetDuIDenneJobben]?: string;
  [permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien]?: string;
  [permittertVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [permittertHvorMangeTimerHarDuJobbetIUka]?: string;
  [permittertNårErDuPermittertFraOgMedDato]?: string;
  [permittertNårErDuPermittertTilOgMedDato]?: string;
  [permittertHvorMangeProsentErDuPermittert]?: string;
  [permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr]?: string;
  [permittertLønnsperiodeFraOgMedDato]?: string;
  [permittertLønnsperiodeTilOgMedDato]?: string;
  [ikkeEndretVetDuHvorMangeTimerDuJobbetIUka]?: string;
  [ikkeEndretHvorMangeTimerHarDuJobbetIUka]?: string;
  [ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet]?: string;
  [ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet]?: string;
  [harDuJobbetSkiftTurnusEllerRotasjon]?: string;
  [hvilkenTypeRotasjonsordningJobbetDu]?: string;
  [annenRotasjonBeskrivelse]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed]?: string;
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

export const arbeidsforholdSpørsmål: KomponentType[] = [
  {
    id: hvordanHarDuJobbet,
    type: "envalg",
    label: "Hvilke av de følgende alternativene passer best med hvordan du har jobbet?",
    options: [
      {
        value: fastArbeidstidIMindreEnn6Måneder,
        label: "Jeg har hatt fast arbeidstid i mindre enn seks måneder",
      },
      {
        value: fastArbeidstidI6MånederEllerMer,
        label: "Jeg har hatt fast arbeidstid i seks måneder eller mer",
      },
      {
        value: varierendeArbeidstidDeSiste12Månedene,
        label: "Jeg har hatt varierende arbeidstid de siste 12 månedene",
      },
      {
        value: jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
        label: "Jeg har jobbet mer i gjennomsnitt de siste 36 månedene enn de siste 12 månedene",
      },
      {
        value: harIkkeJobbetDeSiste36Månedene,
        label: "Jeg har ikke vært i jobb de siste 36 månedene",
      },
    ],
  },
  {
    id: "hvordanHarDuJobbetLesMer",
    type: "lesMer",
    label: "Les mer om arbeidstid",
    description:
      "<ul><li><strong>Fast arbeidstid</strong> betyr at du har en arbeidsavtale med fast stillingsprosent eller fast antall arbeidstimer.</li><li><strong>Varierende arbeidstid</strong> betyr at antall timer du jobber er ulik og har endret seg over tid. Du har for eksempel hatt flere korte arbeidsforhold, jobbet som vikar eller ekstrahjelp. Hvis arbeidstiden din er varierende gjør vi en gjennomsnittsberegning av arbeidstiden din fra de siste 12 månedene.<br/><br/>Hvis du har jobbet mer i gjennomsnitt de siste 36 månedene enn de siste 12 månedene, gjør vi en gjennomsnittsberegning for å finne ut om det lønner seg å ta med arbeidstiden din de siste 36 månedene i vurderingen.</li></ul>",
  },
  {
    id: harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
    type: "envalg",
    label:
      "Har du jobbet i et annet EØS-land, Sveits eller Storbritannia i løpet av de siste 36 månedene?",
    description:
      "Andre land i EØS: Belgia, Bulgaria, Danmark, Estland, Finland, Frankrike, Hellas, Irland, Island, Italia, Kroatia, Kypros, Latvia, Liechtenstein, Litauen, Luxembourg, Malta, Nederland, Polen, Portugal, Romania, Slovakia, Slovenia, Spania, Sverige, Tsjekkia, Tyskland, Ungarn og Østerrike.",
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
    visHvis: (svar: ArbeidsforholdSvar) =>
      (svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene) ||
      false,
  },
  {
    id: "harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette",
    description:
      "Hvis du har jobbet i et annet EØS-land, Sveits eller Storbritannia kan du ha rett til å få overført arbeidsperioder du har hatt der. Da vil de regnes med i vurderingen av retten til dagpenger i Norge.",
    visHvis: (svar: ArbeidsforholdSvar) =>
      (svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene) ||
      false,
  },
  {
    id: "harIkkeJobbetDeSiste36MånedeneVarselMelding",
    type: "varselmelding",
    variant: "warning",
    label: "",
    description:
      "Hvis du ikke har vært i arbeid, har du i utgangspunktet ikke rett til dagpenger. Du må derfor regne med å få avslag på søknaden din.<br/><br/>" +
      "<strong>Unntaket er hvis du har avtjent verneplikt</strong> i minst tre av de siste tolv månedene. Du legger ved dokumentasjon på at du har avtjent verneplikt senere i søknaden.",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[hvordanHarDuJobbet] === harIkkeJobbetDeSiste36Månedene,
  },
];

export const arbeidsforholdModalSpørsmål: KomponentType[] = [
  {
    id: navnetPåBedriften,
    type: "kortTekst",
    label: "Navnet på bedriften",
  },
  {
    id: hvilketLandJobbetDuI,
    type: "land",
    label: "Hvilket land jobbet du i?",
  },
  {
    id: oppgiPersonnummeretPinDuHaddeIDetteLandet,
    type: "kortTekst",
    label: "Oppgi personnummeret (PIN) som du hadde i dette landet",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      (svar[hvilketLandJobbetDuI] && svar[hvilketLandJobbetDuI] !== "NOR") || false,
  },
  {
    id: varighetPåArbeidsforholdetFraOgMedDato,
    type: "periodeFra",
    periodeLabel: "Varighet på arbeidsforholdet",
    label: "Fra og med",
  },
  {
    id: varighetPåArbeidsforholdetTilOgMedDato,
    type: "periodeTil",
    label: "Til og med",
    optional: true,
  },
  {
    id: hvordanHarDetteArbeidsforholdetEndretSeg,
    type: "envalg",
    label: "Hvordan har dette arbeidsforholdet endret seg?",
    options: [
      { value: arbeidsgiverenMinHarSagtMegOpp, label: "Arbeidsgiveren min har sagt meg opp" },
      { value: jegHarSagtOppSelv, label: "Jeg har sagt opp selv" },
      { value: jegHarFåttAvskjed, label: "Jeg har fått avskjed" },
      { value: kontraktenErUgått, label: "Kontrakten er utgått" },
      { value: arbeidstidenErRedusert, label: "Arbeidstiden er redusert" },
      { value: arbeidsgiverErKonkurs, label: "Arbeidsgiver er konkurs" },
      { value: jegErPermitert, label: "Jeg er permittert" },
      { value: arbeidsforholdetErIkkeEndret, label: "Arbeidsforholdet er ikke endret" },
    ],
  },
];

export const arbeidsforholdModalSkiftTurnusRotasjonSpørsmål: KomponentType[] = [
  {
    id: harDuJobbetSkiftTurnusEllerRotasjon,
    type: "envalg",
    label: "Har du jobbet du skift, turnus eller rotasjon?",
    options: [
      { value: "skift-eller-turnus", label: "Ja, jeg har jobbet skift eller turnus" },
      { value: "rotasjon", label: "Ja, jeg har jobbet rotasjon" },
      { value: "hverken-skift-turnus-eller-rotasjon", label: "Nei, ingen av delene" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      (svar[hvordanHarDetteArbeidsforholdetEndretSeg] &&
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] !== arbeidsforholdetErIkkeEndret) ||
      false,
  },
  {
    id: hvilkenTypeRotasjonsordningJobbetDu,
    type: "envalg",
    label: "Hvilke type rotasjonsordning jobbet du?",
    options: [
      { value: "2-4-rotasjon", label: "2:4" },
      { value: "2-3-rotasjon", label: "2:3" },
      { value: "1-1-rotasjon", label: "1:1" },
      { value: "annen-rotasjon", label: "Annen rotasjon" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == "rotasjon",
  },
  {
    id: annenRotasjonBeskrivelse,
    type: "langTekst",
    maxLength: 500,
    label: "Annen rotasjon",
    description:
      "Beskriv kort hvor mange uker du jobber inkludert om du jobber helg og hvor mange uker du har fri i rotasjonsordningen",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvilkenTypeRotasjonsordningJobbetDu] == "annen-rotasjon",
  },
  {
    id: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed,
    type: "periodeFra",
    periodeLabel: "Oppgi siste arbeidsperiode du hadde i den siste rotasjonen din",
    label: "Fra og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == "rotasjon",
  },
  {
    id: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed,
    type: "periodeTil",
    label: "Til og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == "rotasjon",
  },
];
