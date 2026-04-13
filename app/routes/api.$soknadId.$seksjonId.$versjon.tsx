import { parseFormData } from "@remix-run/form-data-parser";
import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.seksjonId, "Seksjon ID er påkrevd");
  invariant(params.versjon, "Versjon er påkrevd");

  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${params.soknadId}/${params.seksjonId}`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);
  const formData = await parseFormData(request);
  const pdfGrunnlag = formData.get("pdfGrunnlag") as string;

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: params.seksjonId,
      versjon: params.versjon,
    }),
    pdfGrunnlag: pdfGrunnlag,
  };

  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      connection: "keep-alive",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(putSeksjonRequestBody),
  });
}
