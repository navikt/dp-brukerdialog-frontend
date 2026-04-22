import { redirect, useLoaderData } from "react-router";
import { hentOrkestratorSøknader, hentQuizSøknader } from "~/models/hent-søknader";
import {
  InnsendteSøknader,
  OrkestratorSoknad,
  QuizSøknader,
  PåbegyntSøknadMedKilde,
} from "~/models/hent-søknader-for-ident";
import { logger } from "~/utils/logger.utils";
import { Route } from "./+types/_index";
import { SøknadOversikt } from "~/seksjon/oversikt/SøknadOversikt";

export type SøknadOversiktType = {
  orkestratorSøknader: OrkestratorSoknad[];
  quizSøknader?: InnsendteSøknader[];
  påbegyntSøknad: PåbegyntSøknadMedKilde | null;
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
  let påbegyntSøknad: PåbegyntSøknadMedKilde | null = null;

  if (!quizSøknaderResponse.ok) {
    const errorText = await quizSøknaderResponse.json();
    logger.error("Feil ved innhenting av quiz-søknader", { errorText });
  } else {
    quizSøknader = (await quizSøknaderResponse.json()) as QuizSøknader;

    if (quizSøknader.paabegynt != null) {
      påbegyntSøknad = {
        ...quizSøknader.paabegynt,
        erOrkestratorSøknad: false,
      };
    }
  }

  if (!orkestratorSøknaderResponse.ok) {
    const errorText = await orkestratorSøknaderResponse.json();
    logger.error("Feil ved innhenting av orkestrator-søknader", { errorText });
  } else {
    orkestratorSøknader = (await orkestratorSøknaderResponse.json()) as OrkestratorSoknad[];
    const aktiv = orkestratorSøknader.find((søknad) => søknad.status === "PÅBEGYNT");
    if (aktiv) {
      påbegyntSøknad = {
        soknadUuid: aktiv.søknadId,
        opprettet: "",
        sistEndretAvBruker: aktiv.oppdatertTidspunkt,
        erOrkestratorSøknad: true,
      };
    }
  }

  if (påbegyntSøknad === null) {
    return redirect("/opprett-soknad");
  }

  return {
    orkestratorSøknader: orkestratorSøknader ?? [],
    quizSøknader: quizSøknader?.innsendte ?? [],
    påbegyntSøknad: påbegyntSøknad,
  };
}

export default function BrukerdialogIndex() {
  const loaderData = useLoaderData<typeof loader>();
  return <SøknadOversikt søknader={loaderData}></SøknadOversikt>;
}
