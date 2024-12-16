import { getSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "~/models/networkResponse";
import { logger } from "~/utils/logger.utils";

export async function journalforPdf(
  request: Request,
  soknadId: string,
  html: string
): Promise<INetworkResponse<{}>> {
  const url = `${getEnv(
    "DP_SOKNAD_ORKESTRATOR_URL"
  )}/inntekt/${soknadId}/minsteinntektGrunnlag/foreleggingresultat/journalforing`;
  const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

  const body = JSON.stringify({ html });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
    body,
  });

  if (!response.ok) {
    logger.error("Feil ved sending av html til soknad-orkestrator for journalføring");

    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved sending av html til soknad-orkestrator for journalføring",
      },
    };
  }

  return {
    status: "success",
    data: {},
  };
}
