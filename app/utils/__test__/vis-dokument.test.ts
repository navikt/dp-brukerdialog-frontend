import { RouterContextProvider, type LoaderFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loader } from "~/routes/api.dokumentasjonskrav.vis-fil";
import { hentMellomlagringOboToken } from "../auth.utils.server";
import { getEnv } from "../env.utils";

vi.mock("../auth.utils.server");
vi.mock("../env.utils");

describe("vis dokument", () => {
  const request = new Request(
    `https://example.com/api/dokumentasjonskrav/vis-fil?${new URLSearchParams({
      filsti: "lagret/dokument",
    })}`
  );
  const args: LoaderFunctionArgs = {
    request,
    url: new URL(request.url),
    pattern: "/api/dokumentasjonskrav/vis-fil",
    params: {},
    context: new RouterContextProvider(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getEnv).mockReturnValue("https://mellomlagring.example.com");
    vi.mocked(hentMellomlagringOboToken).mockResolvedValue("test-token");
  });

  it("returnerer PDF-en inline med filstien fra query-parameteren uten ID-er", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("pdf-innhold", {
        headers: { "Content-Disposition": "attachment" },
      })
    );

    try {
      const response = await loader(args);

      expect(hentMellomlagringOboToken).toHaveBeenCalledWith(request);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://mellomlagring.example.com/vedlegg/lagret/dokument",
        { headers: { Authorization: "Bearer test-token" } }
      );
      expect(response.headers.get("Content-Type")).toBe("application/pdf");
      expect(response.headers.get("Content-Disposition")).toBe('inline; filename="dokument.pdf"');
      expect(response.headers.get("Cache-Control")).toBe("no-store");
      expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
      expect(await response.text()).toBe("pdf-innhold");
    } finally {
      fetchMock.mockRestore();
    }
  });

  it.each([undefined, "", "   "])("avviser manglende eller tom filsti: %j", async (filsti) => {
    const url = new URL("https://example.com/api/dokumentasjonskrav/vis-fil");
    if (filsti !== undefined) {
      url.searchParams.set("filsti", filsti);
    }

    await expect(loader({ ...args, request: new Request(url), url })).rejects.toMatchObject({
      status: 400,
    });
    expect(hentMellomlagringOboToken).not.toHaveBeenCalled();
  });

  it.each([403, 404, 502])(
    "viderefører feilstatus %i når dokumentet ikke kan hentes",
    async (status) => {
      const fetchMock = vi
        .spyOn(globalThis, "fetch")
        .mockResolvedValue(new Response(null, { status }));

      try {
        await expect(loader(args)).rejects.toMatchObject({ status });
      } finally {
        fetchMock.mockRestore();
      }
    }
  );
});
