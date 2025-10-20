import { Personalia } from "~/routes/$soknadId.personalia";

export const mockPersonaliaFraOrkestrator: Personalia = {
  person: {
    fornavn: "MINI",
    mellomnavn: "",
    etternavn: "MOCK",
    fødselsdato: "1979-05-21",
    alder: 75,
    ident: "21857998666",
    postAdresse: {
      adresselinje1: "Dale 17",
      adresselinje2: "",
      adresselinje3: "",
      postnummer: "9423",
      poststed: "Grøtavær",
      landkode: "NO",
      land: "NORGE",
    },
    folkeregistrertAdresse: {
      adresselinje1: "Dale 17",
      adresselinje2: "",
      adresselinje3: "",
      postnummer: "9423",
      poststed: "Grøtavær",
      landkode: "NO",
      land: "NORGE",
    },
  },
  kontonummer: "07546979428",
};
