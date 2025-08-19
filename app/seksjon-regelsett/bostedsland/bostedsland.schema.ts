import { z } from "zod";
import {
  avreiseDatoFra,
  avreiseDatoTil,
  bostedsland,
  bostedslandSporsmal,
  BostedslandSvar,
  hvorforReistDuFraNorge,
  reisteDuHjemTilLandetDuBorI,
  reisteDuITaktMedRotasjon,
  reistTilbakeTilBostedslandet,
} from "./bostedsland.sporsmal";

import { KomponentType, SpørsmalBase, SpørsmalType } from "~/components/sporsmal/sporsmal.types";

export const bostedslandSchema = z
  .object({
    [bostedsland]: z.string().optional(),
    [reistTilbakeTilBostedslandet]: z.enum(["ja", "nei"]).optional(),
    [reisteDuHjemTilLandetDuBorI]: z.enum(["ja", "nei"]).optional(),
    [reisteDuITaktMedRotasjon]: z.enum(["ja", "nei"]).optional(),
    [avreiseDatoFra]: z.string().optional(),
    [avreiseDatoTil]: z.string().optional(),
    [hvorforReistDuFraNorge]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    bostedslandSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof BostedslandSvar;
      const svar = data[sporsmalId];

      const isSpørsmål = sporsmal.type !== "lesMer" && sporsmal.type !== "varselmelding";

      if (synlig && !svar && isSpørsmål && !sporsmal.optional) {
        ctx.addIssue({
          path: [sporsmal.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
