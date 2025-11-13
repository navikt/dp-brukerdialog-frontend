import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { parseFormData } from "@remix-run/form-data-parser";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const søknadId = params.soknadId as string;
  const seksjonId = params.seksjonId as string;
  const formData = await parseFormData(request);
  const oppdatertDokumentasjonskrav = formData.get("oppdatertDokumentasjonskrav") as string;

  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${søknadId}/${seksjonId}/dokumentasjonskrav`;
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
