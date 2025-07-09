import { http, HttpResponse } from "msw";
import { getEnv } from "~/utils/env.utils";

export const handlers = [
  http.post(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`, () => {
    return HttpResponse.text("b1778783-3ec1-4cd1-8eae-b496c10a6122");
  }),
  http.put(
    `${getEnv(
      "DP_SOKNAD_ORKESTRATOR_URL"
    )}/seksjon/b1778783-3ec1-4cd1-8eae-b496c10a6122/din-situasjon`,
    () => {
      return HttpResponse.json({
        status: 201,
        message: "Seksjon opprettet",
      });
    }
  ),
];
