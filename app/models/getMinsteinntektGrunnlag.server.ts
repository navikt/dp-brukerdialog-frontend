import { getSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "~/models/networkResponse";
import { logger } from "~/utils/logger.utils";

export interface IMinsteInntektGrunnlag {
  siste12mnd: string;
  siste36mnd: string;
}

export async function getMinsteinntektGrunnlag(
  request: Request,
  soknadId: string
): Promise<INetworkResponse<IMinsteInntektGrunnlag>> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/inntekt/${soknadId}/minsteinntektGrunnlag`;
  const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });

  if (!response.ok) {
    logger.error("Feil ved uthenting av minsteinntektGrunnlag fra soknad-orkestrator");

    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved uthenting av minsteinntektGrunnlag fra soknad-orkestrator",
      },
    };
  }

  const data: IMinsteInntektGrunnlag = await response.json();

  return {
    status: "success",
    data,
  };
}
