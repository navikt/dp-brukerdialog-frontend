import { expiresIn, getToken, requestOboToken, validateToken } from "@navikt/oasis";
import { getEnv, IEnv } from "./env.utils";
import { logger } from "./logger.utils";

function håndterLocalhostToken(tokenName: keyof IEnv) {
  const token = getEnv(tokenName);
  const useMsw = getEnv("USE_MSW") === "true";

  if (expiresIn(token) <= 0 && !useMsw) {
    logger.error("Lokalt token utløpt! Oppdatere token på nytt!");
  }

  return token || "";
}

export async function hentSoknadOrkestratorOboToken(request: Request) {
  if (getEnv("IS_LOCALHOST") === "true") {
    return håndterLocalhostToken("DP_SOKNAD_ORKESTRATOR_TOKEN");
  }

  const audience = `${getEnv("NAIS_CLUSTER_NAME")}:teamdagpenger:dp-soknad-orkestrator`;
  return await hentOnBehalfOfToken(request, audience);
}

export async function hentMellomlagringOboToken(request: Request) {
  if (getEnv("IS_LOCALHOST") === "true") {
    return håndterLocalhostToken("DP_MELLOMLAGRING_TOKEN");
  }

  const audience = `${getEnv("NAIS_CLUSTER_NAME")}:teamdagpenger:dp-mellomlagring`;
  return await hentOnBehalfOfToken(request, audience);
}

export async function hentOnBehalfOfToken(request: Request, audience: string): Promise<string> {
  const token = getToken(request);
  if (!token) {
    logger.error("Mangler token");
    throw new Error("Mangler token");
  }

  const validation = await validateToken(token);
  if (!validation.ok) {
    logger.error(`Uautorisert: ${validation.error}`);
    throw new Response("Uautorisert", { status: 401 });
  }

  const onBehalfOfToken = await requestOboToken(token, audience);
  if (!onBehalfOfToken.ok) {
    logger.error(`Klarte ikke å hente OBO token: ${onBehalfOfToken.error}`);
    throw new Response("Klarte ikke å hente OBO token", { status: 500 });
  }

  return onBehalfOfToken.token;
}
