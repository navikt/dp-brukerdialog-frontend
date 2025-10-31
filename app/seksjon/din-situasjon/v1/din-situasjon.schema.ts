import { z } from "zod";
import {
  dinSituasjonSpørsmål,
  DinSituasjonSvar,
  harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene,
  hvilkenDatoSøkerDuDagpengerFra,
  pdfGrunnlag,
  årsakTilAtDagpengeneBleStanset,
} from "./din-situasjon.spørsmål";
import { valider } from "~/utils/validering.utils";
import { erTilbakenavigering } from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.spørsmål";

export const dinSituasjonSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
    [harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene]: z
      .enum(["ja", "nei", "vetikke"])
      .optional(),
    [årsakTilAtDagpengeneBleStanset]: z.string().max(500, "Maks 500 tegn").optional(),
    [hvilkenDatoSøkerDuDagpengerFra]: z.string().optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    dinSituasjonSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof DinSituasjonSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
