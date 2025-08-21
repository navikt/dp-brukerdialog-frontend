import { z } from "zod";
import {
  barnetilleggSpørsmål,
  BarnetilleggSvar,
  forsørgerduBarnetSomIkkeVisesHer,
} from "./barnetillegg.spørsmål";

export const barnetilleggSchema = z
  .object({
    [forsørgerduBarnetSomIkkeVisesHer]: z.enum(["ja", "nei"]).optional(),
  })
  .superRefine((data, ctx) => {
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
