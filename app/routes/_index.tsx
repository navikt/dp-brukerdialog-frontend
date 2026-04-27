import { redirect } from "react-router";
import {
  hentOrkestratorSøknader,
  hentQuizSøknader,
  parseQuizResponse,
  parseOrkestratorResponse,
} from "~/models/hent-søknader";
import {
  InnsendteSøknader,
  OrkestratorSoknad,
  PåbegyntSøknadMedKilde,
} from "~/models/hent-søknader-for-ident";
import { Route } from "./+types/_index";
import { SøknadOversikt } from "~/seksjon/oversikt/SøknadOversikt";
import { getEnv } from "~/utils/env.utils";
import { hentDpSøknadOboToken, hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";

export type SøknadOversiktType = {
  søknader: OrkestratorSoknad[];
  quizSøknader?: InnsendteSøknader[];
  påbegyntSøknad: PåbegyntSøknadMedKilde | null;
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const soknadUuid = formData.get("soknadUuid") as string;
  const erQuizSøknad = formData.get("erQuizSøknad") === "true";

  if (erQuizSøknad) {
    const url = `${getEnv("DP_SOKNAD_URL")}/soknad/${soknadUuid}`;
    const onBehalfOfToken = await hentDpSøknadOboToken(request);
    const response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json", Authorization: `Bearer ${onBehalfOfToken}` },
    });

    if (!response.ok) {
      return { error: "Vi klarte ikke å slette din søknad. Vennligst prøv igjen." };
    }
  } else {
    const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadUuid}`;
    const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);
    const response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json", Authorization: `Bearer ${onBehalfOfToken}` },
    });

    if (!response.ok) {
      return { error: "Vi klarte ikke å slette din søknad. Vennligst prøv igjen." };
    }
  }

  return redirect("/arbeidssoker");
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<Response | SøknadOversiktType> {
  const [quizSøknaderResponse, orkestratorSøknaderResponse] = await Promise.all([
    hentQuizSøknader(request),
    hentOrkestratorSøknader(request),
  ]);

  const { søknader: quizSøknader, påbegyntSøknad: quizPåbegynt } =
    await parseQuizResponse(quizSøknaderResponse);

  const { søknader, påbegyntSøknad: orkestratorPåbegynt } = await parseOrkestratorResponse(
    orkestratorSøknaderResponse
  );

  const påbegyntSøknad = orkestratorPåbegynt ?? quizPåbegynt;

  if (påbegyntSøknad === null && søknader?.length === 0 && !quizSøknader?.innsendte?.length) {
    return redirect("/arbeidssoker");
  }

  return {
    søknader: søknader ?? [],
    quizSøknader: quizSøknader?.innsendte ?? [],
    påbegyntSøknad,
  };
}

export default function BrukerdialogIndex() {
  return <SøknadOversikt />;
}
