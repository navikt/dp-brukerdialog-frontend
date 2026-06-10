import {
  ArbeidsforholdResponse,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harDuJobbetSkiftTurnusEllerRotasjon,
  hverkenSkiftTurnusEllerRotasjon,
  hvilketLandJobbetDuI,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  hvordanHarDuJobbet,
  jegHarSagtOppSelv,
  kontraktenErUtgått,
  navnetPåBedriften,
  oppgiPersonnummeretPinDuHaddeIDetteLandet
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";

export const mockArbeidsforhold: ArbeidsforholdResponse = {
  registrerteArbeidsforhold: [
    {
      [navnetPåBedriften]: "STORE SKO AB",
      [hvilketLandJobbetDuI]: "SWE",
      [oppgiPersonnummeretPinDuHaddeIDetteLandet]: "916253511",
      [jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato]: "2025-09-23",
      [jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato]: "2025-09-24",
      [hvordanHarDetteArbeidsforholdetEndretSeg]: jegHarSagtOppSelv,
      [jegHarSagtOppHvaVarÅrsaken]: "Det var for store sko å fylle.",
      [harDuJobbetSkiftTurnusEllerRotasjon]: hverkenSkiftTurnusEllerRotasjon
    },
    {
      [navnetPåBedriften]: "VAKKER TØNNE AS",
      [hvilketLandJobbetDuI]: "NOR",
      [kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato]: "2023-01-01",
      [kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato]: "2024-12-24",
      [hvordanHarDetteArbeidsforholdetEndretSeg]: kontraktenErUtgått,
      [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
        "ja",
      [kontraktenErUtgåttHvaHarDuSvartPåTilbudet]: "nei",
      [kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: "Tønner er ikke min greie.",
      [harDuJobbetSkiftTurnusEllerRotasjon]: hverkenSkiftTurnusEllerRotasjon
    }
  ],
  [hvordanHarDuJobbet]: "fastArbeidstidI6MånederEllerMer",
  [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]: "ja"
};
