import { http, HttpResponse } from "msw";
import { getEnv } from "~/utils/env.utils";
import { mockBostedsland } from "./mock-data/mock-bostedsland";
import { mockDinSituasjon } from "./mock-data/mock-din-situasjon";
import { mockPersonalia } from "./mock-data/mock-personalia";
import { mockUtdanning } from "./mock-data/mock-utdanning";
import { mockVerneplikt } from "~/mocks/mock-data/mock-verneplikt";

export const handlers = [
  http.post(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`, () => {
    return HttpResponse.text("b1778783-3ec1-4cd1-8eae-b496c10a6122");
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/personalia`, () => {
    return HttpResponse.json(mockPersonalia);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/din-situasjon`, () => {
    // return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(mockDinSituasjon);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/bostedsland`, () => {
    return HttpResponse.json(mockBostedsland);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/utdanning`, () => {
    return HttpResponse.json(mockUtdanning);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/verneplikt`, () => {
    return HttpResponse.json(mockVerneplikt);
  }),
];
