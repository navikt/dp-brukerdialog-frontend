import { getEnv } from "../utils/env.utils";

const STORAGE_KEY = "visNøkler";
export const TKEY_REGEX = /\$TKEY:(.+?);/;
const erDev = getEnv("APP_ENV") === "dev";

let visNøklerAktivert =
  erDev && typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true";

const lyttere = new Set<(aktiv: boolean) => void>();

export function lagTekstnøkkelMarkør(nøkkel: string) {
  return `$TKEY:${nøkkel};`;
}

export function erVisTNøklerAktivert() {
  return visNøklerAktivert;
}

export function settVisTNøkler(aktiv: boolean) {
  visNøklerAktivert = erDev && aktiv;

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(visNøklerAktivert));
  }

  lyttere.forEach((lytter) => lytter(aktiv));
}

export function lyttPåVisNøklerAktivering(lytter: (aktiv: boolean) => void) {
  lyttere.add(lytter);
  return () => lyttere.delete(lytter);
}

export const namespaceTilVisningsnavn = (seksjonPath: string) =>
  `#${seksjonPath.charAt(0).toUpperCase()}${seksjonPath.slice(1).replace(/-/g, " ")}`;
