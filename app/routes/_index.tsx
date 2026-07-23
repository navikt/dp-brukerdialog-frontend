import { redirect } from "react-router";
import { hentSøknader, parseSøknaderResponse } from "~/models/hent-søknader";
import { Søknad, PåBegynteSøknad } from "~/models/hent-søknader-for-ident";
import { SøknadOversikt } from "~/seksjon/oversikt/SøknadOversikt";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { Route } from "./+types/_index";

export type SøknadOversiktType = {
  søknader: Søknad[];
  påbegyntSøknad: PåBegynteSøknad | null;
};

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

export async function loader({
  request,
}: Route.LoaderArgs): Promise<Response | SøknadOversiktType> {
  const [orkestratorSøknaderResponse] = await Promise.all([hentSøknader(request)]);

  const { søknader, påbegyntSøknad } = await parseSøknaderResponse(orkestratorSøknaderResponse);

  if (påbegyntSøknad === null && søknader?.length === 0) {
    return redirect("/arbeidssoker");
  }

  return {
    søknader: søknader ?? [],
    påbegyntSøknad: påbegyntSøknad ?? null,
  };
}

export default function BrukerdialogIndex() {
  return <SøknadOversikt />;
}
