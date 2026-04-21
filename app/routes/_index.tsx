import { redirect, useLoaderData } from "react-router";
import { hentOrkestratorSøknader } from "~/models/hent-orkestrator-søknader";
import { hentQuizSøknader } from "~/models/hent-quiz-soknader";
import {
  InnsendteSøknader,
  OrkestratorSoknad,
  QuizSøknader,
} from "~/models/hent-søknader-for-ident";
import { getEnv } from "~/utils/env.utils";
import { logger } from "~/utils/logger.utils";
import { Route } from "./+types/_index";
import SøknadOversikt from "~/seksjon/oversikt/SøknadOversikt";

export type SøknadOversiktType = {
  orkestratorSøknader: OrkestratorSoknad[];
  quizSøknader?: InnsendteSøknader[];
  aktivSøknadRedirectUrl: string | null;
};

export async function loader({
  request,
}: Route.LoaderArgs): Promise<Response | SøknadOversiktType> {
  const [quizSøknaderResponse, orkestratorSøknaderResponse] = await Promise.all([
    hentQuizSøknader(request),
    hentOrkestratorSøknader(request),
  ]);
  let quizSøknader = null;
  let orkestratorSøknader = null;
  let redirectUrl: string = "";

  if (!quizSøknaderResponse.ok) {
    const errorText = await quizSøknaderResponse.json();
    logger.error("Feil ved innhenting av quiz-søknader", { errorText });
  } else {
    quizSøknader = (await quizSøknaderResponse.json()) as QuizSøknader;

    if (quizSøknader.paabegynt != null) {
      redirectUrl = `${getEnv("DP_SOKNADSDIALOG_URL")}/${quizSøknader.paabegynt.soknadUuid}`;
    }
  }

  if (!orkestratorSøknaderResponse.ok) {
    const errorText = await orkestratorSøknaderResponse.json();
    logger.error("Feil ved innhenting av orkestrator-søknader", { errorText });
  } else {
    orkestratorSøknader = (await orkestratorSøknaderResponse.json()) as OrkestratorSoknad[];
    const aktiv = orkestratorSøknader.find((søknad) => søknad.status === "PÅBEGYNT");

    if (aktiv) {
      redirectUrl = `${getEnv("BASE_PATH")}/${aktiv.søknadId}/personalia`;
    }
  }

  if (redirectUrl === "") {
    return redirect("/arbeidssoker");
  }

  return {
    orkestratorSøknader: orkestratorSøknader ?? [],
    quizSøknader: quizSøknader?.innsendte ?? [],
    aktivSøknadRedirectUrl: redirectUrl,
  };
}

export default function BrukerdialogIndex() {
  const loaderData = useLoaderData<typeof loader>();

  return <SøknadOversikt søknader={loaderData}></SøknadOversikt>;
}
