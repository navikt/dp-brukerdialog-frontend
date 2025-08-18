import { z } from "zod";
import {
  avtjentVerneplikt,
  dokumenterAvtjentVernepliktNå,
  lasteOppSenereBegrunnelse,
  naarSendtDokumentasjonTidligere,
  senderIkkeDokumentasjonBegrunnelse,
  vernepliktSporsmal,
  VernepliktSvar,
} from "./verneplikt.sporsmal";

export const vernepliktSchema = z
  .object({
    [avtjentVerneplikt]: z.enum(["ja", "nei"]).optional(),
    [dokumenterAvtjentVernepliktNå]: z
      .enum(["ja", "nei", "lastOppIEtterkant", "lastetOppTidligere"])
      .optional(),
    [lasteOppSenereBegrunnelse]: z.string().optional(),
    [naarSendtDokumentasjonTidligere]: z.string().optional(),
    [senderIkkeDokumentasjonBegrunnelse]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    vernepliktSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof VernepliktSvar;
      const svar = data[sporsmalId];

      if (synlig && !svar) {
        ctx.addIssue({
          path: [sporsmal.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
