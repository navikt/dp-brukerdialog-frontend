import { getEnv } from "~/utils/env.utils";
import { getSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";

export async function hentOppsummering(request: Request, soknadId: string) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${soknadId}`;
  const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

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
