import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mocks = vi.hoisted(() => ({
  getEnv: vi.fn(),
  ecsFormat: vi.fn(),
  pino: vi.fn(),
  pinoLogger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

vi.mock("~/utils/env.utils", () => ({
  getEnv: mocks.getEnv,
}));

vi.mock("@elastic/ecs-pino-format", () => ({
  ecsFormat: mocks.ecsFormat,
}));

vi.mock("pino", () => ({
  pino: mocks.pino,
}));

async function hentLogger() {
  vi.resetModules();

  const { logger } = await import("./logger.utils");

  return logger;
}

describe("logger.utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();

    mocks.getEnv.mockReturnValue("false");
    mocks.ecsFormat.mockReturnValue({ ecs: true });
    mocks.pino.mockReturnValue(mocks.pinoLogger);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe("devConfig", () => {
    it("skal bruke pino-pretty når IS_LOCALHOST er true", async () => {
      mocks.getEnv.mockReturnValue("true");

      await hentLogger();

      expect(mocks.pino).toHaveBeenCalledWith({
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      });
    });
  });

  describe("prodConfig", () => {
    it("skal bruke ecs-format når IS_LOCALHOST ikke er true", async () => {
      await hentLogger();

      const pinoConfig = mocks.pino.mock.calls[0][0] as any;

      expect(mocks.ecsFormat).toHaveBeenCalled();
      expect(pinoConfig).toMatchObject({
        ecs: true,
        timestamp: false,
      });
      expect(pinoConfig.formatters.level("info")).toEqual({ level: "info" });
    });
  });

  describe("logger", () => {
    it("skal bruke pino på server", async () => {
      vi.stubGlobal("document", undefined);

      const logger = await hentLogger();

      logger.info("info", "melding");
      logger.error("error", "feil");
      logger.warn("warn", "advarsel");

      expect(mocks.pinoLogger.info).toHaveBeenCalledWith("info", "melding");
      expect(mocks.pinoLogger.error).toHaveBeenCalledWith("error", "feil");
      expect(mocks.pinoLogger.warn).toHaveBeenCalledWith("warn", "advarsel");
    });

    it("skal bruke console i browser", async () => {
      vi.stubGlobal("document", {});

      const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const logger = await hentLogger();

      logger.info("info");
      logger.error("error");
      logger.warn("warn");

      expect(consoleLogSpy).toHaveBeenCalledWith("info");
      expect(consoleErrorSpy).toHaveBeenCalledWith("error");
      expect(consoleWarnSpy).toHaveBeenCalledWith("warn");

      expect(mocks.pinoLogger.info).not.toHaveBeenCalled();
      expect(mocks.pinoLogger.error).not.toHaveBeenCalled();
      expect(mocks.pinoLogger.warn).not.toHaveBeenCalled();
    });
  });
});
