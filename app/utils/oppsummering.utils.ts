import { KomponentType } from "~/components/Komponent.types";

export function erInformasjonsFelt(spørsmål: KomponentType) {
  return ["varselmelding, lesMer", "dokumentasjonskravindikator"].includes(spørsmål.type);
}
