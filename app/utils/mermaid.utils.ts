import { KomponentType } from "~/components/spørsmål/spørsmål.types";

// verktøy for å lage mermaid-diagrammer
export function generateMermaidFlow(spørsmål: KomponentType[]): string {
  let lines: string[] = ["flowchart TD"];
  const main = spørsmål[0];
  if (!main) return "";

  // Forutsetter at første spørsmål er start
  lines.push(`  ${main.id as any}["${main.label}"]`);

  spørsmål.forEach((q) => {
    if (q.type === "envalg" && q.options) {
      q.options.forEach((opt) => {
        // Finn spørsmål som vises hvis denne verdien er valgt
        spørsmål.forEach((next) => {
          if (
            next.visHvis &&
            // Syntetisk svar-objekt for å sjekke visHvis
            next.visHvis({ [q.id]: opt.value })
          ) {
            lines.push(`  ${q.id as any} -- ${opt.label} --> ${next.id as any}["${next.label}"]`);
          }
        });
      });
    }
  });

  return lines.join("\n");
}
