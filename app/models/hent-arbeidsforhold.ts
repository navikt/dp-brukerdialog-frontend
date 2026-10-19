import { getEnv } from "~/utils/env.utils";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";

export async function hentArbeidsforhold(request: Request) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/arbeidsforhold`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });
}
