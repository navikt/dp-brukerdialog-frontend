import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "./networkResponse";
import { getSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { logger } from "~/utils/logger.utils";

interface IForeleggingResultat {
  søknadId: string;
  bekreftet: boolean;
  begrunnelse: string;
}

export async function getMinsteinntektForeleggingresultat(
  request: Request,
  soknadId: string
): Promise<INetworkResponse<IForeleggingResultat>> {
  const url = `${getEnv(
    "DP_SOKNAD_ORKESTRATOR_URL"
  )}/inntekt/${soknadId}/minsteinntektGrunnlag/foreleggingresultat`;
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
    logger.error("Feil ved uthenting av minsteinntekt grunnlag resultat fra soknad-orkestrator");

    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved uthenting av minsteinntekt grunnlag resultat fra soknad-orkestrator",
      },
    };
  }

  const data: IForeleggingResultat = await response.json();

  return {
    status: "success",
    data,
  };
}
