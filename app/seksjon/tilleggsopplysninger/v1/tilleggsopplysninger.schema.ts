import { z } from "zod";
import {
  handling,
  harTilleggsopplysninger,
  pdfGrunnlag,
  tilleggsopplysninger,
  tilleggsopplysningerKomponenter,
  TilleggsopplysningerSvar,
} from "./tilleggsopplysninger.komponenter";
import { valider } from "~/utils/validering.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export const tilleggsopplysningerSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
    [harTilleggsopplysninger]: z.enum(["ja", "nei"]).optional(),
    [tilleggsopplysninger]: z.string().optional(),
    versjon: z.number().optional(),
    [handling]: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (
      data.handling === Seksjonshandling.tilbakenavigering ||
      data.handling === Seksjonshandling.fortsettSenere
    ) {
      return;
    }

    tilleggsopplysningerKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof TilleggsopplysningerSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
