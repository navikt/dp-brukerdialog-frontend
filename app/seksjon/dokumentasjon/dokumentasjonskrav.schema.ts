import { z } from "zod";

import { valider } from "~/utils/validering.utils";
import {
  dokumentasjonskravKomponenter,
  DokumentasjonskravSvar,
  dokumentkravSvarSendNå,
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSenderSenere,
  dokumentkravSvarSendtTidligere,
  hvaErGrunnenTilAtDuIkkeSenderDokumentet,
  hvaErGrunnenTilAtDuSenderDokumentetSenere,
  nårSendteDuDokumentet,
  velgHvaDuVilGjøre,
} from "./dokumentasjonskrav.komponenter";

const kortTekstMaksLengde = 200;

export const dokumentasjonskravSchema = z
  .object({
    [velgHvaDuVilGjøre]: z
      .enum([
        dokumentkravSvarSendNå,
        dokumentkravSvarSenderIkke,
        dokumentkravSvarSenderSenere,
        dokumentkravSvarSendtTidligere,
      ])
      .optional(),
    [hvaErGrunnenTilAtDuSenderDokumentetSenere]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
    [nårSendteDuDokumentet]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
    [hvaErGrunnenTilAtDuIkkeSenderDokumentet]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
  })
  .superRefine((data, context) => {
    dokumentasjonskravKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof DokumentasjonskravSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
