import { BarnetilleggResponse } from "~/routes/$soknadId.barnetillegg";

export const mockBarnetillegg: BarnetilleggResponse = {
  barnFraPdl: [
    {
      fornavnOgMellomnavn: "FIOLETT",
      etternavn: "GREVLING",
      fodselsdato: "2022-12-04",
      bostedsland: "NO",
    },
    {
      fornavnOgMellomnavn: "LILLA ",
      etternavn: "KANIN",
      fodselsdato: "1999-06-15",
      bostedsland: "NO",
    },
  ],
};
