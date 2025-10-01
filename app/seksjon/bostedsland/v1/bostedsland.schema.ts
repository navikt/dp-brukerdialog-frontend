import { z } from "zod";
import {
  avreiseDatoFra,
  avreiseDatoTil,
  bostedsland,
  bostedslandSpørsmål,
  BostedslandSvar,
  erTilbakenavigering,
  hvorforReistDuFraNorge,
  reisteDuHjemTilLandetDuBorI,
  reisteDuITaktMedRotasjon,
  reistTilbakeTilBostedslandet,
} from "./bostedsland.spørsmål";
import { valider } from "~/utils/validering.util";

export const bostedslandSchema = z
  .object({
    [bostedsland]: z.string().optional(),
    [reistTilbakeTilBostedslandet]: z.enum(["ja", "nei"]).optional(),
    [reisteDuHjemTilLandetDuBorI]: z.enum(["ja", "nei"]).optional(),
    [reisteDuITaktMedRotasjon]: z.enum(["ja", "nei"]).optional(),
    [avreiseDatoFra]: z.string().optional(),
    [avreiseDatoTil]: z.string().optional(),
    [hvorforReistDuFraNorge]: z.string().optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data[erTilbakenavigering]) {
      return;
    }
    bostedslandSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof BostedslandSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
