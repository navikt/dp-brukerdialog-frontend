import { formatISO, subDays } from "date-fns";
import { hentDpSøknadOboToken } from "~/utils/auth.utils.server";

export async function hentQuizSøknader(request: Request) {
  const fromDate = subDays(Date.now(), 30);
  const formattedDate = formatISO(fromDate, { representation: "date" });

  const url = `${process.env.API_BASE_URL}/soknad/mine-soknader?fom=${formattedDate}`;
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
