const STORAGE_KEY = "visNøkler";

// Usannsynlig tekst som brukes til å markere hvor i18n-nøkkelen er satt inn i oversatt tekst
export const NØKKEL_MARKØR_PREFIX = "§§NØKKEL:";
export const NØKKEL_MARKØR_SUFFIX = "§§";
export const NØKKEL_MARKØR_REGEX = /§§NØKKEL:(.+?)§§/;

let visNøklerAktivert =
  typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true";

const lyttere = new Set<(aktiv: boolean) => void>();

export function erVisNøklerAktivert() {
  return visNøklerAktivert;
}

export function settVisNøkler(aktiv: boolean) {
  visNøklerAktivert = aktiv;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(aktiv));
  }
  lyttere.forEach((lytter) => lytter(aktiv));
}

export function abonnerPåVisNøkler(lytter: (aktiv: boolean) => void) {
  lyttere.add(lytter);
  return () => lyttere.delete(lytter);
}
