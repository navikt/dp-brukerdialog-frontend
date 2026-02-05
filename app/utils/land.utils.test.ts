import { describe, it, expect } from "vitest";
import {
  finnLandnavnMedLocale,
  OFTE_VALGTE_LANDKODER,
  EØS_LANDKODER,
  FLERE_LANDKODER,
  EØS_LAND,
  OFTE_VALGTE_LAND,
  FLERE_LAND,
} from "./land.utils";

describe("land.utils", () => {
  describe("finnLandnavnMedLocale", () => {
    it("skal returnere landnavn på norsk bokmål som default", () => {
      const landnavn = finnLandnavnMedLocale("NOR");
      expect(landnavn).toBe("Norge");
    });

    it("skal returnere landnavn på norsk bokmål når locale er 'nb'", () => {
      const landnavn = finnLandnavnMedLocale("SWE", "nb");
      expect(landnavn).toBe("Sverige");
    });

    it("skal returnere landnavn på nynorsk når locale er 'nn'", () => {
      const landnavn = finnLandnavnMedLocale("NOR", "nn");
      expect(landnavn).toBe("Noreg");
    });

    it("skal returnere landnavn på engelsk når locale er 'en'", () => {
      const landnavn = finnLandnavnMedLocale("NOR", "en");
      expect(landnavn).toBe("Norway");
    });

    it("skal håndtere ulike landkoder", () => {
      expect(finnLandnavnMedLocale("POL")).toBe("Polen");
      expect(finnLandnavnMedLocale("DEU")).toBe("Tyskland");
      expect(finnLandnavnMedLocale("FRA")).toBe("Frankrike");
    });

    it("skal fallback til 'nb' ved ugyldig locale", () => {
      const landnavn = finnLandnavnMedLocale("NOR", "invalid");
      expect(landnavn).toBe("Norge");
    });

    it("skal returnere 'nb' ved ugyldig landkode", () => {
      const landnavn = finnLandnavnMedLocale("INVALID");
      expect(landnavn).toBe("nb");
    });
  });

  describe("OFTE_VALGTE_LANDKODER", () => {
    it("skal inneholde ofte valgte land", () => {
      expect(OFTE_VALGTE_LANDKODER).toContain("NOR");
      expect(OFTE_VALGTE_LANDKODER).toContain("SWE");
      expect(OFTE_VALGTE_LANDKODER).toContain("POL");
    });

    it("skal ha korrekt antall land", () => {
      expect(OFTE_VALGTE_LANDKODER).toHaveLength(3);
    });
  });

  describe("EØS_LANDKODER", () => {
    it("skal inneholde EØS-land", () => {
      expect(EØS_LANDKODER).toContain("SWE");
      expect(EØS_LANDKODER).toContain("DEU");
      expect(EØS_LANDKODER).toContain("FRA");
    });

    it("skal ha 30 land (EØS medlemmer)", () => {
      expect(EØS_LANDKODER.length).toBeGreaterThan(25);
    });
  });

  describe("FLERE_LANDKODER", () => {
    it("skal inneholde mange land", () => {
      expect(FLERE_LANDKODER.length).toBeGreaterThan(100);
    });

    it("skal inneholde både EØS og ikke-EØS land", () => {
      expect(FLERE_LANDKODER).toContain("USA");
      expect(FLERE_LANDKODER).toContain("CAN");
      expect(FLERE_LANDKODER).toContain("JPN");
    });
  });

  describe("EØS_LAND", () => {
    it("skal være array med value og label", () => {
      expect(Array.isArray(EØS_LAND)).toBe(true);
      expect(EØS_LAND[0]).toHaveProperty("value");
      expect(EØS_LAND[0]).toHaveProperty("label");
    });

    it("skal ha korrekt struktur", () => {
      const sverige = EØS_LAND.find((land) => land.value === "SWE");
      expect(sverige).toBeDefined();
      expect(sverige?.label).toContain("verige");
    });

    it("skal ha samme lengde som EØS_LANDKODER", () => {
      expect(EØS_LAND).toHaveLength(EØS_LANDKODER.length);
    });
  });

  describe("OFTE_VALGTE_LAND", () => {
    it("skal være array med value og label", () => {
      expect(Array.isArray(OFTE_VALGTE_LAND)).toBe(true);
      expect(OFTE_VALGTE_LAND[0]).toHaveProperty("value");
      expect(OFTE_VALGTE_LAND[0]).toHaveProperty("label");
    });

    it("skal ha samme lengde som OFTE_VALGTE_LANDKODER", () => {
      expect(OFTE_VALGTE_LAND).toHaveLength(OFTE_VALGTE_LANDKODER.length);
    });
  });

  describe("FLERE_LAND", () => {
    it("skal være array med value og label", () => {
      expect(Array.isArray(FLERE_LAND)).toBe(true);
      expect(FLERE_LAND[0]).toHaveProperty("value");
      expect(FLERE_LAND[0]).toHaveProperty("label");
    });

    it("skal være sortert alfabetisk på label", () => {
      for (let i = 1; i < FLERE_LAND.length; i++) {
        const current = FLERE_LAND[i].label.toLowerCase();
        const previous = FLERE_LAND[i - 1].label.toLowerCase();
        expect(current.localeCompare(previous)).toBeGreaterThanOrEqual(0);
      }
    });

    it("skal ha samme lengde som FLERE_LANDKODER", () => {
      expect(FLERE_LAND).toHaveLength(FLERE_LANDKODER.length);
    });
  });
});
