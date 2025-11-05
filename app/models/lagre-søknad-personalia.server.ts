import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export type PutSøknadPersonaliaRequestBody = {
   fornavn: string,
   mellomnavn: string | undefined,
   etternavn: string,
   alder: string,
   adresselinje1: string | undefined,
   adresselinje2: string | undefined,
   adresselinje3: string | undefined,
   postnummer: string | undefined,
   poststed: string | undefined,
   landkode: string | undefined,
   land: string | undefined,
   kontonummer: string | undefined,
};

export async function lagreSøknadPersonalia<T>(
  request: Request,
  soknadId: string,
  putSøknadPersonaliaRequestBody: T
) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadId}/personalia`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      connection: "keep-alive",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(putSøknadPersonaliaRequestBody),
  });
}
