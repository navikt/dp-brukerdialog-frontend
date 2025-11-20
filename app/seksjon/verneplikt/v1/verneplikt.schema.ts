import { z } from "zod";
import { valider } from "~/utils/validering.utils";
import {
  avtjentVerneplikt,
  pdfGrunnlag,
  vernepliktKomponenter,
  VernepliktSvar,
} from "./verneplikt.komponenter";
import { handling } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export const vernepliktSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
    [avtjentVerneplikt]: z.enum(["ja", "nei"]).optional(),
    dokumentasjonskrav: z.string().optional(),
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

    vernepliktKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof VernepliktSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
