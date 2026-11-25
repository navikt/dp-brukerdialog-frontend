import { RouterContextProvider, type LoaderFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { loader } from "~/routes/api.dokumentasjonskrav.$soknadId.$dokumentkravId.vis-fil";
import { hentMellomlagringOboToken } from "../auth.utils.server";
import { getEnv } from "../env.utils";

vi.mock("~/models/hent-dokumentasjonskrav.server");
vi.mock("../auth.utils.server");
vi.mock("../env.utils");

describe("vis dokument", () => {
  const request = new Request("https://example.com/api/dokumentasjonskrav/soknad/krav/vis-fil");
  const args: LoaderFunctionArgs = {
    request,
    url: new URL(request.url),
    pattern: "/api/dokumentasjonskrav/:soknadId/:dokumentkravId/vis-fil",
    params: { soknadId: "soknad", dokumentkravId: "krav" },
    context: new RouterContextProvider(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getEnv).mockReturnValue("https://mellomlagring.example.com");
    vi.mocked(hentMellomlagringOboToken).mockResolvedValue("test-token");
  });

  it("returnerer PDF-en inline med filstien fra brukerens dokumentasjonskrav", async () => {
    vi.mocked(hentDokumentasjonskrav).mockResolvedValue(
      Response.json([JSON.stringify([{ id: "krav", bundle: { filsti: "lagret/dokument" } }])])
    );
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("pdf-innhold", {
        headers: { "Content-Disposition": "attachment" },
      })
    );

    try {
      const response = await loader(args);

      expect(hentDokumentasjonskrav).toHaveBeenCalledWith(request, "soknad");
      expect(hentMellomlagringOboToken).toHaveBeenCalledWith(request);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://mellomlagring.example.com/vedlegg/lagret/dokument",
        { headers: { Authorization: "Bearer test-token" } }
      );
      expect(response.headers.get("Content-Type")).toBe("application/pdf");
      expect(response.headers.get("Content-Disposition")).toBe('inline; filename="dokument.pdf"');
      expect(response.headers.get("Cache-Control")).toBe("no-store");
      expect(await response.text()).toBe("pdf-innhold");
    } finally {
      fetchMock.mockRestore();
    }
  });

  it.each([
    [],
    [{ id: "annet-krav", bundle: { filsti: "annet/dokument" } }],
    [{ id: "krav", bundle: null }],
  ])("avviser dokumenter uten tilgjengelig bundle på brukerens krav: %j", async (...krav) => {
    vi.mocked(hentDokumentasjonskrav).mockResolvedValue(Response.json([JSON.stringify(krav)]));

    await expect(loader(args)).rejects.toMatchObject({ status: 404 });
    expect(hentMellomlagringOboToken).not.toHaveBeenCalled();
  });

  it("stopper når tilgang til søknadens dokumentasjonskrav avvises", async () => {
    vi.mocked(hentDokumentasjonskrav).mockResolvedValue(new Response(null, { status: 403 }));

    await expect(loader(args)).rejects.toMatchObject({ status: 403 });
    expect(hentMellomlagringOboToken).not.toHaveBeenCalled();
  });

  it("viderefører feilstatus når dokumentet ikke kan hentes", async () => {
    vi.mocked(hentDokumentasjonskrav).mockResolvedValue(
      Response.json([JSON.stringify([{ id: "krav", bundle: { filsti: "lagret/dokument" } }])])
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 502 }));

    try {
      await expect(loader(args)).rejects.toMatchObject({ status: 502 });
    } finally {
      fetchMock.mockRestore();
    }
  });
});
