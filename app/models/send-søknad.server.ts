import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function sendSøknad(request: Request, søknadId: string) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${søknadId}`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  // Bør det sjekkes her om alle seksjoner faktisk er ferdige utfylt så ingen kan sende inn før de er ferdige?
  // Litt styr med versjonering, kanskje, men da åpner vi ikke for at bruker kan sende inn søknad som ikke er ferdig
  // utfylt.

  return await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });
}
