import { parseFormData } from "@remix-run/form-data-parser";
import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { v4 as uuidV4 } from "uuid";
import { getMellomlagringOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.dokumentkravId, "Dokumentkrav ID er påkrevd");

  const callId = uuidV4();
  const søknadId = params.soknadId as string;
  const dokumentkravId = params.dokumentkravId as string;

  const formData = await parseFormData(request);
  const dokument = formData.get("file") as File;

  try {
    const url = `${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${søknadId}/${dokumentkravId}`;
    const onBehalfOfToken = await getMellomlagringOboToken(request);

    const requestData = new FormData();
    requestData.append("file", dokument);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
        "X-Request-Id": callId,
      },
      body: requestData,
    });

    if (!response.ok) {
      return new Response("Feil ved opplasting", {
        status: response.status,
        statusText: response.statusText,
      });
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return new Response("Feil ved opplasting", {
      status: 500,
      statusText: "Feil ved opplasting",
    });
  }
}
