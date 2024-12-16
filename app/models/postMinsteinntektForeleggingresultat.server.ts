import { getSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "~/models/networkResponse";
import { logger } from "~/utils/logger.utils";

export async function postMinsteinntektForeleggingresultat(
  request: Request,
  soknadId: string,
  bekreftet: boolean,
  begrunnelse: string
): Promise<INetworkResponse<{}>> {
  const url = `${getEnv(
    "DP_SOKNAD_ORKESTRATOR_URL"
  )}/inntekt/${soknadId}/minsteinntektGrunnlag/foreleggingresultat`;
  const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

  const body = JSON.stringify({ søknadId: soknadId, bekreftet, begrunnelse });

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
    logger.error("Feil ved lagring av minsteinntekt grunnlag resultat til soknad-orkestrator");

    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved lagring av minsteinntekt grunnlag resultat til soknad-orkestrator",
      },
    };
  }

  return {
    status: "success",
    data: {},
  };
}
