import akselStyles from "@navikt/ds-css/dist/index.css?url";
import { Theme } from "@navikt/ds-react";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import parse from "html-react-parser";
import {
  data,
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
import { ErrorBoundaryKomponent } from "./components/ErrorBoundaryKomponent";
import { useInjectDecoratorScript } from "./hooks/useInjectDecoratorScript";
import indexStyles from "./index.css?url";
import { getDekoratorHTML, getDekoratorLanguage } from "./models/dekorator.server";
import { logger } from "./utils/logger.utils";
import { sanityClient } from "./sanity/sanity.config";
import { allTextsQuery } from "./sanity/sanity.query";
import { SanityData } from "./sanity/sanity.types";
import { getEnv } from "./utils/env.utils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: akselStyles },
  { rel: "stylesheet", href: indexStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const decoratorFragments = await getDekoratorHTML();

  if (!decoratorFragments) {
    logger.error("Kunne ikke hente dekoratør");
  }

  const dekoratorLanguage = await getDekoratorLanguage(request);

  if (!dekoratorLanguage) {
    logger.error("Kunne ikke hente dekoratør språk");
  }

  const sanityData = await sanityClient.fetch<SanityData>(allTextsQuery, {
    baseLang: "nb",
    lang: dekoratorLanguage,
  });

  return data({
    decoratorFragments,
    language: dekoratorLanguage,
    sanityData,
    env: {
      IS_LOCALHOST: getEnv("IS_LOCALHOST"),
      APP_ENV: getEnv("APP_ENV"),
      BASE_PATH: getEnv("BASE_PATH"),
      SANITY_DATASET: getEnv("SANITY_DATASET"),
      DP_SOKNAD_ORKESTRATOR_URL: getEnv("DP_SOKNAD_ORKESTRATOR_URL"),
      DP_MINE_DAGPENGER_URL: getEnv("DP_MINE_DAGPENGER_URL"),
      GENERELL_INNSENDING_URL: getEnv("GENERELL_INNSENDING_URL"),
      DP_SOKNADSDIALOG_URL: getEnv("DP_SOKNADSDIALOG_URL"),
      ARBEIDSSOKERREGISTRERING_URL: getEnv("ARBEIDSSOKERREGISTRERING_URL"),
      FARO_URL: getEnv("FARO_URL"),
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { decoratorFragments, env, language } = useLoaderData();
  const { DECORATOR_HEAD_ASSETS, DECORATOR_SCRIPTS, DECORATOR_HEADER, DECORATOR_FOOTER } =
    decoratorFragments;

  useInjectDecoratorScript(DECORATOR_SCRIPTS);

  // Reload page on language change
  onLanguageSelect(() => {
    navigate(0);
  });

  return (
    <html lang={language}>
      <head lang={language}>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {parse(DECORATOR_HEAD_ASSETS, { trim: true })}
        <Meta />
        <Links />
      </head>
      <body>
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
  return <ErrorBoundaryKomponent error={error} />;
}
