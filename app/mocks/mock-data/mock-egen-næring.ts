import { EgenNæringSeksjon } from "~/routes/$soknadId.egen-naring";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  gårdsbruketsNavn,
  hvemEierGårdsbruket,
  hvilkeTypeGårdsbrukDriverDu,
  hvordanHarDuBeregnetAntallArbeidstimerTotalt,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  nårBleArbeidstidenRedusert,
  organisasjonsnummer,
  virksomhetensNavn,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";

export const mockEgenNæring: EgenNæringSeksjon = {
  seksjon: {
    seksjonId: "egen-næring",
    versjon: 1,
    seksjonsvar: {
      [driverDuEgenNæringsvirksomhet]: "ja",
      næringsvirksomheter: [
        {
          [virksomhetensNavn]: "OST OG POPP AS",
          [organisasjonsnummer]: "255663143",
          [nårBleArbeidstidenRedusert]: "2025-12-01",
          [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]: "2",
          [hvorMangeTimerJobbetPerUkeNå]: "3",
        },
      ],
      [driverDuEgetGårdsbruk]: "ja",
      gårdsbruk: [
        {
          [gårdsbruketsNavn]: "HEST OG FOR",
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
