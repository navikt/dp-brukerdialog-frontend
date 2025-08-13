import { http, HttpResponse } from "msw";
import { getEnv } from "~/utils/env.utils";
import { personalia } from "./data/personalia";
import { bostedsland } from "./data/bostedsland";

export const handlers = [
  http.post(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`, () => {
    return HttpResponse.text("b1778783-3ec1-4cd1-8eae-b496c10a6122");
  }),
  http.put(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/din-situasjon`, () => {
    return HttpResponse.json({
      status: 201,
      message: "Seksjon opprettet",
    });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/din-situasjon`, () => {
    return HttpResponse.json({
      status: 201,
      message: "Seksjon opprettet",
    });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/bostedsland`, () => {
    return HttpResponse.json(bostedsland);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/personalia`, () => {
    return HttpResponse.json(personalia);
  }),
];
