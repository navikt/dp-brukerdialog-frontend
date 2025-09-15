import { expiresIn, getToken, requestOboToken, validateToken } from "@navikt/oasis";
import { getEnv, IEnv } from "./env.utils";
import { logger } from "./logger.utils";

function handleLocalhostToken(tokenName: keyof IEnv) {
  const token = getEnv(tokenName);
  const useMsw = getEnv("USE_MSW") === "true";

  if (expiresIn(token) <= 0 && !useMsw) {
    logger.error("Lokalt token utløpt! Oppdatere token på nytt!");
  }

  return token || "";
}

export async function getSoknadOrkestratorOboToken(request: Request) {
  if (getEnv("IS_LOCALHOST") === "true") {
    return handleLocalhostToken("DP_SOKNAD_ORKESTRATOR_TOKEN");
  }

  const audience = `${getEnv("NAIS_CLUSTER_NAME")}:teamdagpenger:dp-soknad-orkestrator`;
  return await getOnBehalfOfToken(request, audience);
}

export async function getMellomlagringOboToken(request: Request) {
  if (getEnv("IS_LOCALHOST") === "true") {
    return handleLocalhostToken("DP_MELLOMLAGRING_TOKEN");
  }

  const audience = `${getEnv("NAIS_CLUSTER_NAME")}:teamdagpenger:dp-mellomlagring`;
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
