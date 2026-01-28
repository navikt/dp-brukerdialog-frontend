import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@navikt/oasis");
vi.mock("./env.utils");
vi.mock("./logger.utils", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

import * as oasis from "@navikt/oasis";
import {
  hentMellomlagringOboToken,
  hentOnBehalfOfToken,
  hentSoknadOrkestratorOboToken,
} from "./auth.utils.server";
import { getEnv } from "./env.utils";
import * as loggerUtils from "./logger.utils";

describe("auth.utils.server", () => {
  const mockRequest = new Request("http://localhost:3000");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("hentSoknadOrkestratorOboToken", () => {
    it("skal returnere localhost token når IS_LOCALHOST er true", async () => {
      vi.mocked(getEnv).mockImplementation((key) => {
        if (key === "IS_LOCALHOST") return "true";
        if (key === "DP_SOKNAD_ORKESTRATOR_TOKEN") return "mock-localhost-token";
        if (key === "USE_MSW") return "false";
        return "";
      });
      vi.mocked(oasis.expiresIn).mockReturnValue(3600);

      const token = await hentSoknadOrkestratorOboToken(mockRequest);

      expect(token).toBe("mock-localhost-token");
      expect(getEnv).toHaveBeenCalledWith("IS_LOCALHOST");
      expect(getEnv).toHaveBeenCalledWith("DP_SOKNAD_ORKESTRATOR_TOKEN");
    });

    it("skal logge error når localhost token er utløpt og MSW er på false", async () => {
      vi.mocked(getEnv).mockImplementation((key) => {
        if (key === "IS_LOCALHOST") return "true";
        if (key === "DP_SOKNAD_ORKESTRATOR_TOKEN") return "expired-token";
        if (key === "USE_MSW") return "false";
        return "";
      });
      vi.mocked(oasis.expiresIn).mockReturnValue(-1);

      await hentSoknadOrkestratorOboToken(mockRequest);

      expect(loggerUtils.logger.error).toHaveBeenCalledWith(
        "Lokalt token utløpt! Oppdatere token på nytt!"
      );
    });

    it("skal ikke logge error når localhost token er utløpt men MSW er på true", async () => {
      vi.mocked(getEnv).mockImplementation((key) => {
        if (key === "IS_LOCALHOST") return "true";
        if (key === "DP_SOKNAD_ORKESTRATOR_TOKEN") return "expired-token";
        if (key === "USE_MSW") return "true";
        return "";
      });
      vi.mocked(oasis.expiresIn).mockReturnValue(-1);

      await hentSoknadOrkestratorOboToken(mockRequest);

      expect(loggerUtils.logger.error).not.toHaveBeenCalled();
    });

    it("skal returnere tom streng når localhost token mangler", async () => {
      vi.mocked(getEnv).mockImplementation((key) => {
        if (key === "IS_LOCALHOST") return "true";
        if (key === "DP_SOKNAD_ORKESTRATOR_TOKEN") return "";
        if (key === "USE_MSW") return "false";
        return "";
      });

      const token = await hentSoknadOrkestratorOboToken(mockRequest);

      expect(token).toBe("");
    });

    it("skal hent søknad orkestrator dev OBO token", async () => {
      vi.mocked(getEnv).mockImplementation((key) => {
        if (key === "IS_LOCALHOST") return "false";
        if (key === "NAIS_CLUSTER_NAME") return "dev-gcp";
        return "";
      });
      vi.mocked(oasis.getToken).mockReturnValue("user-token");
      vi.mocked(oasis.validateToken).mockResolvedValue({ ok: true, payload: {} as any });
      vi.mocked(oasis.requestOboToken).mockResolvedValue({
        ok: true,
        token: "obo-token",
      });

      const token = await hentSoknadOrkestratorOboToken(mockRequest);

      expect(token).toBe("obo-token");
      expect(oasis.requestOboToken).toHaveBeenCalledWith(
        "user-token",
        "dev-gcp:teamdagpenger:dp-soknad-orkestrator"
      );
    });
  });

  describe("hentMellomlagringOboToken", () => {
    it("skal returnere localhost token når IS_LOCALHOST er true", async () => {
      vi.mocked(getEnv).mockImplementation((key) => {
        if (key === "IS_LOCALHOST") return "true";
        if (key === "DP_MELLOMLAGRING_TOKEN") return "mock-mellomlagring-token";
        if (key === "USE_MSW") return "false";
        return "";
      });
      vi.mocked(oasis.expiresIn).mockReturnValue(3600);

      const token = await hentMellomlagringOboToken(mockRequest);

      expect(token).toBe("mock-mellomlagring-token");
      expect(getEnv).toHaveBeenCalledWith("DP_MELLOMLAGRING_TOKEN");
    });

    it("skal hent dev mellomlagring OBO token", async () => {
      vi.mocked(getEnv).mockImplementation((key) => {
        if (key === "IS_LOCALHOST") return "false";
        if (key === "NAIS_CLUSTER_NAME") return "dev-gcp";
        return "";
      });
      vi.mocked(oasis.getToken).mockReturnValue("user-token");
      vi.mocked(oasis.validateToken).mockResolvedValue({ ok: true, payload: {} as any });
      vi.mocked(oasis.requestOboToken).mockResolvedValue({
        ok: true,
        token: "mellomlagring-obo-token",
      });

      const token = await hentMellomlagringOboToken(mockRequest);

      expect(token).toBe("mellomlagring-obo-token");
      expect(oasis.requestOboToken).toHaveBeenCalledWith(
        "user-token",
        "dev-gcp:teamdagpenger:dp-mellomlagring"
      );
    });
  });

  describe("hentOnBehalfOfToken", () => {
    it("skal returnere OBO token ved vellykket validering", async () => {
      vi.mocked(oasis.getToken).mockReturnValue("user-token");
      vi.mocked(oasis.validateToken).mockResolvedValue({ ok: true, payload: {} as any });
      vi.mocked(oasis.requestOboToken).mockResolvedValue({
        ok: true,
        token: "obo-token",
      });

      const token = await hentOnBehalfOfToken(mockRequest, "test-audience");

      expect(token).toBe("obo-token");
      expect(oasis.getToken).toHaveBeenCalledWith(mockRequest);
      expect(oasis.validateToken).toHaveBeenCalledWith("user-token");
      expect(oasis.requestOboToken).toHaveBeenCalledWith("user-token", "test-audience");
    });

    it("skal kaste error når token mangler", async () => {
      vi.mocked(oasis.getToken).mockReturnValue(null);

      await expect(hentOnBehalfOfToken(mockRequest, "test-audience")).rejects.toThrow(
        "Mangler token"
      );

      expect(loggerUtils.logger.error).toHaveBeenCalledWith("Mangler token");
    });

    it("skal kaste 401 Response når token validering feiler", async () => {
      vi.mocked(oasis.getToken).mockReturnValue("invalid-token");
      vi.mocked(oasis.validateToken).mockResolvedValue({
        ok: false,
        error: new Error("Invalid token"),
        errorType: "JWTExpired" as any,
      });

      await expect(hentOnBehalfOfToken(mockRequest, "test-audience")).rejects.toThrowError(
        Response
      );

      expect(loggerUtils.logger.error).toHaveBeenCalledWith(expect.stringContaining("Uautorisert"));
    });

    it("skal kaste 500 Response når OBO token request feiler", async () => {
      vi.mocked(oasis.getToken).mockReturnValue("user-token");
      vi.mocked(oasis.validateToken).mockResolvedValue({ ok: true, payload: {} as any });
      vi.mocked(oasis.requestOboToken).mockResolvedValue({
        ok: false,
        error: new Error("OBO request failed"),
      });

      await expect(hentOnBehalfOfToken(mockRequest, "test-audience")).rejects.toThrowError(
        Response
      );

      expect(loggerUtils.logger.error).toHaveBeenCalledWith(
        expect.stringContaining("Klarte ikke å hente OBO token")
      );
    });
  });
});
