import { z } from "zod";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  avreiseDatoFra,
  avreiseDatoTil,
  bostedsland,
  etternavnFraPdl,
  folkeregistrertAdresseErNorgeStemmerDet,
  fornavnFraPdl,
  fødselsnummerFraPdl,
  hvorforReistDuFraNorge,
  kontonummerFraKontoregister,
  landFraPdl,
  landkodeFraPdl,
  mellomnavnFraPdl,
  pdfGrunnlag,
  personaliaBostedslandSpørsmål,
  personaliaSpørsmål,
  PersonaliaSvar,
  postnummerFraPdl,
  poststedFraPdl,
  reisteDuHjemTilLandetDuBorI,
  reisteDuITaktMedRotasjon,
  reistTilbakeTilBostedslandet,
  seksjonsvar,
} from "./personalia.spørsmål";
import { valider } from "~/utils/validering.utils";

export const personaliaSchema = z
  .object({
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [fornavnFraPdl]: z.string().optional(),
    [mellomnavnFraPdl]: z.string().optional(),
    [etternavnFraPdl]: z.string().optional(),
    [fødselsnummerFraPdl]: z.string().optional(),
    [alderFraPdl]: z.string().optional(),
    [adresselinje1FraPdl]: z.string().optional(),
    [adresselinje2FraPdl]: z.string().optional(),
    [adresselinje3FraPdl]: z.string().optional(),
    [postnummerFraPdl]: z.string().optional(),
    [poststedFraPdl]: z.string().optional(),
    [landkodeFraPdl]: z.string().optional(),
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
    personaliaSpørsmål.concat(personaliaBostedslandSpørsmål).forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof PersonaliaSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
