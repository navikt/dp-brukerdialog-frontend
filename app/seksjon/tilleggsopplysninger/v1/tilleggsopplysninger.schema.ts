import { z } from "zod";
import {
  erTilbakenavigering,
  harTilleggsopplysninger,
  tilleggsopplysninger,
  tilleggsopplysningerSpørsmål,
  TilleggsopplysningerSvar,
} from "./tilleggsopplysninger.spørsmål";

export const tilleggsopplysningerSchema = z
  .object({
    [harTilleggsopplysninger]: z.enum(["ja", "nei"]).optional(),
    [tilleggsopplysninger]: z.string().optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.erTilbakenavigering) {
      return;
    }

    tilleggsopplysningerSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof TilleggsopplysningerSvar;
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
