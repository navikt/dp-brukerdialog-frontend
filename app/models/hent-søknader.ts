import { subDays } from "date-fns";
import { PåBegynteSøknad, Søknad } from "~/models/hent-søknader-for-ident";
import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { logger } from "~/utils/logger.utils";

export async function hentSøknader(request: Request) {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/mine-soknader`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      connection: "keep-alive",
      "Content-Type": "application/json",
    },
  });
}

export async function parseSøknaderResponse(response: Response): Promise<{
  søknader: Søknad[] | null;
  påbegyntSøknad: PåBegynteSøknad | null;
}> {
  if (!response.ok) {
    logger.error("Feil ved innhenting av orkestrator-søknader", {
      errorText: await response.json(),
    });
    return { søknader: null, påbegyntSøknad: null };
  }

  const alleSøknader: Søknad[] = await response.json();
  const innenfor30Dager = subDays(Date.now(), 30);
  const søknader = alleSøknader.filter(
    (søknad) =>
      søknad.status === "PÅBEGYNT" ||
      (søknad.oppdatertTidspunkt !== undefined &&
        new Date(søknad.oppdatertTidspunkt) > innenfor30Dager)
  );
  const påbegynt = søknader.find((søknad) => søknad.status === "PÅBEGYNT");
  const påbegyntSøknad = påbegynt
    ? {
        soknadUuid: påbegynt.søknadId,
        opprettet: "",
        sistEndretAvBruker: påbegynt.oppdatertTidspunkt,
      }
    : null;

  return { søknader, påbegyntSøknad };
}
