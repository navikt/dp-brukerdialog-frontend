import { z } from "zod";
import {
  årsakTilAtDagpengeneBleStanset,
  hvilkenDatoSøkerDuDagpengerFra,
  dinSituasjonSpørsmål,
  DinSituasjonSvar,
  harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene,
} from "./din-situasjon.spørsmål";

export const dinSituasjonSchema = z
  .object({
    [harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene]: z
      .enum(["ja", "nei", "vetikke"])
      .optional(),
    [årsakTilAtDagpengeneBleStanset]: z.string().max(500, "Maks 500 tegn").optional(),
    [hvilkenDatoSøkerDuDagpengerFra]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    dinSituasjonSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof DinSituasjonSvar;
      const svar = data[spørsmålId];
      const erSpørsmål = spørsmål.type !== "lesMer" && spørsmål.type !== "varselmelding";

      if (synlig && erSpørsmål && !svar) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
