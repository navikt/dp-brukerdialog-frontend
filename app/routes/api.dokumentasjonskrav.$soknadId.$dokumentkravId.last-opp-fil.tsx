import { parseFormData } from "@remix-run/form-data-parser";
import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { v4 as uuidV4 } from "uuid";
import { hentMellomlagringOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.dokumentkravId, "Dokumentkrav ID er påkrevd");

  const callId = uuidV4();
  const søknadId = params.soknadId as string;
  const dokumentkravId = params.dokumentkravId as string;

  const formData = await parseFormData(request);
  const fil = formData.get("fil") as File;

  try {
    const url = `${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${søknadId}/${dokumentkravId}`;
    const onBehalfOfToken = await hentMellomlagringOboToken(request);

    const body = new FormData();
    body.append("fil", fil);

    return await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
        "X-Request-Id": callId,
      },
      body: body,
    });
  } catch (error) {
    console.error(error);

    return new Response("Feil ved opplasting av dokument", {
      status: 500,
      statusText: "Feil ved opplasting av dokument",
    });
  }
}
