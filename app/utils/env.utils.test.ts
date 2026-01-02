import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getEnv } from "./env.utils";

describe("getEnv", () => {
  const originalProcessEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalProcessEnv };
  });

  afterEach(() => {
    process.env = originalProcessEnv;
  });

  it("skal returnere verdi fra process.env på server", () => {
    process.env.APP_ENV = "development";

    const result = getEnv("APP_ENV");

    expect(result).toBe("development");
  });

  it("skal returnere tom streng hvis verdi ikke finnes", () => {
    delete process.env.APP_ENV;

    const result = getEnv("APP_ENV");

    expect(result).toBe("");
  });

  it("skal returnere verdi for ulike env-variabler", () => {
    process.env.DP_SOKNAD_ORKESTRATOR_URL = "http://fake-dp-soknad-orkestrator-url";
    process.env.SANITY_DATASET = "development";

    expect(getEnv("DP_SOKNAD_ORKESTRATOR_URL")).toBe("http://fake-dp-soknad-orkestrator-url");
    expect(getEnv("SANITY_DATASET")).toBe("development");
  });

  it("skal returnere verdi fra window.env i browser", () => {
    // Mock window.env
    globalThis.window = {
      env: {
        APP_ENV: "development",
        USE_MSW: "false",
        NAIS_CLUSTER_NAME: "dev-gcp",
        IS_LOCALHOST: "false",
        DEKORATOR_ENV: "dev",
        SANITY_DATASET: "development",
        DP_SOKNAD_ORKESTRATOR_TOKEN: "token",
        DP_SOKNAD_ORKESTRATOR_URL: "http://fake-dp-soknad-orkestrator-url",
        DP_MELLOMLAGRING_TOKEN: "token",
        DP_MELLOMLAGRING_URL: "http://fake-dp-mellomlagring-url",
        FARO_URL: "http://fake-faro-url",
      },
    } as any;

    const result = getEnv("DP_SOKNAD_ORKESTRATOR_URL");

    expect(result).toBe("http://fake-dp-soknad-orkestrator-url");

    // Cleanup
    delete (globalThis as any).window;
  });
});
