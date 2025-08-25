import { z } from "zod";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  egenNæringEgenNæringsvirksomhetSpørsmål,
  egenNæringEgetGårdsbrukSpørsmål,
  EgenNæringSvar,
} from "./egen-næring.spørsmål";

export const egenNæringSchema = z
  .object({
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

        const erSpørsmål = spørsmål.type !== "lesMer" && spørsmål.type !== "varselmelding" && spørsmål.type !== "dokumentasjonskravindikator";

        if (synlig && !svar && erSpørsmål && !spørsmål.optional) {
          ctx.addIssue({
            path: [spørsmål.id],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }
      });
  });
