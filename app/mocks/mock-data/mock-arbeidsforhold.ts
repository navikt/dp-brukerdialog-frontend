import {
  ArbeidsforholdResponse,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  hvilketLandJobbetDuI,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  hvordanHarDuJobbet,
  navnetPåBedriften,
  oppgiPersonnummeretPinDuHaddeIDetteLandet,
  varighetPåArbeidsforholdetFraOgMedDato,
  varighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppHvorMangeTimerHarDuJobbetIUka,
  jegHarSagtOppVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.jegHarSagtOpp";
import {
  kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.kontraktenErUgått";

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
    },
    {
      [navnetPåBedriften]: "VAKKER TØNNE AS",
      [hvilketLandJobbetDuI]: "NOR",
      [varighetPåArbeidsforholdetFraOgMedDato]: "2023-01-01",
      [varighetPåArbeidsforholdetTilOgMedDato]: "2024-12-24",
      [hvordanHarDetteArbeidsforholdetEndretSeg]: "kontrakten-er-ugått",
      [kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka]: "nei",
      [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]: "ja",
      [kontraktenErUgåttHvaHarDuSvartPåTilbudet]: "nei",
      [kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: "Tønner er ikke min greie."
    },
  ],
  [hvordanHarDuJobbet]: "fast-arbeidstid-i-6-måneder-eller-mer",
  [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]: "ja",
};
