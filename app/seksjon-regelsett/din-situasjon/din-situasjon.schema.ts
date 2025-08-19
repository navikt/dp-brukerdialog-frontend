import { z } from "zod";
import {
  arsak,
  dato,
  dinSituasjonSpørsmål,
  DinSituasjonSvar,
  mottatt,
} from "./din-situasjon.spørsmål";

export const dinSituasjonSchema = z
  .object({
    [mottatt]: z.enum(["ja", "nei", "vetikke"]).optional(),
    [arsak]: z.string().max(500, "Maks 500 tegn").optional(),
    [dato]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    dinSituasjonSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof DinSituasjonSvar;
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
