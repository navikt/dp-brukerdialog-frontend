import { z } from "zod";
import {
  avsluttetUtdanningSiste6Måneder,
  dokumenterAvsluttetUtdanningSiste6MånederNå,
  lasteOppSenereBegrunnelse,
  naarSendtDokumentasjonTidligere,
  planleggerÅStarteEllerFullføreStudierSamtidig,
  senderIkkeDokumentasjonBegrunnelse,
  tarUtdanningEllerOpplæring,
  utdanningSporsmal,
  UtdanningSvar,
} from "./utdanning.sporsmal";

export const utdanningSchema = z
  .object({
    [tarUtdanningEllerOpplæring]: z.enum(["ja", "nei"]).optional(),
    [avsluttetUtdanningSiste6Måneder]: z.enum(["ja", "nei"]).optional(),
    [dokumenterAvsluttetUtdanningSiste6MånederNå]: z.string().optional(),
    [lasteOppSenereBegrunnelse]: z.string().optional(),
    [naarSendtDokumentasjonTidligere]: z.string().optional(),
    [senderIkkeDokumentasjonBegrunnelse]: z.string().optional(),
    [planleggerÅStarteEllerFullføreStudierSamtidig]: z.enum(["ja", "nei"]).optional(),
  })
  .superRefine((data, ctx) => {
    utdanningSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof UtdanningSvar;
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
