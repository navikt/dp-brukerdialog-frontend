import { z } from "zod";
import {
  barnetilleggKomponenter,
  BarnetilleggSvar,
  bostedsland,
  erTilbakenavigering,
  etternavn,
  fornavnOgMellomnavn,
  forsørgerDuBarnet,
  forsørgerDuBarnSomIkkeVisesHer,
  fødselsdato,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
  pdfGrunnlag,
  seksjonsvar,
} from "./barnetillegg.spørsmål";
import { valider } from "~/utils/validering.utils";

export const barnetilleggSchema = z
  .object({
    dokumentasjonskrav: z.string().optional(),
    versjon: z.number().optional(),
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [forsørgerDuBarnSomIkkeVisesHer]: z.enum(["ja", "nei"]).optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    barnetilleggKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof BarnetilleggSvar];
      valider(spørsmål, svar, synlig, context);
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

export const validertLeggTilBarnManueltSchema = z.object({
  [fornavnOgMellomnavn]: z.string(),
  [etternavn]: z.string(),
  [fødselsdato]: z.string(),
  [bostedsland]: z.string(),
});
