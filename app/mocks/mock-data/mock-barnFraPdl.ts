import {
  BarnFraPdl,
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  fødselsdato,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";

export const mockBarnFraPdl: BarnFraPdl[] = [
  {
    id: "1",
    [fornavnOgMellomnavn]: "FIOLETT",
    [etternavn]: "GREVLING",
    [fødselsdato]: "2022-12-04",
    [bostedsland]: "NO",
  },
  {
    id: "2",
    [fornavnOgMellomnavn]: "LILLA",
    [etternavn]: "KANIN",
    [fødselsdato]: "1999-06-15",
    [bostedsland]: "NO",
  },
  {
    id: "3",
    [fornavnOgMellomnavn]: "John",
    [etternavn]: "Doe",
    [fødselsdato]: "1994-06-15",
    [bostedsland]: "NO",
  },
];
