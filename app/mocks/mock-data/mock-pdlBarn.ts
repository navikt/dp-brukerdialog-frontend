import {
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  fødselsdato,
  BarnFraPdlType,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";

export const mockBarnFraPdl: BarnFraPdlType[] = [
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
