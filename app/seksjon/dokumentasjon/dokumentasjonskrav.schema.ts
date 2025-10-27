import { z } from "zod";

import { valider } from "~/utils/validering.utils";
import {
  dokumentasjonskravSpørsmål,
  DokumentasjonskravSvar,
  DOKUMENTKRAV_SVAR_SEND_NAA,
  DOKUMENTKRAV_SVAR_SENDER_IKKE,
  DOKUMENTKRAV_SVAR_SENDER_SENERE,
  DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE,
  velgHvaDuVilGjøre,
} from "./dokumentasjonskrav.spørsmål";

export const dokumentasjonskravSchema = z
  .object({
    [velgHvaDuVilGjøre]: z
      .enum([
        DOKUMENTKRAV_SVAR_SEND_NAA,
        DOKUMENTKRAV_SVAR_SENDER_IKKE,
        DOKUMENTKRAV_SVAR_SENDER_SENERE,
        DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE,
      ])
      .optional(),
  })
  .superRefine((data, context) => {
    dokumentasjonskravSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof DokumentasjonskravSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
