import { ActionFunctionArgs } from "react-router";
import { hentMellomlagringOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function action({ request }: ActionFunctionArgs) {
  const { filsti } = await request.json();

  const url = `${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${filsti}`;
  const onBehalfOfToken = await hentMellomlagringOboToken(request);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });

  if (!response.ok) {
    throw new Response(`Feil ved kall til ${url}`, {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response;
}
