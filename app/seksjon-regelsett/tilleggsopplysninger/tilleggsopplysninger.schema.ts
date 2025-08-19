import { z } from "zod";
import {
  harTilleggsopplysninger,
  tilleggsopplysninger,
  tilleggsopplysningerSpørsmål,
  TilleggsopplysningerSvar,
} from "./tilleggsopplysninger.sporsmal";

export const tilleggsopplysningerSchema = z
  .object({
    [harTilleggsopplysninger]: z.enum(["ja", "nei"]).optional(),
    [tilleggsopplysninger]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    tilleggsopplysningerSpørsmål.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof TilleggsopplysningerSvar;
      const svar = data[sporsmalId];

      if (synlig && !svar) {
        ctx.addIssue({
          path: [sporsmal.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
