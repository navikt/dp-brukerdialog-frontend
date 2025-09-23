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
  payload,
  samboerEktefelle,
  skog,
} from "./egen-næring.spørsmål";

export const egenNæringSchema = z
  .object({
    [payload]: z.string().optional(),
    [driverDuEgenNæringsvirksomhet]: z.enum(["ja", "nei"]).optional(),
    [driverDuEgetGårdsbruk]: z.enum(["ja", "nei"]).optional(),
  })
  .superRefine((data, ctx) => {
    egenNæringEgenNæringsvirksomhetSpørsmål
      .concat(egenNæringEgetGårdsbrukSpørsmål)
      .forEach((spørsmål) => {
        const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
        const spørsmålId = spørsmål.id as keyof EgenNæringSvar;
        const svar = data[spørsmålId];

        const erSpørsmål =
          spørsmål.type !== "lesMer" &&
          spørsmål.type !== "varselmelding" &&
          spørsmål.type !== "dokumentasjonskravindikator";

        if (synlig && !svar && erSpørsmål && !spørsmål.optional) {
          ctx.addIssue({
            path: [spørsmål.id],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }
      });
  });

export const leggTilNæringsvirksomhetSchema = z
  .object({
    [organisasjonsnummer]: z.string().optional(),
    [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]: z.string().optional(),
    [hvorMangeTimerJobbetPerUkeNå]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    leggTilNæringsvirksomhetSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof LeggTilNæringsvirksomhetSvar;
      const svar = data[spørsmålId];

      const erSpørsmål =
        spørsmål.type !== "lesMer" &&
        spørsmål.type !== "varselmelding" &&
        spørsmål.type !== "dokumentasjonskravindikator";

      if (synlig && !svar && erSpørsmål && !spørsmål.optional) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
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
  .superRefine((data, ctx) => {
    leggTilGårdsbrukSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof LeggTilGårdsbrukSvar;
      const svar = data[spørsmålId];

      const erSpørsmål =
        spørsmål.type !== "lesMer" &&
        spørsmål.type !== "varselmelding" &&
        spørsmål.type !== "dokumentasjonskravindikator";

      if (synlig && !svar && erSpørsmål && !spørsmål.optional) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
