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
  oppgiPersonnummeretPinDuHaddeIDetteLandet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";

export const mockArbeidsforhold: ArbeidsforholdResponse = {
  registrerteArbeidsforhold: [
    {
      [navnetPåBedriften]: "STORE SKO AB",
      [hvilketLandJobbetDuI]: "SWE",
      [oppgiPersonnummeretPinDuHaddeIDetteLandet]: "916253511",
      [jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato]: "2025-09-23",
      [jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato]: "2025-09-24",
      [hvordanHarDetteArbeidsforholdetEndretSeg]: jegHarSagtOppSelv,
      [jegHarSagtOppHvaVarÅrsaken]: "Det var for store sko å fylle.",
      [harDuJobbetSkiftTurnusEllerRotasjon]: hverkenSkiftTurnusEllerRotasjon,
    },
    {
      [navnetPåBedriften]: "VAKKER TØNNE AS",
      [hvilketLandJobbetDuI]: "NOR",
      [kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato]: "2023-01-01",
      [kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato]: "2024-12-24",
      [hvordanHarDetteArbeidsforholdetEndretSeg]: kontraktenErUtgått,
      [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
        "ja",
      [kontraktenErUtgåttHvaHarDuSvartPåTilbudet]: "nei",
      [kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: "Tønner er ikke min greie.",
      [harDuJobbetSkiftTurnusEllerRotasjon]: hverkenSkiftTurnusEllerRotasjon,
    },
  ],
  [hvordanHarDuJobbet]: "fastArbeidstidI6MånederEllerMer",
  [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]: "ja",
};
