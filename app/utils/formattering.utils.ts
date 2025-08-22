import { format } from "date-fns";
import { nb } from "date-fns/locale";

export function formaterNorskDato(dato: Date) {
  const formattertDato = format(dato, "dd. MMMM yyyy", { locale: nb });
  return formattertDato.charAt(0).toUpperCase() + formattertDato.slice(1);
}
