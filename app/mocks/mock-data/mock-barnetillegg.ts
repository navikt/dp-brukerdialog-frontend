import { BarnetilleggResponse } from "~/routes/$soknadId.barnetillegg";

export const mockBarnetillegg: BarnetilleggResponse = {
  barnFraPdl: [
    {
      fornavnOgMellomnavn: "FIOLETT ",
      etternavn: "GREVLING",
      fødselsdato: "12345678901",
      hvilkenLandBorBarnet: "NO",
    },
    {
      fornavnOgMellomnavn: "LILLA ",
      etternavn: "KANIN",
      fødselsdato: "12345678901",
      hvilkenLandBorBarnet: "NO",
    },
  ],
  barnLagtManuelt: [
    {
      fornavnOgMellomnavn: "SNURRE",
      etternavn: "SPRETT",
      fødselsdato: "10987654321",
      hvilkenLandBorBarnet: "NO",
    },
  ],
  forsørgerDuBarnetSomIkkeVisesHer: undefined,
};
