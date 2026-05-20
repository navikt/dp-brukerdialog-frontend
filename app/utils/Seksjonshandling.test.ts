import { describe, it, expect } from "vitest";
import { Seksjonshandling, seksjonshandlingSchema } from "./Seksjonshandling";

describe("Seksjonshandling", () => {
  describe("Seksjonshandling enum", () => {
    it("skal ha riktige verdier", () => {
      expect(Seksjonshandling.tilbakenavigering).toBe("tilbakenavigering");
      expect(Seksjonshandling.fortsettSenere).toBe("fortsettSenere");
      expect(Seksjonshandling.neste).toBe("neste");
    });
  });

  describe("seksjonshandlingSchema", () => {
    it("skal validere tilbakenavigering", () => {
      const result = seksjonshandlingSchema.safeParse(Seksjonshandling.tilbakenavigering);

      expect(result.success).toBe(true);
    });

    it("skal validere fortsettSenere", () => {
      const result = seksjonshandlingSchema.safeParse(Seksjonshandling.fortsettSenere);

      expect(result.success).toBe(true);
    });

    it("skal validere neste", () => {
      const result = seksjonshandlingSchema.safeParse(Seksjonshandling.neste);

      expect(result.success).toBe(true);
    });

    it("skal ikke validere ukjent handling", () => {
      const result = seksjonshandlingSchema.safeParse("ukjent");

      expect(result.success).toBe(false);
    });

    it("skal ikke validere tom string", () => {
      const result = seksjonshandlingSchema.safeParse("");

      expect(result.success).toBe(false);
    });
  });
});
