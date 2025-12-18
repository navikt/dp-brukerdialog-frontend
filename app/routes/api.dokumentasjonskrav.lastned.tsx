import { ActionFunctionArgs } from "react-router";
import { hentMellomlagringOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function action({ request }: ActionFunctionArgs) {
  const { filsti } = await request.json();

  const url = `${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${filsti}`;
  const onBehalfOfToken = await hentMellomlagringOboToken(request);

  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });
}
