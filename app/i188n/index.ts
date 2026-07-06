import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { defaultLanguage, supportedLanguages } from "./languages";

const baseUrl = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

void i18n
  .use(Backend)
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

    backend: {
      loadPath: `${baseUrl}locales/{{lng}}/{{ns}}.json`,
    },

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
