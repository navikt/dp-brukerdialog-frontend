import { z } from "zod";
import {
  avsluttetUtdanningSiste6Måneder,
  dokumenterAvsluttetUtdanningSiste6MånederNå,
  erTilbakenavigering,
  lasteOppSenereBegrunnelse,
  naarSendtDokumentasjonTidligere,
  pdfGrunnlag,
  planleggerÅStarteEllerFullføreStudierSamtidig,
  senderIkkeDokumentasjonBegrunnelse,
  tarUtdanningEllerOpplæring,
  utdanningKomponenter,
  UtdanningSvar,
} from "./utdanning.komponenter";
import { valider } from "~/utils/validering.utils";

export const utdanningSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
    [tarUtdanningEllerOpplæring]: z.enum(["ja", "nei"]).optional(),
    [avsluttetUtdanningSiste6Måneder]: z.enum(["ja", "nei"]).optional(),
    [dokumenterAvsluttetUtdanningSiste6MånederNå]: z.string().optional(),
    [lasteOppSenereBegrunnelse]: z.string().optional(),
    [naarSendtDokumentasjonTidligere]: z.string().optional(),
    [senderIkkeDokumentasjonBegrunnelse]: z.string().optional(),
    [planleggerÅStarteEllerFullføreStudierSamtidig]: z.enum(["ja", "nei"]).optional(),
    dokumentasjonskrav: z.string().optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    utdanningKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof UtdanningSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
