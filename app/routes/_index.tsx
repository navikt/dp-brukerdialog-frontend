import { redirect } from "react-router";
import { hentSøknader, parseSøknaderResponse } from "~/models/hent-søknader";
import { PåBegynteSøknad, Søknad } from "~/models/hent-søknader-for-ident";
import { SøknadOversikt } from "~/seksjon/oversikt/SøknadOversikt";
import { Route } from "./+types/_index";

export type SøknadOversiktType = {
  søknader: Søknad[];
  påbegyntSøknad: PåBegynteSøknad | null;
};

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
