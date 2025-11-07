import { delay, http, HttpResponse } from "msw";
import { mockAnnenPengestøtte } from "~/mocks/mock-data/mock-annen-pengestøtte";
import { mockArbeidsforhold } from "~/mocks/mock-data/mock-arbeidsforhold";
import { mockEgenNæring } from "~/mocks/mock-data/mock-egen-næring";
import { mockOppsummering } from "~/mocks/mock-data/mock-oppsummering";
import { mockProgress } from "~/mocks/mock-data/mock-progress";
import { mockTilleggsopplysninger } from "~/mocks/mock-data/mock-tilleggsopplysninger";
import { mockVerneplikt } from "~/mocks/mock-data/mock-verneplikt";
import { getEnv } from "~/utils/env.utils";
import { mockBarnetillegg } from "./mock-data/mock-barnetillegg";
import { mockBarnFraPdl } from "./mock-data/mock-barnFraPdl";
import { mockDinSituasjon } from "./mock-data/mock-din-situasjon";
import { mockMellomlagring } from "./mock-data/mock-mellomlagring";
import { mockPersonalia } from "./mock-data/mock-personalia";
import { mockPersonaliaFraOrkestrator } from "./mock-data/mock-personalia-fra-orkestrator";
import { mockReellArbeidssøker } from "./mock-data/mock-reell-arbeidssøker";
import { mockUtdanning } from "./mock-data/mock-utdanning";

export const handlers = [
  http.post(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`, () => {
    return HttpResponse.text("b1778783-3ec1-4cd1-8eae-b496c10a6122");
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/personalia`, () => {
    return HttpResponse.json(mockPersonaliaFraOrkestrator);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/barn`, () => {
    return HttpResponse.json(mockBarnFraPdl);
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/din-situasjon`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockDinSituasjon });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/personalia`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockPersonalia });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/arbeidsforhold`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockArbeidsforhold });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/annen-pengestotte`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockAnnenPengestøtte });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/egen-naring`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockEgenNæring });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/verneplikt`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockVerneplikt });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/utdanning`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockUtdanning });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/barnetillegg`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockBarnetillegg });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/tilleggsopplysninger`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockTilleggsopplysninger });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId/reell-arbeidssoker`, () => {
    return HttpResponse.json({ versjon: 1, seksjon: mockReellArbeidssøker });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/:soknadId/progress`, () => {
    return HttpResponse.json(mockProgress);
  }),
  http.post(`${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/:soknadId/:dokumentkravId`, async () => {
    await delay(1000);
    return HttpResponse.json(mockMellomlagring);
  }),
  http.delete(`${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/:filsti`, async () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/:soknadId`, () => {
    return HttpResponse.json(mockOppsummering);
  }),
];
