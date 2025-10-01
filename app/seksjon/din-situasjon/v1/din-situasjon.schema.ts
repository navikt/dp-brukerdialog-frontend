import { z } from "zod";
import {
  årsakTilAtDagpengeneBleStanset,
  hvilkenDatoSøkerDuDagpengerFra,
  dinSituasjonSpørsmål,
  DinSituasjonSvar,
  harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene,
} from "./din-situasjon.spørsmål";
import { valider } from "~/utils/validering.util";

export const dinSituasjonSchema = z
  .object({
    [harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene]: z
      .enum(["ja", "nei", "vetikke"])
      .optional(),
    [årsakTilAtDagpengeneBleStanset]: z.string().max(500, "Maks 500 tegn").optional(),
    [hvilkenDatoSøkerDuDagpengerFra]: z.string().optional(),
    versjon: z.number().optional(),
  })
  .superRefine((data, context) => {
    dinSituasjonSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof DinSituasjonSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
