import { getEnv } from "~/utils/env.utils";
import { hentDpSøknadOboToken, hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { formatISO, subDays } from "date-fns";
import { logger } from "~/utils/logger.utils";
import {
  PåbegyntSøknadMedKilde,
  OrkestratorSoknad,
  QuizSøknader,
} from "~/models/hent-søknader-for-ident";

export async function hentOrkestratorSøknader(request: Request) {
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

export async function hentQuizSøknader(request: Request) {
  const fromDate = subDays(Date.now(), 30);
  const formattedDate = formatISO(fromDate, { representation: "date" });

  const url = `${process.env.DP_SOKNAD_URL}/soknad/mine-soknader?fom=${formattedDate}`;
  const onBehalfOfToken = await hentDpSøknadOboToken(request);
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });
}

export async function parseQuizResponse(response: Response): Promise<{
  søknader: QuizSøknader | null;
  påbegyntSøknad: PåbegyntSøknadMedKilde | null;
}> {
  if (!response.ok) {
    const errorText = await response.json();
    logger.error("Feil ved innhenting av quiz-søknader", { errorText });
    return { søknader: null, påbegyntSøknad: null };
  }

  const søknader = (await response.json()) as QuizSøknader;
  const påbegyntSøknad =
    søknader.paabegynt != null ? { ...søknader.paabegynt, erQuizSøknad: true } : null;

  return { søknader, påbegyntSøknad };
}

export async function parseOrkestratorResponse(response: Response): Promise<{
  søknader: OrkestratorSoknad[] | null;
  påbegyntSøknad: PåbegyntSøknadMedKilde | null;
}> {
  if (!response.ok) {
    const errorText = await response.json();
    logger.error("Feil ved innhenting av orkestrator-søknader", { errorText });
    return { søknader: null, påbegyntSøknad: null };
  }

  const søknader = (await response.json()) as OrkestratorSoknad[];
  const aktiv = søknader.find((søknad) => søknad.status === "PÅBEGYNT");
  const påbegyntSøknad = aktiv
    ? {
        soknadUuid: aktiv.søknadId,
        opprettet: "",
        sistEndretAvBruker: aktiv.oppdatertTidspunkt,
        erQuizSøknad: false,
      }
    : null;

  return { søknader, påbegyntSøknad };
}
