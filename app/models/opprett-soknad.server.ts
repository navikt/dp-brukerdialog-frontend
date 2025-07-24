import { getSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function opprettSoknad(request: Request) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`;

  const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${onBehalfOfToken}`,
    },
  });
}
