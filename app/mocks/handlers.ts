import { http, HttpResponse } from "msw";
import { getEnv } from "~/utils/env.utils";

export const handlers = [
  http.post(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`, () => {
    return HttpResponse.text("b1778783-3ec1-4cd1-8eae-b496c10a6122");
  }),
  http.put(
    `${getEnv(
      "DP_SOKNAD_ORKESTRATOR_URL"
    )}/seksjon/b1778783-3ec1-4cd1-8eae-b496c10a6122/din-situasjon`,
    () => {
      return HttpResponse.json({
        status: 201,
        message: "Seksjon opprettet",
      });
    }
  ),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/personalia`, () => {
    return HttpResponse.json({
      person: {
        fornavn: "etFornavn",
        mellomnavn: "etMellomnavn",
        etternavn: "etEtternavn",
        fodselsdato: "1965-23-01",
        ident: "29291202061",
        postadresse: null,
        postAdresse: {
          adresselinje1: "Postadresselinje 1",
          adresselinje2: "Postadresselinje 2",
          adresselinje3: "Postadresselinje 3",
          postnummer: "1234",
          poststed: "POSTADRESSESTED",
          landkode: "NO",
          land: "Norge",
        },
        folkeregistrertAdresse: {
          adresselinje1: "Folkeregistrert Adresselinje 1",
          adresselinje2: "Folkeregistrert Adresselinje 2",
          adresselinje3: "Folkeregistrert Adresselinje 3",
          postnummer: "1234",
          poststed: "FOLKEREGISTRERT POSTSTED",
          landkode: "NO",
          land: "Norge",
        },
      },
      kontonummer: "76377460789",
    });
  }),
  http.get(
    `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/b1778783-3ec1-4cd1-8eae-b496c10a6122/utdanning`,
    () => {
      return HttpResponse.json(
        {
          tarUtdanningEllerOpplæring: "",
        },
        { status: 200 }
      );
    }
  ),
];
