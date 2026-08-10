import { useTranslation } from "react-i18next";

type Versjon = number | string | null | undefined;

export function useVersjonertTranslation(namespace: string, versjon: Versjon) {
  const versjonTekst = versjon == null || versjon === "" ? null : String(versjon);
  const versjonMappe = versjonTekst?.startsWith("v")
    ? versjonTekst
    : versjonTekst && `v${versjonTekst}`;

  return useTranslation(versjonMappe ? [`${namespace}/${versjonMappe}`, namespace] : [namespace]);
}
