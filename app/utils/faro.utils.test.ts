import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  getEnv: vi.fn(),
  getWebInstrumentations: vi.fn(),
  initializeFaro: vi.fn(),
}));

vi.mock("~/utils/env.utils", () => ({
  getEnv: mocks.getEnv,
}));

vi.mock("@grafana/faro-web-sdk", () => ({
  getWebInstrumentations: mocks.getWebInstrumentations,
  initializeFaro: mocks.initializeFaro,
}));

vi.mock("@grafana/faro-web-tracing", () => ({
  TracingInstrumentation: class {},
}));

async function hentInitFaro() {
  vi.resetModules();

  const { initFaro } = await import("./faro.utils");

  return initFaro;
}

describe("faro.utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();

    mocks.getEnv.mockImplementation((key: string) => {
      if (key === "IS_LOCALHOST") return "false";
      if (key === "FARO_URL") return "http://fake-faro-url";
      if (key === "DP_SOKNAD_ORKESTRATOR_URL") return "http://fake-api-url";

      return "";
    });

    mocks.getWebInstrumentations.mockReturnValue(["web-instrumentation"]);
    mocks.initializeFaro.mockReturnValue({ initialized: true });
  });

  describe("initFaro", () => {
    it("skal ikke initialisere Faro når document ikke finnes", async () => {
      const initFaro = await hentInitFaro();

      initFaro();

      expect(mocks.initializeFaro).not.toHaveBeenCalled();
    });

    it("skal ikke initialisere Faro på localhost", async () => {
      vi.stubGlobal("document", {});

      mocks.getEnv.mockImplementation((key: string) => {
        if (key === "IS_LOCALHOST") return "true";

        return "";
      });

      const initFaro = await hentInitFaro();

      initFaro();

      expect(mocks.initializeFaro).not.toHaveBeenCalled();
    });

    it("skal initialisere Faro én gang", async () => {
      vi.stubGlobal("document", {});

      const initFaro = await hentInitFaro();

      initFaro();
      initFaro();

      expect(mocks.getWebInstrumentations).toHaveBeenCalledWith({
        captureConsole: true,
      });

      expect(mocks.initializeFaro).toHaveBeenCalledTimes(1);
      expect(mocks.initializeFaro).toHaveBeenCalledWith(
        expect.objectContaining({
          url: "http://fake-faro-url",
          app: {
            name: "dp-brukerdialog-frontend",
          },
          sessionTracking: {
            enabled: true,
            persistent: true,
          },
          consoleInstrumentation: {
            consoleErrorAsLog: true,
            disabledLevels: [],
          },
        })
      );
    });
  });
});
