import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function opprettSoknad(request: Request) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });
}
