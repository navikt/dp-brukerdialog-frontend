import { z } from "zod";
import {
  barnetilleggSpørsmål,
  BarnetilleggSvar,
  bostedsland,
  erTilbakenavigering,
  etternavn,
  fornavnOgMellomnavn,
  forsørgerDuBarnet,
  forsørgerDuBarnSomIkkeVisesHer,
  fødselsdato,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
  payload,
} from "./barnetillegg.spørsmål";

export const barnetilleggSchema = z
  .object({
    [forsørgerDuBarnSomIkkeVisesHer]: z.enum(["ja", "nei"]).optional(),
    [payload]: z.string().optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.erTilbakenavigering) {
      return;
    }

    barnetilleggSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof BarnetilleggSvar;
      const svar = data[spørsmålId];

      if (synlig && !svar) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });

export const barnFraPdlSchema = z
  .object({
    [forsørgerDuBarnet]: z.enum(["ja", "nei"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data[forsørgerDuBarnet]) {
      ctx.addIssue({
        path: [forsørgerDuBarnet],
        code: "custom",
        message: "Du må svare på dette spørsmålet",
      });
    }
  });

export const leggTilBarnManueltSchema = z
  .object({
    [fornavnOgMellomnavn]: z.string().optional(),
    [etternavn]: z.string().optional(),
    [fødselsdato]: z.string().optional(),
    [bostedsland]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    leggTilBarnManueltSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof LeggTilBarnManueltSvar;
      const svar = data[spørsmålId];
      const erSpørsmål = spørsmål.type !== "lesMer" && spørsmål.type !== "varselmelding";

      if (erSpørsmål && synlig && !svar) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
