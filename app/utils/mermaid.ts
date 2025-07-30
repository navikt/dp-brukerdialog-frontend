import { Sporsmal } from "~/components/seksjon/seksjon.types";

// verktøy for å lage mermaid-diagrammer
export function generateMermaidFlow<S>(sporsmal: Sporsmal<S>[]): string {
  let lines: string[] = ["flowchart TD"];
  const main = sporsmal[0];
  if (!main) return "";

  // Forutsetter at første spørsmål er start
  lines.push(`  ${main.key as any}["${main.label}"]`);

  sporsmal.forEach((q) => {
    if (q.type === "radio" && q.options) {
      q.options.forEach((opt) => {
        // Finn spørsmål som vises hvis denne verdien er valgt
        sporsmal.forEach((next) => {
          if (
            next.visHvis &&
            // Syntetisk svar-objekt for å sjekke visHvis
            next.visHvis({ [q.key]: opt.value } as S)
          ) {
            lines.push(`  ${q.key as any} -- ${opt.label} --> ${next.key as any}["${next.label}"]`);
          }
        });
      });
    }
  });

  return lines.join("\n");
}
