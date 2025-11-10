import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function lagreDokumentasjonskrav(
  request: Request,
  soknadId: string,
  seksjonId: string,
  oppdatertDokumentasjonskrav: string
) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadId}/${seksjonId}/dokumentasjonskrav`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      connection: "keep-alive",
      "Content-Type": "application/json",
    },
    body: oppdatertDokumentasjonskrav,
  });
}
