import { z } from "zod";
import {
  barnetilleggKomponenter,
  BarnetilleggSvar,
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  forsørgerDuBarnet,
  forsørgerDuBarnSomIkkeVisesHer,
  fødselsdato,
  handling,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
  pdfGrunnlag,
  seksjonsvar,
} from "./barnetillegg.komponenter";
import { valider } from "~/utils/validering.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export const barnetilleggSchema = z
  .object({
    dokumentasjonskrav: z.string().optional(),
    versjon: z.number().optional(),
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [forsørgerDuBarnSomIkkeVisesHer]: z.enum(["ja", "nei"]).optional(),
    [handling]: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (
      data.handling === Seksjonshandling.tilbakenavigering ||
      data.handling === Seksjonshandling.fortsettSenere
    ) {
      return;
    }

    barnetilleggKomponenter.forEach((komponent) => {
      const synlig = !komponent.visHvis || komponent.visHvis(data);
      const svar = data[komponent.id as keyof BarnetilleggSvar];
      valider(komponent, svar, synlig, context);
    });
  });

export const barnFraPdlSchema = z
  .object({
    id: z.string().optional(),
    [fornavnOgMellomnavn]: z.string().optional(),
    [etternavn]: z.string().optional(),
    [fødselsdato]: z.string().optional(),
    [bostedsland]: z.string().optional(),
    dokumentasjonskravId: z.string().optional(),
    [forsørgerDuBarnet]: z.enum(["ja", "nei"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data[forsørgerDuBarnet]) {
      ctx.addIssue({
        path: [forsørgerDuBarnet],
        code: "custom",
        message: "Du må svare på dette spørsmålet",
      });
    }
  });

export const leggTilBarnManueltSchema = z
  .object({
    [fornavnOgMellomnavn]: z.string().optional(),
    [etternavn]: z.string().optional(),
    [fødselsdato]: z.string().optional(),
    [bostedsland]: z.string().optional(),
  })
  .superRefine((data, context) => {
    leggTilBarnManueltSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof LeggTilBarnManueltSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
