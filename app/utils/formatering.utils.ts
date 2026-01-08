import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { SpørsmålBase } from "~/components/Komponent.types";

export function formaterNorskDato(dato: Date) {
  const formattertDato = format(dato, "d. MMMM yyyy", { locale: nb });
  return formattertDato.charAt(0).toUpperCase() + formattertDato.slice(1);
}

export function formaterNorskDatoMedTall(dato: Date) {
  return format(dato, "dd.MM.yyyy", { locale: nb });
}

export const formaterDatoSvar = (spørsmål: SpørsmålBase, svar: string) => {
  if (
    (spørsmål.type == "dato" || spørsmål.type == "periodeFra" || spørsmål.type == "periodeTil") &&
    svar
  ) {
    return formaterNorskDato(new Date(svar));
  } else {
    return svar;
  }
};
