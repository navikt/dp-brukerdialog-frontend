import { z } from "zod";
import {
  erTilbakenavigering,
  harTilleggsopplysninger,
  pdfGrunnlag,
  tilleggsopplysninger,
  tilleggsopplysningerSpørsmål,
  TilleggsopplysningerSvar,
} from "./tilleggsopplysninger.spørsmål";
import { valider } from "~/utils/validering.utils";

export const tilleggsopplysningerSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
    [harTilleggsopplysninger]: z.enum(["ja", "nei"]).optional(),
    [tilleggsopplysninger]: z.string().optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    tilleggsopplysningerSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof TilleggsopplysningerSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
