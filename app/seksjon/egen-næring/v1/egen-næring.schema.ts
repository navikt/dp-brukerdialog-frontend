import { z } from "zod";
import {
  andre,
  annet,
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  dyr,
  egenNæringEgenNæringsvirksomhetKomponenter,
  egenNæringEgetGårdsbrukKomponenter,
  EgenNæringSvar,
  hvemEierGårdsbruket,
  hvilkeTypeGårdsbrukDriverDu,
  hvordanHarDuBeregnetAntallArbeidstimerTotalt,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  jeg,
  jord,
  leggTilGårdsbrukKomponenter,
  LeggTilGårdsbrukSvar,
  leggTilNæringsvirksomhetKomponenter,
  LeggTilNæringsvirksomhetSvar,
  organisasjonsnummer,
  pdfGrunnlag,
  samboerEktefelle,
  seksjonsvar,
  skog,
} from "./egen-næring.komponenter";
import { valider } from "~/utils/validering.utils";
import { handling } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export const egenNæringSchema = z
  .object({
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [driverDuEgenNæringsvirksomhet]: z.enum(["ja", "nei"]).optional(),
    [driverDuEgetGårdsbruk]: z.enum(["ja", "nei"]).optional(),
    versjon: z.number().optional(),
    [handling]: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (
      data.handling === Seksjonshandling.tilbakenavigering ||
      data.handling === Seksjonshandling.fortsettSenere
    ) {
      return;
    }

    egenNæringEgenNæringsvirksomhetKomponenter
      .concat(egenNæringEgetGårdsbrukKomponenter)
      .forEach((spørsmål) => {
        const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
        const svar = data[spørsmål.id as keyof EgenNæringSvar];
        valider(spørsmål, svar, synlig, context);
      });
  });

export const leggTilNæringsvirksomhetSchema = z
  .object({
    [organisasjonsnummer]: z.string().optional(),
    [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]: z.string().optional(),
    [hvorMangeTimerJobbetPerUkeNå]: z.string().optional(),
  })
  .superRefine((data, context) => {
    leggTilNæringsvirksomhetKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof LeggTilNæringsvirksomhetSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });

export const leggTilGårdsbrukSchema = z
  .object({
    [organisasjonsnummer]: z.string().optional(),
    [hvilkeTypeGårdsbrukDriverDu]: z.array(z.enum([dyr, jord, skog, annet])).optional(),
    [hvemEierGårdsbruket]: z.array(z.enum([jeg, samboerEktefelle, andre])).optional(),
    [hvorMangeProsentAvInntektenGårTilDeg]: z.string().optional(),
    [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]: z.string().optional(),
    [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]: z
      .string()
      .optional(),
    [hvordanHarDuBeregnetAntallArbeidstimerTotalt]: z.string().optional(),
  })
  .superRefine((data, context) => {
    leggTilGårdsbrukKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof LeggTilGårdsbrukSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
