import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function hentPersonalia(request: Request) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/personalia`;
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
