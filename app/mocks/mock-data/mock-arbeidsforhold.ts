import {
  ArbeidsforholdResponse,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harDuJobbetSkiftTurnusEllerRotasjon,
  hvilketLandJobbetDuI,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  hvordanHarDuJobbet,
  navnetPåBedriften,
  oppgiPersonnummeretPinDuHaddeIDetteLandet,
  varighetPåArbeidsforholdetFraOgMedDato,
  varighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppHvorMangeTimerHarDuJobbetIUka,
  jegHarSagtOppVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegHarSagtOpp";
import {
  kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.kontraktenErUgått";

export const mockArbeidsforhold: ArbeidsforholdResponse = {
  registrerteArbeidsforhold: [
    {
      [navnetPåBedriften]: "STORE SKO AB",
      [hvilketLandJobbetDuI]: "SWE",
      [oppgiPersonnummeretPinDuHaddeIDetteLandet]: "916253511",
      [varighetPåArbeidsforholdetFraOgMedDato]: "2025-09-23",
      [varighetPåArbeidsforholdetTilOgMedDato]: "2025-09-24",
      [hvordanHarDetteArbeidsforholdetEndretSeg]: "jeg-har-sagt-opp-selv",
      [jegHarSagtOppHvaVarÅrsaken]: "Det var for store sko å fylle.",
      [jegHarSagtOppHvorMangeTimerHarDuJobbetIUka]: "93",
      [jegHarSagtOppVetDuHvorMangeTimerDuJobbetIUka]: "ja",
      [harDuJobbetSkiftTurnusEllerRotasjon]: "hverken-skift-turnus-eller-rotasjon",
    },
    {
      [navnetPåBedriften]: "VAKKER TØNNE AS",
      [hvilketLandJobbetDuI]: "NOR",
      [varighetPåArbeidsforholdetFraOgMedDato]: "2023-01-01",
      [varighetPåArbeidsforholdetTilOgMedDato]: "2024-12-24",
      [hvordanHarDetteArbeidsforholdetEndretSeg]: "kontrakten-er-ugått",
      [kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka]: "nei",
      [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
        "ja",
      [kontraktenErUgåttHvaHarDuSvartPåTilbudet]: "nei",
      [kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: "Tønner er ikke min greie.",
      [harDuJobbetSkiftTurnusEllerRotasjon]: "hverken-skift-turnus-eller-rotasjon",
    },
  ],
  [hvordanHarDuJobbet]: "fast-arbeidstid-i-6-måneder-eller-mer",
  [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]: "ja",
};
