import { describe, it, expect, vi, beforeEach } from "vitest";
import type { KomponentType } from "~/components/Komponent.types";
import { valider, validerSvar } from "./validering.utils";

describe("validering.utils", () => {
  const context = {
    addIssue: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("valider", () => {
    it("skal ikke validere informasjonskomponenter", () => {
      const komponent = {
        id: "info",
        type: "forklarendeTekst",
        label: "Informasjon",
      } satisfies KomponentType;

      valider(komponent, undefined, true, context as any);

      expect(context.addIssue).not.toHaveBeenCalled();
    });

    it("skal ikke validere komponenter som ikke er synlige", () => {
      const komponent = {
        id: "navn",
        type: "kortTekst",
        label: "Navn",
      } satisfies KomponentType;

      valider(komponent, undefined, false, context as any);

      expect(context.addIssue).not.toHaveBeenCalled();
    });

    it("skal gi feil når obligatorisk spørsmål mangler svar", () => {
      const komponent = {
        id: "navn",
        type: "kortTekst",
        label: "Navn",
      } satisfies KomponentType;

      valider(komponent, undefined, true, context as any);

      expect(context.addIssue).toHaveBeenCalledWith({
        path: ["navn"],
        code: "custom",
        message: "Du må svare på dette spørsmålet",
      });
    });

    it("skal ikke gi feil når valgfritt spørsmål mangler svar", () => {
      const komponent = {
        id: "navn",
        type: "kortTekst",
        label: "Navn",
        optional: true,
      } satisfies KomponentType;

      valider(komponent, undefined, true, context as any);

      expect(context.addIssue).not.toHaveBeenCalled();
    });

    it("skal gi feil når tekst er lengre enn maksLengde", () => {
      const komponent = {
        id: "beskrivelse",
        type: "langTekst",
        label: "Beskrivelse",
        maksLengde: 5,
      } satisfies KomponentType;

      valider(komponent, "for lang tekst", true, context as any);

      expect(context.addIssue).toHaveBeenCalledWith({
        path: ["beskrivelse"],
        code: "custom",
        message: "Svaret kan ikke være lengre enn 5 tegn",
      });
    });

    it("skal gi feil når tall ikke er gyldig", () => {
      const komponent = {
        id: "antall",
        type: "tall",
        label: "Antall",
      } satisfies KomponentType;

      valider(komponent, "abc", true, context as any);

      expect(context.addIssue).toHaveBeenCalledWith({
        path: ["antall"],
        code: "custom",
        message: "Svaret må være et tall",
      });
    });

    it("skal gi feil når tall er negativt", () => {
      const komponent = {
        id: "antall",
        type: "tall",
        label: "Antall",
      } satisfies KomponentType;

      valider(komponent, "-1", true, context as any);

      expect(context.addIssue).toHaveBeenCalledWith({
        path: ["antall"],
        code: "custom",
        message: "Svaret kan ikke være et negativt tall",
      });
    });

    it("skal gi feil når tall er høyere enn maksVerdi", () => {
      const komponent = {
        id: "antall",
        type: "tall",
        label: "Antall",
        maksVerdi: 10,
      } satisfies KomponentType;

      valider(komponent, "11", true, context as any);

      expect(context.addIssue).toHaveBeenCalledWith({
        path: ["antall"],
        code: "custom",
        message: "Svaret kan ikke være høyere enn 10",
      });
    });

    it("skal godta gyldig tall med komma", () => {
      const komponent = {
        id: "antall",
        type: "tall",
        label: "Antall",
        maksVerdi: 10,
      } satisfies KomponentType;

      valider(komponent, "5,5", true, context as any);

      expect(context.addIssue).not.toHaveBeenCalled();
    });
  });

  describe("validerSvar", () => {
    it("skal returnere true når skjema er gyldig", async () => {
      const form = {
        validate: vi.fn().mockResolvedValue({}),
      };

      const økeSubmitTeller = vi.fn();
      const setKomponentIdTilFokus = vi.fn();

      const resultat = await validerSvar(form as any, økeSubmitTeller, setKomponentIdTilFokus);

      expect(resultat).toBe(true);
      expect(økeSubmitTeller).not.toHaveBeenCalled();
      expect(setKomponentIdTilFokus).not.toHaveBeenCalled();
    });

    it("skal returnere false og sette fokus når skjema har feil", async () => {
      const form = {
        validate: vi.fn().mockResolvedValue({
          navn: "Du må svare på dette spørsmålet",
        }),
      };

      const økeSubmitTeller = vi.fn();
      const setKomponentIdTilFokus = vi.fn();

      const resultat = await validerSvar(form as any, økeSubmitTeller, setKomponentIdTilFokus);

      expect(resultat).toBe(false);
      expect(setKomponentIdTilFokus).toHaveBeenCalledWith("navn");
      expect(økeSubmitTeller).toHaveBeenCalled();
    });
  });
});
