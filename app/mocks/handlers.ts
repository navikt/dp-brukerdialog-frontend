import { delay, http, HttpResponse } from "msw";
import { getEnv } from "~/utils/env.utils";
import { mockBostedsland } from "./mock-data/mock-bostedsland";
import { mockDinSituasjon } from "./mock-data/mock-din-situasjon";
import { mockPersonalia } from "./mock-data/mock-personalia";
import { mockUtdanning } from "./mock-data/mock-utdanning";
import { mockVerneplikt } from "~/mocks/mock-data/mock-verneplikt";
import { mockBarnetillegg } from "./mock-data/mock-barnetillegg";
import { mockBarnFraPdl } from "./mock-data/mock-barnFraPdl";
import { mockEngenNæring } from "~/mocks/mock-data/mock-egen-næring";
import { mockAnnenPengestøtte } from "~/mocks/mock-data/mock-annen-pengestøtte";
import { mockProgress } from "~/mocks/mock-data/mock-progress";
import { mockMellomlagring } from "./mock-data/mock-mellomlagring";
import { mockOppsummering } from "~/mocks/mock-data/mock-oppsummering";
import { mockArbeidsforhold } from "~/mocks/mock-data/mock-arbeidsforhold";

let antallOpplastetDokument = 0;

export const handlers = [
  http.post(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`, () => {
    return HttpResponse.text("b1778783-3ec1-4cd1-8eae-b496c10a6122");
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/personalia`, () => {
    return HttpResponse.json(mockPersonalia);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/barn`, () => {
    return HttpResponse.json(mockBarnFraPdl);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/din-situasjon`, () => {
    return HttpResponse.json({ versjon: 1, skjema: mockDinSituasjon });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/arbeidsforhold`, () => {
    return HttpResponse.json(mockArbeidsforhold);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/bostedsland`, () => {
    return HttpResponse.json({ versjon: 1, skjema: mockBostedsland });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/utdanning`, () => {
    return HttpResponse.json(mockUtdanning);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/verneplikt`, () => {
    return HttpResponse.json(mockVerneplikt);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/barnetillegg`, () => {
    return HttpResponse.json(mockBarnetillegg);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/egen-naring`, () => {
    return HttpResponse.json(mockEngenNæring);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/annen-pengestotte`, () => {
    return HttpResponse.json(mockAnnenPengestøtte);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/:soknadId/progress`, () => {
    return HttpResponse.json(mockProgress);
  }),
  http.post(`${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/:soknadId/:dokumentkravId`, async () => {
    await delay(1000);
    return HttpResponse.json(mockMellomlagring);

    // antallOpplastetDokument += 1;
    // if (antallOpplastetDokument < 4) {
    //   // Første 3 kall: suksess
    //   return HttpResponse.json(mockMellomlagring);
    // } else {
    //   // 4. kall: feil
    //   return new HttpResponse("Feil ved opplasting", {
    //     status: 500,
    //     statusText: "Feil ved opplasting",
    //   });
    // }
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId`, () => {
    return HttpResponse.json(mockOppsummering);
  }),
];
