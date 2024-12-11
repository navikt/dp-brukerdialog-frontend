import { getToken, requestOboToken, validateToken } from "@navikt/oasis";
import { getEnv } from "./env.utils";

export async function getSoknadOrkestratorOboToken(request: Request) {
  if (getEnv("IS_LOCALHOST") === "true") {
    return getEnv("DP_SOKNAD_ORKESTRATOR_TOKEN") || "";
  }

  const audience = `${getEnv("NAIS_CLUSTER_NAME")}:teamdagpenger:dp-innsyn`;
  return await getOnBehalfOfToken(request, audience);
}

export async function getOnBehalfOfToken(request: Request, audience: string): Promise<string> {
  const token = getToken(request);
  if (!token) {
    throw new Error("missing token");
  }

  const validation = await validateToken(token);
  if (!validation.ok) {
    throw new Error("token validation failed!");
  }

  const onBehalfOfToken = await requestOboToken(token, audience);
  if (!onBehalfOfToken.ok) {
    throw Error("onBehalfOfToken not found");
  }

  return onBehalfOfToken.token;
}
