import { BarnetilleggResponse } from "~/routes/$soknadId.barnetillegg";

export const mockBarnetillegg: BarnetilleggResponse = {
  barnFraPdl: [
    {
      id: "1",
      fornavnOgMellomnavn: "FIOLETT",
      etternavn: "GREVLING",
      fødselsdato: "2022-12-04",
      bostedsland: "NO",
    },
    {
      id: "2",
      fornavnOgMellomnavn: "LILLA",
      etternavn: "KANIN",
      fødselsdato: "1999-06-15",
      bostedsland: "NO",
    },
  ],
};
