import {
  DinSituasjonSvar,
  harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene,
  hvilkenDatoSøkerDuDagpengerFra,
} from "~/seksjon/din-situasjon/v1/din-situasjon.spørsmål";

export const mockDinSituasjon: DinSituasjonSvar = {
  [harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene]: "nei",
  [hvilkenDatoSøkerDuDagpengerFra]: "2025-08-25",
};
