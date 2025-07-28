import {
  DecoratorElements,
  DecoratorEnvProps,
  fetchDecoratorHtml,
  type DecoratorFetchProps,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import { getEnv } from "~/utils/env.utils";

export enum DecoratorLocale {
  NB = "nb",
  NN = "nn",
  EN = "en",
}

export const availableLanguages = [
  {
    locale: DecoratorLocale.NB,
    url: "https://www.nav.no/person/kontakt-oss/nb/",
    handleInApp: true,
  },
  {
    locale: DecoratorLocale.NN,
    url: "https://www.nav.no/person/kontakt-oss/nn/",
    handleInApp: true,
  },
  {
    locale: DecoratorLocale.EN,
    url: "https://www.nav.no/person/kontakt-oss/en/",
    handleInApp: true,
  },
];

export async function getDekoratorHTML(): Promise<DecoratorElements> {
  const config: DecoratorFetchProps = {
    env: (getEnv("DEKORATOR_ENV") || "localhost") as DecoratorEnvProps["env"],
    localUrl: "https://dekoratoren.ekstern.dev.nav.no",
    params: {
      context: "privatperson",
      chatbot: false,
      redirectToApp: true,
      level: "Level4",
      // availableLanguages: availableLanguages,
    },
  };

  return await fetchDecoratorHtml(config);
}

export async function getDekoratorLanguage(request: Request): Promise<string> {
  const cookieHeader = request.headers.get("Cookie");
  const match = cookieHeader?.match(/decorator-language=([^;]+)/);

  const lang = match?.[1] as DecoratorLocale | undefined;
  return lang ?? DecoratorLocale.NB;
}
