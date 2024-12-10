import {
  DecoratorElements,
  DecoratorEnvProps,
  fetchDecoratorHtml,
  type DecoratorFetchProps,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import { getEnv } from "~/utils/env.utils";

export async function getDecoratorHTML(): Promise<DecoratorElements> {
  const config: DecoratorFetchProps = {
    env: (getEnv("DEKORATOR_ENV") || "localhost") as DecoratorEnvProps["env"],
    localUrl: "https://dekoratoren.ekstern.dev.nav.no",
    params: {
      language: "nb",
      context: "privatperson",
      chatbot: false,
      redirectToApp: true,
      level: "Level4",
    },
  };

  return await fetchDecoratorHtml(config);
}
