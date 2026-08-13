import { z } from "zod";
import { fallbackT } from "~/i18n";
import { valider } from "~/utils/validering.utils";
import {
  DokumentasjonskravSvar,
  dokumentkravEttersendt,
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSenderSenere,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
  hvaErGrunnenTilAtDuIkkeSenderDokumentet,
  hvaErGrunnenTilAtDuSenderDokumentetSenere,
  lagDokumentasjonskravKomponenter,
  nårSendteDuDokumentet,
  velgHvaDuVilGjøre,
} from "./dokumentasjonskrav.komponenter";

const kortTekstMaksLengde = 200;

const dokumentasjonskravKomponenter = lagDokumentasjonskravKomponenter(fallbackT);

export const dokumentasjonskravSchema = z
  .object({
    [velgHvaDuVilGjøre]: z
      .enum([
        dokumentkravSvarSendNå,
        dokumentkravSvarSenderIkke,
        dokumentkravSvarSenderSenere,
        dokumentkravSvarSendtTidligere,
        dokumentkravEttersendt,
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
