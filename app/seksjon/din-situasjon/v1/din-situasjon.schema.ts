import { z } from "zod";
import {
  dinSituasjonKomponenter,
  DinSituasjonSvar,
  handling,
  harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene,
  hvilkenDatoSøkerDuDagpengerFra,
  pdfGrunnlag,
  årsakTilAtDagpengeneBleStanset,
} from "./din-situasjon.komponenter";
import { valider } from "~/utils/validering.utils";
import { erTilbakenavigering } from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.komponenter";

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
    [handling]: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (data.handling === "tilbakenavigering" || data.handling === "fortsettSenere") {
      return;
    }

    dinSituasjonKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof DinSituasjonSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
