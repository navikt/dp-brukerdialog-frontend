import { describe, it, expect } from "vitest";
import type { KomponentType } from "~/components/Komponent.types";
import { erInformasjonsFelt } from "./oppsummering.utils";

describe("oppsummering.utils", () => {
  describe("erInformasjonsFelt", () => {
    it("skal returnere true for informasjonskort", () => {
      const spørsmål = {
        id: "info1",
        type: "informasjonskort",
        variant: "informasjon",
      } satisfies KomponentType;

      expect(erInformasjonsFelt(spørsmål)).toBe(true);
    });

    it("skal returnere true for lesMer", () => {
      const spørsmål = {
        id: "lesMer1",
        type: "lesMer",
      } satisfies KomponentType;

      expect(erInformasjonsFelt(spørsmål)).toBe(true);
    });

    it("skal returnere true for dokumentasjonskravindikator", () => {
      const spørsmål = {
        id: "dokumentasjon1",
        type: "dokumentasjonskravindikator",
      } satisfies KomponentType;

      expect(erInformasjonsFelt(spørsmål)).toBe(true);
    });

    it("skal returnere true for forklarendeTekst", () => {
      const spørsmål = {
        id: "forklaring1",
        type: "forklarendeTekst",
      } satisfies KomponentType;

      expect(erInformasjonsFelt(spørsmål)).toBe(true);
    });

    it("skal returnere false for spørsmål", () => {
      const spørsmål = {
        id: "spm1",
        type: "kortTekst",
        label: "Hva heter du?",
      } satisfies KomponentType;

      expect(erInformasjonsFelt(spørsmål)).toBe(false);
    });

    it("skal returnere false for headingTekst", () => {
      const spørsmål = {
        id: "heading1",
        type: "headingTekst",
        størrelse: "medium",
        nivå: "2",
      } satisfies KomponentType;

      expect(erInformasjonsFelt(spørsmål)).toBe(false);
    });
  });
});
