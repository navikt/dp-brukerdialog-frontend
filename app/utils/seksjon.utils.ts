import { FlervalgSpørsmål, KomponentType } from "~/components/spørsmål/spørsmål.types";

export function finnOptionLabel(alleSpørsmål: KomponentType[], spørsmålId: string, svar: string) {
  return (
    alleSpørsmål.find((spørsmål) => spørsmål.id === spørsmålId) as FlervalgSpørsmål
  )?.options.find((s) => s.value === svar)?.label || "Ukjent spørsmål eller option";
}