import { z } from "zod";
import {
  avsluttetUtdanningSiste6Måneder,
  dokumenterAvsluttetUtdanningSiste6MånederNå,
  handling,
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
import { Seksjonshandling } from "~/utils/Seksjonshandling";

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
    [handling]: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (
      data.handling === Seksjonshandling.tilbakenavigering ||
      data.handling === Seksjonshandling.fortsettSenere
    ) {
      return;
    }

    utdanningKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof UtdanningSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
