import { BarnetilleggSeksjon } from "~/routes/$soknadId.barnetillegg";
import {
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  fødselsdato,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";

export const mockBarnetillegg: BarnetilleggSeksjon = {
  barnFraPdl: [
    {
      id: "b2f1e8c7-3a4d-4e2b-9c1f-7a8b6d5e4c3f",
      [fornavnOgMellomnavn]: "FIOLETT",
      [etternavn]: "GREVLING",
      [fødselsdato]: "2022-12-04",
      [bostedsland]: "NO",
    },
    {
      id: "e1d2c3b4-a5f6-4d7e-8c9b-0a1b2c3d4e5f",
      [fornavnOgMellomnavn]: "LILLA",
      [etternavn]: "KANIN",
      [fødselsdato]: "1999-06-15",
      [bostedsland]: "NO",
    },
  ],
};
