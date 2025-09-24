import { z } from "zod";
import {
  avtjentVerneplikt,
  dokumenterAvtjentVernepliktNå,
  erTilbakenavigering,
  lasteOppSenereBegrunnelse,
  naarSendtDokumentasjonTidligere,
  senderIkkeDokumentasjonBegrunnelse,
  vernepliktSpørsmål,
  VernepliktSvar,
} from "./verneplikt.spørsmål";

export const vernepliktSchema = z
  .object({
    [avtjentVerneplikt]: z.enum(["ja", "nei"]).optional(),
    [dokumenterAvtjentVernepliktNå]: z
      .enum(["ja", "nei", "lastOppIEtterkant", "lastetOppTidligere"])
      .optional(),
    [lasteOppSenereBegrunnelse]: z.string().optional(),
    [naarSendtDokumentasjonTidligere]: z.string().optional(),
    [senderIkkeDokumentasjonBegrunnelse]: z.string().optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.erTilbakenavigering) {
      return;
    }

    vernepliktSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof VernepliktSvar;
      const svar = data[spørsmålId];

      if (synlig && !svar) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
