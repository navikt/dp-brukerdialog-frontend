import { z } from "zod";
import { fallbackT } from "~/i18n";
import { valider } from "~/utils/validering.utils";
import {
  avtjentVerneplikt,
  handling,
  lagVernepliktKomponenter,
  pdfGrunnlag,
  VernepliktSvar,
} from "./verneplikt.komponenter";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

const vernepliktKomponenter = lagVernepliktKomponenter(fallbackT);

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
