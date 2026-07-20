import type { TFunction } from "i18next";
import type { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const handling = "handling";
export const avtjentVerneplikt = "avtjentVerneplikt";

export type VernepliktSvar = {
  [avtjentVerneplikt]?: "ja" | "nei";
};

type VernepliktT = TFunction;

const jaNeiOptions = (t: VernepliktT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

export const lagVernepliktKomponenter = (t: VernepliktT): KomponentType[] => [
  {
    id: avtjentVerneplikt,
    type: "envalg",
    label: t("avtjentVerneplikt.label"),
    description: t("avtjentVerneplikt.description"),
    options: jaNeiOptions(t),
  },
  {
    id: "avtjentVernepliktDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("dokumentasjonskrav.tjenestebevis.tittel"),
    visHvis: (svar: VernepliktSvar) => svar[avtjentVerneplikt] === "ja",
  },
];

const fallbackT = ((key: string) => key) as unknown as VernepliktT;

export const vernepliktKomponenter = lagVernepliktKomponenter(fallbackT);
