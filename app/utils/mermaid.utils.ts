import { Komponent } from "~/components/sporsmal/sporsmal.types";

// verktøy for å lage mermaid-diagrammer
export function generateMermaidFlow(sporsmal: Komponent[]): string {
  let lines: string[] = ["flowchart TD"];
  const main = sporsmal[0];
  if (!main) return "";

  // Forutsetter at første spørsmål er start
  lines.push(`  ${main.id as any}["${main.label}"]`);

  sporsmal.forEach((q) => {
    if (q.type === "envalg" && q.options) {
      q.options.forEach((opt) => {
        // Finn spørsmål som vises hvis denne verdien er valgt
        sporsmal.forEach((next) => {
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
