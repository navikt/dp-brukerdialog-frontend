import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { v4 as uuidV4 } from "uuid";
import { hentMellomlagringOboToken } from "~/utils/auth.utils.server";
import { MAX_FIL_STØRRELSE } from "~/utils/dokument.utils";
import { getEnv } from "~/utils/env.utils";

const MULTIPART_OVERHEAD = 10_240; // 10 KB buffer for boundary og part-headers

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.dokumentkravId, "Dokumentkrav ID er påkrevd");

  const callId = uuidV4();
  const søknadId = params.soknadId;
  const dokumentkravId = params.dokumentkravId;

  const contentLength = Number(request.headers.get("Content-Length") ?? 0);
  if (contentLength > MAX_FIL_STØRRELSE + MULTIPART_OVERHEAD) {
    return new Response("Filen er for stor", { status: 413 });
  }

  try {
    const url = `${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${søknadId}/${dokumentkravId}`;

    const onBehalfOfToken = await hentMellomlagringOboToken(request);

    const respons = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
        "Content-Type": request.headers.get("Content-Type") ?? "",
        "X-Request-Id": callId,
      },
      body: request.body,
      // @ts-expect-error — Node 24 krever duplex: "half" når body er en ReadableStream
      duplex: "half",
    });

    return respons;
  } catch (error) {
    console.error(error);

    return new Response("Feil ved opplasting av dokument", {
      status: 500,
      statusText: "Feil ved opplasting av dokument",
    });
  }
}
