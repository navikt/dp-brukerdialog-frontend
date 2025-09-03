import { Personalia } from "~/routes/$soknadId.personalia";

export const mockPersonalia: Personalia = {
  person: {
    fornavn: "TOPP",
    mellomnavn: "",
    etternavn: "SURE",
    fødselsdato: "1979-05-21",
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
  kontonummer: null,
};
