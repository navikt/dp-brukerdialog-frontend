import { BarnetilleggResponse } from "~/routes/$soknadId.barnetillegg";

export const mockBarnetillegg: BarnetilleggResponse = {
  barnFraPdl: [
    {
      fornavnOgMellomnavn: "FIOLETT",
      etternavn: "GREVLING",
      fødselsdato: "2022-12-04",
      hvilkenLandBorBarnet: "NO",
    },
    {
      fornavnOgMellomnavn: "LILLA ",
      etternavn: "KANIN",
      fødselsdato: "1999-06-15",
      hvilkenLandBorBarnet: "NO",
    },
  ],
};
