import { KomponentType } from "~/components/spørsmål/spørsmål.types";

// verktøy for å lage mermaid-diagrammer
export function generateMermaidFlow(spørsmål: KomponentType[]): string {
  let lines: string[] = ["flowchart TD"];
  const main = spørsmål[0];
  if (!main) return "";

  // Bruk label hvis den finnes, ellers description
  const mainTekst = main.label && main.label.trim() !== "" ? main.label : (main.description ?? "");
  lines.push(`  ${main.id as any}["${mainTekst}"]`);

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
            // Bruk label hvis den finnes, ellers description
            const nextTekst =
              next.label && next.label.trim() !== "" ? next.label : (next.description ?? "");
            lines.push(`  ${q.id as any} -- ${opt.label} --> ${next.id as any}["${nextTekst}"]`);
          }
        });
      });
    }
  });

  return lines.join("\n");
}
