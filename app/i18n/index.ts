import type { TFunction } from "i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import {
  erVisTNøklerAktivert,
  lagTekstnøkkelMarkør,
  lyttPåVisNøklerAktivering,
  namespaceTilVisningsnavn,
} from "./index.utils";

type Oversettelse = Record<string, unknown>;
type OversettelseModul = { default: Oversettelse } | Oversettelse;

const oversettelsesfiler = import.meta.glob<OversettelseModul>([
  "../seksjon/**/locales/*.json",
  "./locales/*.json",
]);

const defaultLanguage = "nb";
const supportedLanguages = ["nb", "en", "nn"];
export const fallbackT = ((key: string) => key) as unknown as TFunction;

const oversettelseNamespaces = [
  "felles",
  "oversikt",
  "arbeidssøker",
  "opprett-søknad",
  "personalia",
  "din-situasjon",
  "arbeidsforhold",
  "annen-pengestøtte",
  "egen-næring",
  "verneplikt",
  "utdanning",
  "barnetillegg",
  "reell-arbeidssøker",
  "tilleggsopplysninger",
  "dokumentasjon",
  "oppsummering",
  "kvittering",
  "ettersending",
];

export const visTNøkkel = {
  type: "postProcessor" as const,
  name: "visNøkkel",
  process(value: string, key: string | string[], options?: { ns?: string | string[] }) {
    if (!erVisTNøklerAktivert()) {
      return value;
    }
    const nøkkel = Array.isArray(key) ? key[0] : key;
    const namespaceVerdi = options?.ns;
    const namespace = Array.isArray(namespaceVerdi) ? namespaceVerdi[0] : namespaceVerdi;
    const [baseNamespace] = (namespace ?? "").split("/");
    const visningsnavn = oversettelseNamespaces.includes(baseNamespace)
      ? namespaceTilVisningsnavn(baseNamespace)
      : undefined;
    const fullNøkkel = visningsnavn ? `${visningsnavn}:${nøkkel}` : nøkkel;
    return `${value}${lagTekstnøkkelMarkør(fullNøkkel)}`;
  },
};

function hentOversettelseJson(namespace: string, language: string) {
  const [baseNamespace, versjon] = namespace.split("/");

  if (!oversettelseNamespaces.includes(baseNamespace)) {
    throw new Error(`Ukjent namespace: ${namespace}`);
  }

  if (baseNamespace === "felles") {
    return `./locales/${language}.json`;
  }

  if (versjon) {
    return `../seksjon/${baseNamespace}/${versjon}/locales/${language}.json`;
  }

  return `../seksjon/${baseNamespace}/locales/${language}.json`;
}

const i18nOversettelseBackend = {
  type: "backend" as const,
  init() {},
  read(language: string, namespace: string, callback: (error: unknown, data: unknown) => void) {
    const filPath = hentOversettelseJson(namespace, language);
    const hentFil = oversettelsesfiler[filPath];

    if (!hentFil) {
      callback(new Error(`Fant ikke oversettelsesfil: ${filPath}`), null);
      return;
    }

    void hentFil()
      .then((modul) => {
        callback(null, "default" in modul ? modul.default : modul);
      })
      .catch((error) => {
        callback(error, null);
      });
  },
};

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(i18nOversettelseBackend)
  .use(visTNøkkel)
  .init({
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    postProcess: ["visNøkkel"],
    ns: oversettelseNamespaces,
    defaultNS: "felles",
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
    returnNull: false,
    returnEmptyString: false,
    parseMissingKeyHandler: (key) => {
      return key;
    },
  });

i18n.on("languageChanged", (language) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
  }
});

if (typeof window !== "undefined") {
  document.body?.classList.toggle("vis-nokler-aktiv", erVisTNøklerAktivert());
  lyttPåVisNøklerAktivering(() => {
    document.body.classList.toggle("vis-nokler-aktiv", erVisTNøklerAktivert());
    i18n.emit("languageChanged", i18n.language);
  });
}

export default i18n;
