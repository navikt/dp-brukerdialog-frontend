import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { getEnv } from "~/utils/env.utils";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  try {
    const soknadId = params.soknadId;
    const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadId}`;
    const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

    return await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
      },
    });
  } catch (error) {
    console.error("Feil ved sletting av søknad:", error);
    return new Response("Feil ved sletting av søknad", {
      status: 500,
      statusText: "Feil ved sletting av dokument",
    });
  }
}
