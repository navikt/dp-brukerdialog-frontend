import { describe, it, expect } from "vitest";
import type { KomponentType } from "~/components/Komponent.types";
import { generateMermaidFlow } from "./mermaid.utils";

describe("mermaid.utils", () => {
  describe("generateMermaidFlow", () => {
    it("skal returnere tom string dersom det ikke finnes komponenter", () => {
      const flow = generateMermaidFlow([]);

      expect(flow).toBe("");
    });

    it("skal lage flowchart med første komponent", () => {
      const komponenter: KomponentType[] = [
        {
          id: "spm1",
          type: "kortTekst",
          label: "Hva heter du?",
        },
      ];

      const flow = generateMermaidFlow(komponenter);

      expect(flow).toBe('flowchart TD\n  spm1["[kortTekst]<br/>Hva heter du?"]');
    });

    it("skal bruke description dersom label mangler", () => {
      const komponenter: KomponentType[] = [
        {
          id: "info1",
          type: "forklarendeTekst",
          description: "Dette er en forklarende tekst",
        },
      ];

      const flow = generateMermaidFlow(komponenter);

      expect(flow).toBe(
        'flowchart TD\n  info1["[forklarendeTekst]<br/>Dette er en forklarende tekst"]'
      );
    });

    it("skal bruke description dersom label er tom", () => {
      const komponenter: KomponentType[] = [
        {
          id: "info1",
          type: "forklarendeTekst",
          label: "   ",
          description: "Fallback tekst",
        },
      ];

      const flow = generateMermaidFlow(komponenter);

      expect(flow).toBe('flowchart TD\n  info1["[forklarendeTekst]<br/>Fallback tekst"]');
    });

    it("skal lage koblinger fra envalg til komponenter med visHvis", () => {
      const komponenter: KomponentType[] = [
        {
          id: "spm1",
          type: "envalg",
          label: "Har du barn?",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nei", label: "Nei" },
          ],
        },
        {
          id: "spm2",
          type: "kortTekst",
          label: "Hvor mange barn har du?",
          visHvis: (svar) => svar.spm1 === "ja",
        },
      ];

      const flow = generateMermaidFlow(komponenter);

      expect(flow).toBe(
        [
          "flowchart TD",
          '  spm1["[envalg]<br/>Har du barn?"]',
          '  spm1 -- Ja --> spm2["[kortTekst]<br/>Hvor mange barn har du?"]',
        ].join("\n")
      );
    });

    it("skal ikke lage kobling dersom visHvis returnerer false", () => {
      const komponenter: KomponentType[] = [
        {
          id: "spm1",
          type: "envalg",
          label: "Har du barn?",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nei", label: "Nei" },
          ],
        },
        {
          id: "spm2",
          type: "kortTekst",
          label: "Hvor mange barn har du?",
          visHvis: (svar) => svar.spm1 === "kanskje",
        },
      ];

      const flow = generateMermaidFlow(komponenter);

      expect(flow).toBe('flowchart TD\n  spm1["[envalg]<br/>Har du barn?"]');
    });
  });
});
