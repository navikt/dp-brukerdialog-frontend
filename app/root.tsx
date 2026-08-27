import { Theme } from "@navikt/ds-react";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import parse from "html-react-parser";
import { useEffect } from "react";
import {
  data,
  isRouteErrorResponse,
  Links,
  LinksFunction,
  LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
} from "react-router";
import { Route } from "./+types/root";
import { IkkeFunnetFeil } from "./components/errorBoundary/IkkeFunnetFeil";
import { TekniskFeil } from "./components/errorBoundary/TekniskFeil";
import { UkjentFeil } from "./components/errorBoundary/UkjentFeil";
import { OversettingNøklerKnapp } from "./components/OversettingNøklerKnapp";
import { useInjectDecoratorScript } from "./hooks/useInjectDecoratorScript";
import { getDekoratorHTML, getDekoratorLanguage } from "./models/dekorator.server";
import { hentArbeidssøkerStatus } from "./models/hent-arbeidssøkerStatus.server";
import { getEnv } from "./utils/env.utils";
import { logger } from "./utils/logger.utils";
import i18n from "./i18n";

import akselStyles from "@navikt/ds-css/dist/index.css?url";
import indexStyles from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: akselStyles },
  { rel: "stylesheet", href: indexStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const dekoratorLanguage = await getDekoratorLanguage(request);
  const decoratorFragments = await getDekoratorHTML(dekoratorLanguage);
  const arbeidssøkerStatus = await hentArbeidssøkerStatus(request);

  if (!decoratorFragments) {
    logger.error("Kunne ikke hente dekoratør");
  }

  if (!dekoratorLanguage) {
    logger.error("Kunne ikke hente dekoratør språk");
  }

  return data({
    decoratorFragments,
    language: dekoratorLanguage,
    env: {
      IS_LOCALHOST: getEnv("IS_LOCALHOST"),
      APP_ENV: getEnv("APP_ENV"),
      BASE_PATH: getEnv("BASE_PATH"),
      DP_SOKNAD_ORKESTRATOR_URL: getEnv("DP_SOKNAD_ORKESTRATOR_URL"),
      DP_MINE_DAGPENGER_URL: getEnv("DP_MINE_DAGPENGER_URL"),
      GENERELL_INNSENDING_URL: getEnv("GENERELL_INNSENDING_URL"),
      ARBEIDSSOKERREGISTRERING_URL: getEnv("ARBEIDSSOKERREGISTRERING_URL"),
      FARO_URL: getEnv("FARO_URL"),
    },
    arbeidssøkerStatus,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { decoratorFragments, env, language } = useLoaderData();
  const { DECORATOR_HEAD_ASSETS, DECORATOR_SCRIPTS, DECORATOR_HEADER, DECORATOR_FOOTER } =
    decoratorFragments;

  useInjectDecoratorScript(DECORATOR_SCRIPTS);

  useEffect(() => {
    void i18n.changeLanguage(language);

    onLanguageSelect(({ locale }) => {
      void i18n.changeLanguage(locale);
      navigate(0);
    });
  }, [language, navigate]);

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {getEnv("APP_ENV") === "prod" && (
          <style>{`language-selector { display: none !important; }`}</style>
        )}
        {parse(DECORATOR_HEAD_ASSETS, { trim: true })}
        <Meta />
        <Links />
      </head>
      <body>
        {getEnv("APP_ENV") === "dev" && <OversettingNøklerKnapp />}
        <div dangerouslySetInnerHTML={{ __html: DECORATOR_HEADER }} />
        {children}
        <ScrollRestoration />
        <div dangerouslySetInnerHTML={{ __html: DECORATOR_FOOTER }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Theme>
      <Outlet />
    </Theme>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) return <IkkeFunnetFeil />;
  if (isRouteErrorResponse(error) || error instanceof Error) return <TekniskFeil error={error} />;
  return <UkjentFeil />;
}
