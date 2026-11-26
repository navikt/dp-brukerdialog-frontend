import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { FilOpplastingFeilType } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { getEnv } from "../env.utils";
import {
  hentFilFeilmelding,
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst,
  lastnedDokument,
  åpneDokument,
} from "../dokument.utils";

vi.mock("../env.utils", () => ({
  getEnv: vi.fn(),
}));

const mockedGetEnv = vi.mocked(getEnv);

describe("dokument.utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetEnv.mockReturnValue("/base-path");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe("hentMaksFilStørrelseMB", () => {
    it("skal returnere maks filstørrelse i MB", () => {
      const maksFilStørrelse = hentMaksFilStørrelseMB();

      expect(maksFilStørrelse).toBe(10);
    });
  });

  describe("hentTillatteFiltyperString", () => {
    it("skal returnere tillatte filtyper som kommaseparert string", () => {
      const tillatteFiltyper = hentTillatteFiltyperString();

      expect(tillatteFiltyper).toBe(".pdf,.jpg,.jpeg,.png");
    });
  });

  describe("hentTillatteFiltyperTekst", () => {
    it("skal returnere tillatte filtyper som lesbar tekst", () => {
      const tillatteFiltyper = hentTillatteFiltyperTekst();

      expect(tillatteFiltyper).toBe("PDF, JPG, JPEG eller PNG");
    });
  });

  describe("lastnedDokument", () => {
    it("skal logge feil dersom filsti mangler", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      await lastnedDokument(undefined, "Test dokument");

      expect(consoleErrorSpy).toHaveBeenCalledWith("Mangler filsti tilgjengelig for nedlasting");
    });

    it("skal logge feil dersom tittel mangler", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      await lastnedDokument("/filsti/test.pdf", undefined);

      expect(consoleErrorSpy).toHaveBeenCalledWith("Mangler tittel for nedlasting");
    });

    it("skal logge feil dersom nedlasting feiler", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
        })
      );

      await lastnedDokument("/filsti/test.pdf", "Test dokument");

      expect(consoleErrorSpy).toHaveBeenCalledWith("Noe gikk galt ved nedlasting av dokument");
    });

    it("skal laste ned dokument når request er ok", async () => {
      const blob = new Blob(["test"], { type: "application/pdf" });

      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        blob: vi.fn().mockResolvedValue(blob),
      });

      const createObjectURLMock = vi.fn().mockReturnValue("blob:test-url");
      const revokeObjectURLMock = vi.fn();

      const anchorMock = {
        href: "",
        download: "",
        click: vi.fn(),
      };

      const documentMock = {
        createElement: vi.fn().mockReturnValue(anchorMock),
        body: {
          appendChild: vi.fn(),
          removeChild: vi.fn(),
        },
      };

      vi.stubGlobal("fetch", fetchMock);

      vi.stubGlobal("window", {
        URL: {
          createObjectURL: createObjectURLMock,
          revokeObjectURL: revokeObjectURLMock,
        },
      });

      vi.stubGlobal("document", documentMock);

      await lastnedDokument("/filsti/test.pdf", "Test dokument");

      expect(mockedGetEnv).toHaveBeenCalledWith("BASE_PATH");

      expect(fetchMock).toHaveBeenCalledWith("/base-path/api/dokumentasjonskrav/lastned", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filsti: "/filsti/test.pdf" }),
      });

      expect(createObjectURLMock).toHaveBeenCalledWith(blob);
      expect(documentMock.createElement).toHaveBeenCalledWith("a");

      expect(anchorMock.href).toBe("blob:test-url");
      expect(anchorMock.download).toBe("Test dokument.pdf");
      expect(anchorMock.click).toHaveBeenCalled();

      expect(documentMock.body.appendChild).toHaveBeenCalledWith(anchorMock);
      expect(documentMock.body.removeChild).toHaveBeenCalledWith(anchorMock);

      expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:test-url");
    });
  });

  describe("åpneDokument", () => {
    it("skal logge feil dersom filsti mangler", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      await åpneDokument(undefined);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Mangler filsti tilgjengelig for åpning av dokument"
      );
    });

    it("skal åpne fanen før dokumentet hentes og vise PDF-en uten tvungen nedlasting", async () => {
      const blob = new Blob(["test"], { type: "application/pdf" });
      const dokumentFane = {
        opener: {},
        location: { replace: vi.fn() },
        close: vi.fn(),
      };
      const openMock = vi.fn().mockReturnValue(dokumentFane);
      const revokeObjectURLMock = vi.fn();
      const fetchMock = vi.fn().mockImplementation(async () => {
        expect(openMock).toHaveBeenCalledWith("about:blank", "_blank");
        expect(dokumentFane.opener).toBeNull();
        return { ok: true, blob: async () => blob };
      });

      vi.stubGlobal("fetch", fetchMock);
      vi.stubGlobal("window", {
        open: openMock,
        URL: {
          createObjectURL: vi.fn().mockReturnValue("blob:test-url"),
          revokeObjectURL: revokeObjectURLMock,
        },
      });

      await åpneDokument("/filsti/test.pdf");

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
        "/base-path/api/dokumentasjonskrav/lastned",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filsti: "/filsti/test.pdf" }),
        }
      );
      expect(dokumentFane.location.replace).toHaveBeenCalledWith("blob:test-url");
      expect(dokumentFane.close).not.toHaveBeenCalled();
      expect(revokeObjectURLMock).not.toHaveBeenCalled();
    });

    it("skal logge feil og ikke hente dokumentet når den nye fanen blokkeres", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);
      vi.stubGlobal("window", { open: vi.fn().mockReturnValue(null) });

      await åpneDokument("/filsti/test.pdf");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Kunne ikke åpne dokumentet i en ny fane. Tillat sprettoppvinduer og prøv igjen."
      );
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it.each(["http", "nettverk"])("skal lukke den nye fanen ved %s-feil", async (feiltype) => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const dokumentFane = { opener: {}, close: vi.fn() };
      const fetchMock = vi.fn();
      if (feiltype === "http") {
        fetchMock.mockResolvedValue({ ok: false });
      } else {
        fetchMock.mockRejectedValue(new Error("Nettverksfeil"));
      }
      vi.stubGlobal("fetch", fetchMock);
      vi.stubGlobal("window", { open: vi.fn().mockReturnValue(dokumentFane) });

      await åpneDokument("/filsti/test.pdf");

      expect(dokumentFane.close).toHaveBeenCalledOnce();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe("hentFilFeilmelding", () => {
    it("skal returnere feilmelding for for stor fil", () => {
      const feilmelding = hentFilFeilmelding(FilOpplastingFeilType.FIL_FOR_STOR);

      expect(feilmelding).toBe("Kunne ikke laste opp filen. Filstørrelsen overskrider 10 MB");
    });

    it("skal returnere feilmelding for ugyldig format", () => {
      const feilmelding = hentFilFeilmelding(FilOpplastingFeilType.UGYLDIG_FORMAT);

      expect(feilmelding).toBe("Kunne ikke laste opp filen. Ugyldig filformat");
    });

    it("skal returnere feilmelding for teknisk feil", () => {
      const feilmelding = hentFilFeilmelding(FilOpplastingFeilType.TEKNISK_FEIL);

      expect(feilmelding).toBe("Kunne ikke laste opp filen. Det oppstod en teknisk feil");
    });

    it("skal returnere feilmelding for duplikat fil", () => {
      const feilmelding = hentFilFeilmelding(FilOpplastingFeilType.DUPLIKAT_FIL);

      expect(feilmelding).toBe("Kunne ikke laste opp filen. Filen er duplikat");
    });

    it("skal returnere feilmelding for slettefeil", () => {
      const feilmelding = hentFilFeilmelding(FilOpplastingFeilType.SLETTING_FEIL);

      expect(feilmelding).toBe("Kunne ikke slette filen. Det oppstod en feil");
    });

    it("skal returnere feilmelding for ukjent feil", () => {
      const feilmelding = hentFilFeilmelding(FilOpplastingFeilType.UKJENT_FEIL);

      expect(feilmelding).toBe("Kunne ikke laste opp filen. Det oppstod en ukjent feil");
    });

    it("skal returnere fallback-feilmelding for ukjent feiltype", () => {
      const feilmelding = hentFilFeilmelding("ANNEN_FEIL" as FilOpplastingFeilType);

      expect(feilmelding).toBe("Kunne ikke laste opp filen. Det oppstod en ukjent feil");
    });
  });
});
