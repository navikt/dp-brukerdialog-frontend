import { z } from "zod";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  avreiseDatoFra,
  avreiseDatoTil,
  bostedsland,
  folkeregistrertAdresseErNorgeStemmerDet,
  fødselsnummerFraPdl,
  hvorforReistDuFraNorge,
  kontonummerFraKontoregister,
  landFraPdl,
  navnFraPdl,
  personaliaFolkeregistrertAdresseErNorgeSpørsmål,
  personaliaSpørsmål,
  PersonaliaSvar,
  postnummerFraPdl,
  poststedFraPdl,
  reisteDuHjemTilLandetDuBorI,
  reisteDuITaktMedRotasjon,
  reistTilbakeTilBostedslandet,
} from "./personalia.spørsmål";
import { valider } from "~/utils/validering.utils";

export const personaliaSchema = z
  .object({
    [navnFraPdl]: z.string().optional(),
    [fødselsnummerFraPdl]: z.string().optional(),
    [alderFraPdl]: z.string().optional(),
    [adresselinje1FraPdl]: z.string().optional(),
    [adresselinje2FraPdl]: z.string().optional(),
    [adresselinje3FraPdl]: z.string().optional(),
    [postnummerFraPdl]: z.string().optional(),
    [poststedFraPdl]: z.string().optional(),
    [landFraPdl]: z.string().optional(),
    [kontonummerFraKontoregister]: z.string().optional(),
    [folkeregistrertAdresseErNorgeStemmerDet]: z.string().optional(),
    [bostedsland]: z.string().optional(),
    [reistTilbakeTilBostedslandet]: z.enum(["ja", "nei"]).optional(),
    [reisteDuHjemTilLandetDuBorI]: z.enum(["ja", "nei"]).optional(),
    [reisteDuITaktMedRotasjon]: z.enum(["ja", "nei"]).optional(),
    [avreiseDatoFra]: z.string().optional(),
    [avreiseDatoTil]: z.string().optional(),
    [hvorforReistDuFraNorge]: z.string().optional(),
    versjon: z.number().optional(),
  })
  .superRefine((data, context) => {
    personaliaFolkeregistrertAdresseErNorgeSpørsmål
      .concat(personaliaSpørsmål)
      .forEach((spørsmål) => {
        const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
        const svar = data[spørsmål.id as keyof PersonaliaSvar];
        valider(spørsmål, svar, synlig, context);
      });
  });
