import { z } from "zod";
import {
  avtjentVerneplikt,
  dokumenterAvtjentVernepliktNå,
  erTilbakenavigering,
  lasteOppSenereBegrunnelse,
  naarSendtDokumentasjonTidligere,
  pdfGrunnlag,
  senderIkkeDokumentasjonBegrunnelse,
  vernepliktSpørsmål,
  VernepliktSvar,
} from "./verneplikt.spørsmål";
import { valider } from "~/utils/validering.utils";

export const vernepliktSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
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
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    vernepliktSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof VernepliktSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
