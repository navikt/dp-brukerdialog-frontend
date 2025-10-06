import { KomponentType, INFO_KOMPONENTER } from "~/components/spørsmål/spørsmål.types";

export function generateMermaidFlow(spørsmål: KomponentType[]): string {
  let lines: string[] = ["flowchart TD"];
  const main = spørsmål[0];
  if (!main) return "";

  // Sett type foran teksten
  const mainTekst =
    `[${main.type}] ` +
    (main.label && main.label.trim() !== "" ? main.label : (main.description ?? ""));
  if (INFO_KOMPONENTER.includes(main.type as any)) {
    lines.push(`  ${main.id as any}{{"${mainTekst}"}}`);
  } else {
    lines.push(`  ${main.id as any}["${mainTekst}"]`);
  }

  spørsmål.forEach((q) => {
    if (q.type === "envalg" && q.options) {
      q.options.forEach((opt) => {
        spørsmål.forEach((next) => {
          if (next.visHvis && next.visHvis({ [q.id]: opt.value })) {
            // Sett type foran teksten
            const nextTekst =
              `[${next.type}] ` +
              (next.label && next.label.trim() !== "" ? next.label : (next.description ?? ""));
            if (INFO_KOMPONENTER.includes(next.type as any)) {
              lines.push(
                `  ${q.id as any} -- ${opt.label} --> ${next.id as any}{{"${nextTekst}"}}`
              );
            } else {
              lines.push(`  ${q.id as any} -- ${opt.label} --> ${next.id as any}["${nextTekst}"]`);
            }
          }
        });
      });
    }
  });

  return lines.join("\n");
}
