import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentMellomlagringOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.dokumentkravId, "Dokumentkrav ID er påkrevd");

  const formData = await request.formData();
  const filsti = formData.get("filsti") as string;

  try {
    const url = `${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${filsti}`;
    const onBehalfOfToken = await hentMellomlagringOboToken(request);

    return await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Feil ved sletting av dokument", {
      status: 500,
      statusText: "Feil ved sletting av dokument",
    });
  }
}
