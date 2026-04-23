import { getEnv } from "~/utils/env.utils";
import { hentDpSøknadOboToken, hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { formatISO, subDays } from "date-fns";

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
