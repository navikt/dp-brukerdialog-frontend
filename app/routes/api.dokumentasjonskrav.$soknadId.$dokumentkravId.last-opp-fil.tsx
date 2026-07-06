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

  const søknadId = params.soknadId;
  const dokumentkravId = params.dokumentkravId;
  const callId = uuidV4();

  const contentType = request.headers.get("Content-Type");

  if (!contentType?.startsWith("multipart/form-data")) {
    return new Response("Ugyldig opplastingsformat", { status: 400 });
  }

  const contentLengthHeader = request.headers.get("Content-Length");

  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);

    if (!Number.isFinite(contentLength) || contentLength < 0) {
      return new Response("Ugyldig Content-Length", { status: 400 });
    }

    if (contentLength > MAX_FIL_STØRRELSE + MULTIPART_OVERHEAD) {
      return new Response("Filen er for stor", { status: 413 });
    }
  }

  if (!request.body) {
    return new Response("Mangler request body", { status: 400 });
  }

  try {
    const url = `${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${søknadId}/${dokumentkravId}`;
    const onBehalfOfToken = await hentMellomlagringOboToken(request);

    const fetchInit = {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
        "Content-Type": contentType,
        "X-Request-Id": callId,
      }),
      body: request.body,
      signal: request.signal,
      duplex: "half",
    } satisfies RequestInit & { duplex: "half" };

    return await fetch(url, fetchInit);
  } catch (error) {
    console.error(error);

    return new Response("Feil ved opplasting av dokument", {
      status: 500,
      statusText: "Feil ved opplasting av dokument",
    });
  }
}
