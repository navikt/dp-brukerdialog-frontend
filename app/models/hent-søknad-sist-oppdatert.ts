import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function hentSøknadSistOppdatert(request: Request, soknadId: string) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadId}/sistoppdatert`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      connection: "keep-alive",
      "Content-Type": "application/json",
    },
  });
}
