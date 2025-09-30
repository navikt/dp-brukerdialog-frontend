import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export type SeksjonProps = {
  seksjonSvarene: string;
  seksjonsUrl: string;
};

export function erInformasjonsFelt(spørsmål: KomponentType) {
  return ["varselmelding, lesMer", "dokumentasjonskravindikator"].includes(spørsmål.type);
}
