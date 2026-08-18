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

export const defaultLanguage = "nb" as const;
export const supportedLanguages = ["nb", "en", "nn"] as const;
export const fallbackT = ((key: string) => key) as unknown as TFunction;
const loggManglendeOversettelserLokalt = import.meta.env.DEV && typeof window === "undefined";
const oversettelser = import.meta.glob(["../seksjon/**/locales/*.json", "./locales/*.json"]);

export const namespaceTilSeksjonPath: Record<string, string> = {
  oversikt: "oversikt",
  arbeidssøker: "arbeidssøker",
  personalia: "personalia",
  "din-situasjon": "din-situasjon",
  arbeidsforhold: "arbeidsforhold",
  "annen-pengestøtte": "annen-pengestøtte",
  "egen-næring": "egen-næring",
  verneplikt: "verneplikt",
  utdanning: "utdanning",
  barnetillegg: "barnetillegg",
  "reell-arbeidssøker": "reell-arbeidssøker",
  tilleggsopplysninger: "tilleggsopplysninger",
  dokumentasjon: "dokumentasjon",
  oppsummering: "oppsummering",
  kvittering: "kvittering",
  ettersending: "ettersending",
  common: "common",
};

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
    const seksjonPath = namespaceTilSeksjonPath[baseNamespace];
    const visningsnavn = seksjonPath ? namespaceTilVisningsnavn(seksjonPath) : undefined;
    const fullNøkkel = visningsnavn ? `${visningsnavn}:${nøkkel}` : nøkkel;
    return `${value}${lagTekstnøkkelMarkør(fullNøkkel)}`;
  },
};

const appSeksjonBackend = {
  type: "backend" as const,
  init() {},
  read(language: string, namespace: string, callback: (error: unknown, data: unknown) => void) {
    const [baseNamespace, versjon] = namespace.split("/");
    const seksjonPath = namespaceTilSeksjonPath[baseNamespace];

    if (!seksjonPath) {
      callback(null, {});
      return;
    }

    let filPath: string;
    if (baseNamespace === "common") {
      filPath = `./locales/${language}.json`;
    } else if (versjon) {
      filPath = `../seksjon/${seksjonPath}/${versjon}/locales/${language}.json`;
    } else {
      filPath = `../seksjon/${seksjonPath}/locales/${language}.json`;
    }

    if (!(filPath in oversettelser)) {
      callback(null, {});
      return;
    }

    const hentOversettelse = oversettelser[filPath] as
      undefined | (() => Promise<{ default: Record<string, unknown> } | Record<string, unknown>>);

    if (!hentOversettelse) {
      callback(null, {});
      return;
    }

    void hentOversettelse()
      .then((modul) => {
        callback(null, "default" in modul ? modul.default : modul);
      })
      .catch((error) => {
        callback(error, null);
      });
  },
};

void i18n
  .use(appSeksjonBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(visTNøkkel)
  .init({
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    postProcess: ["visNøkkel"],
    ns: [
      "oversikt",
      "arbeidssøker",
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
      "common",
    ],
    defaultNS: "common",
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
    parseMissingKeyHandler: (key, _defaultValue, options) => {
      const namespaceVerdi = options?.ns;
      const namespace =
        typeof namespaceVerdi === "string"
          ? namespaceVerdi
          : Array.isArray(namespaceVerdi)
            ? namespaceVerdi[0]
            : "unknown";

      const [baseNamespace] = namespace.split("/");
      const seksjonPath = namespaceTilSeksjonPath[baseNamespace] ?? baseNamespace;

      const språkVerdi = options?.lng;
      const språk =
        typeof språkVerdi === "string"
          ? språkVerdi
          : Array.isArray(språkVerdi)
            ? språkVerdi.join(",")
            : (i18n.resolvedLanguage ?? "unknown");

      if (loggManglendeOversettelserLokalt) {
        console.info(
          `[i18n] Mangler oversettelse: side=${seksjonPath}, namespace=${namespace}, språk=${språk}, nøkkel=${key}`
        );
      }

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
