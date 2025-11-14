import { EgenNæringSeksjon } from "~/routes/$soknadId.egen-naring";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  hvemEierGårdsbruket,
  hvilkeTypeGårdsbrukDriverDu,
  hvordanHarDuBeregnetAntallArbeidstimerTotalt,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  organisasjonsnummer,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";

export const mockEgenNæring: EgenNæringSeksjon = {
  seksjon: {
    seksjonId: "egen-næring",
    versjon: 1,
    seksjonsvar: {
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
          [hvemEierGårdsbruket]: ["jeg", "samboerEktefelle"],
          [hvorMangeProsentAvInntektenGårTilDeg]: "65",
          [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]: "2024",
          [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]: "21",
          [hvordanHarDuBeregnetAntallArbeidstimerTotalt]: "Jeg brukte en kalkulator.",
        },
      ],
    },
  },
  dokumentasjonskrav: null,
};
