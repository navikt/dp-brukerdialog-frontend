import { KomponentType } from "~/components/Komponent.types";

export function erInformasjonsFelt(spørsmål: KomponentType) {
  return ["informasjonskort", "lesMer", "dokumentasjonskravindikator", "forklarendeTekst"].includes(
    spørsmål.type
  );
}
