import { getEnv } from "~/utils/env.utils";

export async function opprettSoknad() {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
