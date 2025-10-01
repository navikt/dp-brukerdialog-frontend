import { z } from "zod";
import {
  avsluttetUtdanningSiste6Måneder,
  dokumenterAvsluttetUtdanningSiste6MånederNå,
  erTilbakenavigering,
  lasteOppSenereBegrunnelse,
  naarSendtDokumentasjonTidligere,
  planleggerÅStarteEllerFullføreStudierSamtidig,
  senderIkkeDokumentasjonBegrunnelse,
  tarUtdanningEllerOpplæring,
  utdanningSpørsmål,
  UtdanningSvar,
} from "./utdanning.spørsmål";
import { valider } from "~/utils/validering.util";

export const utdanningSchema = z
  .object({
    [tarUtdanningEllerOpplæring]: z.enum(["ja", "nei"]).optional(),
    [avsluttetUtdanningSiste6Måneder]: z.enum(["ja", "nei"]).optional(),
    [dokumenterAvsluttetUtdanningSiste6MånederNå]: z.string().optional(),
    [lasteOppSenereBegrunnelse]: z.string().optional(),
    [naarSendtDokumentasjonTidligere]: z.string().optional(),
    [senderIkkeDokumentasjonBegrunnelse]: z.string().optional(),
    [planleggerÅStarteEllerFullføreStudierSamtidig]: z.enum(["ja", "nei"]).optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    utdanningSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof UtdanningSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
