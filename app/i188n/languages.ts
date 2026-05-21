export const defaultLanguage = "nb" as const;

export const supportedLanguages = ["nb", "en", "nn"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageLabels: Record<SupportedLanguage, string> = {
  nb: "Norsk",
  en: "English",
  nn: "Nynorsk"
};
