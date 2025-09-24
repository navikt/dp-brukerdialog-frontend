import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export type SeksjonProps = {
  seksjonsData: string;
  seksjonsUrl: string;
};

export function erInformasjonsFelt(spørsmål: KomponentType) {
  return ["varselmelding, lesMer", "dokumentasjonskravindikator"].includes(spørsmål.type);
}
