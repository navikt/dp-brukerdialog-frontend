import { getSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "~/models/networkResponse";

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
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });

  if (!response.ok) {
    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved uthenting av inntekt fra soknad-orkestrator",
      },
    };
  }

  const data: IMinsteInntektGrunnlag = await response.json();

  return {
    status: "success",
    data,
  };
}
