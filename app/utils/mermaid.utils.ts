import { KomponentType } from "~/components/Komponent.types";

export function generateMermaidFlow(komponenter: KomponentType[]): string {
  let lines: string[] = ["flowchart TD"];
  const main = komponenter[0];
  if (!main) return "";

  // Sett type foran teksten
  const mainLabel = main.label && main.label.trim() !== "" ? main.label : (main.description ?? "");
  const mainTekst = `[${main.type}]<br/>${mainLabel}`;
  lines.push(`  ${main.id as any}["${mainTekst}"]`);

  komponenter.forEach((q) => {
    if (q.type === "envalg" && q.options) {
      q.options.forEach((opt) => {
        komponenter.forEach((next) => {
          if (next.visHvis && next.visHvis({ [q.id]: opt.value })) {
            // Sett type foran teksten
            const nextLabel =
              next.label && next.label.trim() !== "" ? next.label : (next.description ?? "");
            const nextTekst = `[${next.type}]<br/>${nextLabel}`;
            lines.push(`  ${q.id as any} -- ${opt.label} --> ${next.id as any}["${nextTekst}"]`);
          }
        });
      });
    }
  });

  return lines.join("\n");
}
