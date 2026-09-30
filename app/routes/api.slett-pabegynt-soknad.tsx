import { redirect } from "react-router";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { Route } from "./+types/api.slett-pabegynt-soknad";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const soknadUuid = formData.get("soknadUuid") as string;

  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadUuid}`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);
  const response = await fetch(url, {
    method: "DELETE",
    headers: { Accept: "application/json", Authorization: `Bearer ${onBehalfOfToken}` },
  });

  if (!response.ok) {
    return { error: "Vi klarte ikke å slette din søknad. Vennligst prøv igjen." };
  }

  return redirect("/arbeidssoker");
}
