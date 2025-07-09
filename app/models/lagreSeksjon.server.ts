import { getEnv } from "~/utils/env.utils";
import { logger } from "~/utils/logger.utils";

export async function lagreSeksjon(
  request: Request,
  soknadId: string,
  seksjonId: string,
  body: string
): Promise<{ status: number; message: string }> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${soknadId}/${seksjonId}`;
  //const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      //Authorization: `Bearer ${onBehalfOfToken}`,
    },
    body,
  });

  if (!response.ok) {
    logger.error("Feil ved lagring av seksjon");

    return {
      status: response.status,
      message: "Feil ved lagring av seksjon",
    };
  }

  return {
    status: response.status,
    message: response.status === 201 ? "Seksjon opprettet" : "Seksjon oppdatert",
  };
}
