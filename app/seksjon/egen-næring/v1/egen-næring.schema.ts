import { z } from "zod";
import {
  andre,
  annet,
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  dyr,
  egenNæringEgenNæringsvirksomhetSpørsmål,
  egenNæringEgetGårdsbrukSpørsmål,
  EgenNæringSvar,
  erTilbakenavigering,
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
  leggTilGårdsbrukSpørsmål,
  LeggTilGårdsbrukSvar,
  leggTilNæringsvirksomhetSpørsmål,
  LeggTilNæringsvirksomhetSvar,
  organisasjonsnummer,
  seksjonsvar,
  pdfGrunnlag,
  samboerEktefelle,
  skog,
} from "./egen-næring.spørsmål";
import { valider } from "~/utils/validering.utils";

export const egenNæringSchema = z
  .object({
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [driverDuEgenNæringsvirksomhet]: z.enum(["ja", "nei"]).optional(),
    [driverDuEgetGårdsbruk]: z.enum(["ja", "nei"]).optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    egenNæringEgenNæringsvirksomhetSpørsmål
      .concat(egenNæringEgetGårdsbrukSpørsmål)
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
    leggTilNæringsvirksomhetSpørsmål.forEach((spørsmål) => {
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
    leggTilGårdsbrukSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof LeggTilGårdsbrukSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
