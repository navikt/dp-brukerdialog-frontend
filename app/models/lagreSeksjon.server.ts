import { getSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function lagreSeksjon(
  request: Request,
  soknadId: string,
  seksjonId: string,
  seksjonsData: string
) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${soknadId}/${seksjonId}`;
  const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      connection: "keep-alive",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: seksjonsData,
  });
}
