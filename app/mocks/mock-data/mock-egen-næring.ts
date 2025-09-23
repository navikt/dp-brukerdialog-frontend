import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  EgenNæringResponse,
  hvemEierGårdsbruket,
  hvilkeTypeGårdsbrukDriverDu,
  hvordanHarDuBeregnetAntallArbeidstimerTotalt,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  organisasjonsnummer,
} from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";

export const mockEngenNæring: EgenNæringResponse = {
  [driverDuEgenNæringsvirksomhet]: "ja",
  næringsvirksomheter: [
    {
      [organisasjonsnummer]: "255663143",
      [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]: "2",
      [hvorMangeTimerJobbetPerUkeNå]: "3",
    },
  ],
  [driverDuEgetGårdsbruk]: "ja",
  gårdsbruk: [
    {
      [organisasjonsnummer]: "830904441",
      [hvilkeTypeGårdsbrukDriverDu]: ["dyr", "skog"],
      [hvemEierGårdsbruket]: ["jeg", "samboer-ektefelle"],
      [hvorMangeProsentAvInntektenGårTilDeg]: "65",
      [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]: "2024",
      [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]: "21",
      [hvordanHarDuBeregnetAntallArbeidstimerTotalt]: "Jeg brukte en kalkulator.",
    },
  ],
};
