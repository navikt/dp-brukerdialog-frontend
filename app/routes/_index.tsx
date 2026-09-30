import { redirect } from "react-router";
import { hentSøknader, parseSøknaderResponse } from "~/models/hent-søknader";
import { PåBegynteSøknad, Søknad } from "~/models/hent-søknader-for-ident";
import { SøknadOversikt } from "~/seksjon/oversikt/SøknadOversikt";
import { Route } from "./+types/_index";

export type SøknadOversiktType = {
  søknader: Søknad[];
  påbegyntSøknad: PåBegynteSøknad | null;
};

// Ikke legg inn en action her. Bruk heller en separat API-rute for skjemainnsending.
// Det er ikke mulig å kalle en action fra _index.tsx direkte.
// Dette gjelder fra og med React Router v8.

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
