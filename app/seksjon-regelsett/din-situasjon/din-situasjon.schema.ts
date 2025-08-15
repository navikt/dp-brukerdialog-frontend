import { z } from "zod";
import {
  arsak,
  dato,
  dinSituasjonSporsmal,
  DinSituasjonSvar,
  mottatt,
} from "./din-situasjon.sporsmal";

export const dinSituasjonSchema = z
  .object({
    [mottatt]: z.enum(["ja", "nei", "vetikke"]).optional(),
    [arsak]: z.string().max(500, "Maks 500 tegn").optional(),
    [dato]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    dinSituasjonSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof DinSituasjonSvar;
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
