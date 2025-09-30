import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export function erInformasjonsFelt(spørsmål: KomponentType) {
  return ["varselmelding, lesMer", "dokumentasjonskravindikator"].includes(spørsmål.type);
}
