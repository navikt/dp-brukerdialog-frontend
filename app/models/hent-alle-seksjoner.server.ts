import { getEnv } from "~/utils/env.utils";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";

export async function hentAlleSeksjoner(request: Request, soknadId: string) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${soknadId}`;
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
