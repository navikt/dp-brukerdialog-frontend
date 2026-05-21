import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { defaultLanguage, supportedLanguages } from "./languages";

void i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "nb",
    supportedLngs: [...supportedLanguages],

    ns: ["common"],
    defaultNS: "common",

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"]
    },

    interpolation: {
      escapeValue: false
    },

    returnNull: false,
    returnEmptyString: false
  });

i18n.on("languageChanged", (language) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
  }
});

export default i18n;
