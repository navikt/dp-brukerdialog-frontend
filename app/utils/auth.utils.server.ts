import { expiresIn, getToken, requestOboToken, validateToken } from "@navikt/oasis";
import { getEnv } from "./env.utils";
import { logger } from "./logger.utils";

export async function getSoknadOrkestratorOboToken(request: Request) {
  if (getEnv("IS_LOCALHOST") === "true") {
    if (expiresIn(getEnv("DP_SOKNAD_ORKESTRATOR_TOKEN")) <= 0) {
      logger.error("Lokalt token utløpt! Oppdatere token på nytt!");
    }
    return getEnv("DP_SOKNAD_ORKESTRATOR_TOKEN") || "";
  }

  const audience = `${getEnv("NAIS_CLUSTER_NAME")}:teamdagpenger:dp-soknad-orkestrator`;
  return await getOnBehalfOfToken(request, audience);
}

export async function getOnBehalfOfToken(request: Request, audience: string): Promise<string> {
  const token = getToken(request);
  if (!token) {
    logger.error("Missing token");
    throw new Error("Missing token");
  }

  const validation = await validateToken(token);
  if (!validation.ok) {
    logger.error(`Failed to validate token: ${validation.error}`);
    throw new Response("Token validation failed", { status: 401 });
  }

  const onBehalfOfToken = await requestOboToken(token, audience);
  if (!onBehalfOfToken.ok) {
    logger.error(`Failed to get OBO token: ${onBehalfOfToken.error}`);
    throw new Response("Unauthorized", { status: 401 });
  }

  return onBehalfOfToken.token;
}
