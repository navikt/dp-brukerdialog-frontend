import { Button, HStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { languageLabels, supportedLanguages, type SupportedLanguage } from "../i188n/languages";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language ?? "nb").split("-")[0];

  function changeLanguage(language: SupportedLanguage) {
    void i18n.changeLanguage(language);
  }

  return (
    <HStack gap="space-8" align="center">
      {supportedLanguages.map((language) => {
        const isActive = currentLanguage === language;

        return (
          <Button
            key={language}
            type="button"
            size="small"
            variant={isActive ? "secondary" : "tertiary"}
            onClick={() => changeLanguage(language)}
            aria-pressed={isActive}
          >
            {languageLabels[language]}
          </Button>
        );
      })}
    </HStack>
  );
}
