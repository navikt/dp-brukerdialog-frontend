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
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { jegHarSagtOppHvaVarÅrsaken } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUgått";

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
      [harDuJobbetSkiftTurnusEllerRotasjon]: "hverkenSkiftTurnusEllerRotasjon",
    },
    {
      [navnetPåBedriften]: "VAKKER TØNNE AS",
      [hvilketLandJobbetDuI]: "NOR",
      [varighetPåArbeidsforholdetFraOgMedDato]: "2023-01-01",
      [varighetPåArbeidsforholdetTilOgMedDato]: "2024-12-24",
      [hvordanHarDetteArbeidsforholdetEndretSeg]: "kontrakten-er-ugått",
      [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
        "ja",
      [kontraktenErUgåttHvaHarDuSvartPåTilbudet]: "nei",
      [kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: "Tønner er ikke min greie.",
      [harDuJobbetSkiftTurnusEllerRotasjon]: "hverkenSkiftTurnusEllerRotasjon",
    },
  ],
  [hvordanHarDuJobbet]: "fastArbeidstidI6MånederEllerMer",
  [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]: "ja",
};
