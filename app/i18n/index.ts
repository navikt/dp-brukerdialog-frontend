import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const defaultLanguage = "nb" as const;
export const supportedLanguages = ["nb", "en", "nn"] as const;
const loggManglendeOversettelserLokalt = import.meta.env.DEV && typeof window === "undefined";

const namespaceTilSeksjonPath: Record<string, string> = {
  soknadOversikt: "oversikt",
  personalia: "personalia",
  "din-situasjon": "din-situasjon",
  arbeidsforhold: "arbeidsforhold",
  "annen-pengestotte": "annen-pengestøtte",
  "egen-naering": "egen-næring",
  verneplikt: "verneplikt",
  utdanning: "utdanning",
  barnetillegg: "barnetillegg",
  "reell-arbeidssoker": "reell-arbeidssøker",
  tilleggsopplysninger: "tilleggsopplysninger",
  dokumentasjon: "dokumentasjon",
  oppsummering: "oppsummering",
  kvittering: "kvittering",
  ettersending: "ettersending",
  common: "common",
};

const oversettelser = import.meta.glob("../seksjon/**/locales/*.json");

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

    const filPath = versjon
      ? `../seksjon/${seksjonPath}/${versjon}/locales/${language}.json`
      : `../seksjon/${seksjonPath}/locales/${language}.json`;

    if (!(filPath in oversettelser)) {
      callback(null, {});
      return;
    }

    const lastOversettelse = oversettelser[filPath] as
      undefined | (() => Promise<{ default: Record<string, unknown> } | Record<string, unknown>>);

    if (!lastOversettelse) {
      callback(null, {});
      return;
    }

    void lastOversettelse()
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
  .init({
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    ns: [
      "soknadOversikt",
      "personalia",
      "din-situasjon",
      "arbeidsforhold",
      "annen-pengestotte",
      "egen-naering",
      "verneplikt",
      "utdanning",
      "barnetillegg",
      "reell-arbeidssoker",
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

export default i18n;
