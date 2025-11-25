import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { parseFormData } from "@remix-run/form-data-parser";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.seksjonId, "Seksjon ID er påkrevd");

  const formData = await parseFormData(request);
  const dokumentasjonskrav = formData.get("dokumentasjonskrav") as string;

  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${params.soknadId}/${params.seksjonId}/dokumentasjonskrav`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      connection: "keep-alive",
      "Content-Type": "application/json",
    },
    body: dokumentasjonskrav,
  });
}
