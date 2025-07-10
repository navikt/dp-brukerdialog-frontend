import { getEnv } from "~/utils/env.utils";

export async function lagreSeksjon(
  request: Request,
  soknadId: string,
  seksjonId: string,
  body: string
) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${soknadId}/${seksjonId}`;
  //const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      //Authorization: `Bearer ${onBehalfOfToken}`,
    },
    body,
  });
}
