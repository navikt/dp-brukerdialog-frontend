import { LoaderFunctionArgs } from "react-router";
import { hentMellomlagringOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const filsti = new URL(request.url).searchParams.get("filsti");

  if (!filsti) {
    throw new Response("Filsti er påkrevd", {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const token = await hentMellomlagringOboToken(request);
  const response = await fetch(`${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${filsti}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Response("Kunne ikke hente dokumentet", {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="dokument.pdf"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
