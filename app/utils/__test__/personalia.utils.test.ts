import { describe, expect, it } from "vitest";
import { formaterNavn, hentOgFormatterNavn } from "../personalia.utils";

describe("personalia.utils", () => {
  describe("formaterNavn", () => {
    it("skal formatere navn med stor forbokstav og små resten", () => {
      expect(formaterNavn("OLA")).toBe("Ola");
    });
  });

  describe("hentOgFormatterNavn", () => {
    it("skal formatere og sette sammen fornavn, mellomnavn og etternavn", () => {
      const resultat = hentOgFormatterNavn({
        fornavn: "OLA",
        mellomnavn: "KARI",
        etternavn: "NORDMANN",
      });

      expect(resultat).toBe("Ola Kari Nordmann");
    });

    it("skal hoppe over tomt mellomnavn", () => {
      const resultat = hentOgFormatterNavn({
        fornavn: "OLA",
        mellomnavn: "",
        etternavn: "NORDMANN",
      });

      expect(resultat).toBe("Ola Nordmann");
    });

    it("skal returnere tom streng når person mangler", () => {
      expect(hentOgFormatterNavn(undefined)).toBe("");
      expect(hentOgFormatterNavn(null)).toBe("");
    });
  });
});
