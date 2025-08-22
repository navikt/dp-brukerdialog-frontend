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
  barnLagtManuelt: [
    {
      fornavnOgMellomnavn: "SNURRE",
      etternavn: "SPRETT",
      fødselsdato: "1999-12-20",
      hvilkenLandBorBarnet: "NO",
    },
    {
      fornavnOgMellomnavn: "JOHN",
      etternavn: "DOE",
      fødselsdato: "2000-01-01",
      hvilkenLandBorBarnet: "UK",
    },
  ],
  forsørgerDuBarnetSomIkkeVisesHer: undefined,
};
