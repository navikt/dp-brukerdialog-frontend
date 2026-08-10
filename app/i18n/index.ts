import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const defaultLanguage = "nb" as const;
export const supportedLanguages = ["nb", "en", "nn"] as const;

const namespaceTilSeksjonPath: Record<string, string> = {
  common: "common",
  "annen-pengestotte": "annen-pengestøtte",
  arbeidsforhold: "arbeidsforhold",
  barnetillegg: "barnetillegg",
  "din-situasjon": "din-situasjon",
  dokumentasjon: "dokumentasjon",
  "egen-naering": "egen-næring",
  ettersending: "ettersending",
  kvittering: "kvittering",
  oppsummering: "oppsummering",
  personalia: "personalia",
  "reell-arbeidssoker": "reell-arbeidssøker",
  soknadOversikt: "oversikt",
  tilleggsopplysninger: "tilleggsopplysninger",
  utdanning: "utdanning",
  verneplikt: "verneplikt",
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
      "common",
      "annen-pengestotte",
      "arbeidsforhold",
      "barnetillegg",
      "din-situasjon",
      "dokumentasjon",
      "egen-naering",
      "ettersending",
      "kvittering",
      "oppsummering",
      "personalia",
      "reell-arbeidssoker",
      "soknadOversikt",
      "tilleggsopplysninger",
      "utdanning",
      "verneplikt",
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
  });

i18n.on("languageChanged", (language) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
  }
});

export default i18n;
