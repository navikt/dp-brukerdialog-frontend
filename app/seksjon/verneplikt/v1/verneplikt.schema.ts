import { z } from "zod";
import { valider } from "~/utils/validering.utils";
import {
  avtjentVerneplikt,
  erTilbakenavigering,
  pdfGrunnlag,
  vernepliktKomponenter,
  VernepliktSvar,
} from "./verneplikt.komponenter";

export const vernepliktSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
    [avtjentVerneplikt]: z.enum(["ja", "nei"]).optional(),
    dokumentasjonskrav: z.string().optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    vernepliktKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof VernepliktSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
