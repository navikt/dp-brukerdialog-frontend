import { beforeEach, describe, expect, it, vi } from "vitest";
import type { LoaderFunctionArgs } from "react-router";
import { hentSøknadFremgangInfo } from "~/models/hent-søknad-fremgrang-info.server";
import { hentSøknadSistOppdatert } from "~/models/hent-søknad-sist-oppdatert";
import { hentOrkestratorSøknader } from "~/models/hent-søknader";
import { loader } from "~/routes/$soknadId";

vi.mock("~/models/hent-søknad-fremgrang-info.server", () => ({
  hentSøknadFremgangInfo: vi.fn(),
}));

vi.mock("~/models/hent-søknad-sist-oppdatert", () => ({
  hentSøknadSistOppdatert: vi.fn(),
}));

vi.mock("~/models/hent-søknader", () => ({
  hentOrkestratorSøknader: vi.fn(),
}));

const gyldigSøknadId = "550e8400-e29b-41d4-a716-446655440000";
const annetSøknadId = "550e8400-e29b-41d4-a716-446655440001";

function lagJsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function lagLoaderArgs(path: string): LoaderFunctionArgs {
  return {
    request: new Request(`http://localhost${path}`),
    params: { soknadId: gyldigSøknadId },
    context: {},
  } as unknown as LoaderFunctionArgs;
}

describe("loader for $soknadId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("`skal sende bruker til oversikt når søknaden ikke finnes`", async () => {
    vi.mocked(hentSøknadFremgangInfo).mockResolvedValue(new Response(null, { status: 404 }));
    vi.mocked(hentSøknadSistOppdatert).mockResolvedValue(new Response(null, { status: 404 }));
    vi.mocked(hentOrkestratorSøknader).mockResolvedValue(
      lagJsonResponse([{ søknadId: annetSøknadId, status: "PÅBEGYNT", tittel: "Søknad" }])
    );

    const response = await loader(lagLoaderArgs(`/${gyldigSøknadId}/personalia`));

    if (!(response instanceof Response)) {
      throw new Error("Forventet redirect-response, men fikk loaderdata");
    }

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/");
  });

  it("`skal ikke sende bruker til oversikt når fremgang finnes`", async () => {
    vi.mocked(hentSøknadFremgangInfo).mockResolvedValue(lagJsonResponse({ seksjoner: [] }));
    vi.mocked(hentSøknadSistOppdatert).mockResolvedValue(new Response(null, { status: 404 }));
    vi.mocked(hentOrkestratorSøknader).mockResolvedValue(
      lagJsonResponse([{ søknadId: annetSøknadId, status: "PÅBEGYNT", tittel: "Søknad" }])
    );

    const response = await loader(lagLoaderArgs(`/${gyldigSøknadId}/personalia`));

    expect(response).not.toBeInstanceOf(Response);

    if (response instanceof Response) {
      throw new Error("Forventet loaderdata, men fikk redirect");
    }

    expect(response.søknadId).toBe(gyldigSøknadId);
  });
});
