import { z } from "zod";
import {
  barnetilleggSporsmal,
  BarnetilleggSvar,
  barnFraPdl,
  barnLagtManuelt,
  etternavn,
  fodselsnummer,
  fornavnOgEtternavn,
  forsørgerBarnSomIkkeVises,
  hvilketLandBarnetBorI,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.sporsmal";

export const barneSchema = z.object({
  [fornavnOgEtternavn]: z.string().max(100, "Maks 100 tegn"),
  [etternavn]: z.string().max(100, "Maks 100 tegn"),
  [fodselsnummer]: z.string(),
  [hvilketLandBarnetBorI]: z.string().optional(),
});

export const barneTilleggSchema = z
  .object({
    [forsørgerBarnSomIkkeVises]: z.enum(["ja", "nei"]).optional(),
    [barnFraPdl]: z.array(barneSchema).optional(),
    [barnLagtManuelt]: z.array(barneSchema).optional(),
  })
  .superRefine((data, ctx) => {
    barnetilleggSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof BarnetilleggSvar;
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
