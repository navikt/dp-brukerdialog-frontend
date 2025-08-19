import { z } from "zod";
import {
  avreiseDatoFra,
  avreiseDatoTil,
  bostedsland,
  bostedslandSpørsmål,
  BostedslandSvar,
  hvorforReistDuFraNorge,
  reisteDuHjemTilLandetDuBorI,
  reisteDuITaktMedRotasjon,
  reistTilbakeTilBostedslandet,
} from "./bostedsland.spørsmål";

export const bostedslandSchema = z
  .object({
    [bostedsland]: z.string().optional(),
    [reistTilbakeTilBostedslandet]: z.enum(["ja", "nei"]).optional(),
    [reisteDuHjemTilLandetDuBorI]: z.enum(["ja", "nei"]).optional(),
    [reisteDuITaktMedRotasjon]: z.enum(["ja", "nei"]).optional(),
    [avreiseDatoFra]: z.string().optional(),
    [avreiseDatoTil]: z.string().optional(),
    [hvorforReistDuFraNorge]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    bostedslandSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof BostedslandSvar;
      const svar = data[spørsmålId];

      const isSpørsmål = spørsmål.type !== "lesMer" && spørsmål.type !== "varselmelding";

      if (synlig && !svar && isSpørsmål && !spørsmål.optional) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
