import {
  data,
  LinksFunction,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import parse from "html-react-parser";
import { useInjectDecoratorScript } from "./hooks/useInjectDecoratorScript";
import { getDecoratorHTML } from "./models/decorator.server";
import { logger } from "./utils/logger.utils";

import akselStyles from "@navikt/ds-css/dist/index.css?url";
import indexStyles from "./index.css?url";
import { getEnv } from "./utils/env.utils";
import { useEffect, useState } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: akselStyles },
  { rel: "stylesheet", href: indexStyles },
];

export async function loader() {
  const decoratorFragments = await getDecoratorHTML();

  if (!decoratorFragments) {
    logger.error("Kunne ikke hente dekoratør");
  }

  return data({
    decoratorFragments,
    env: {
      IS_LOCALHOST: getEnv("IS_LOCALHOST"),
      APP_ENV: getEnv("APP_ENV"),
      SANITY_DATASET: getEnv("SANITY_DATASET"),
      DP_SOKNAD_ORKESTRATOR_URL: getEnv("DP_SOKNAD_ORKESTRATOR_URL"),
      FARO_URL: getEnv("FARO_URL"),
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<string | null>(null);
  const { decoratorFragments, env } = useLoaderData();
  const { DECORATOR_HEAD_ASSETS, DECORATOR_SCRIPTS, DECORATOR_HEADER, DECORATOR_FOOTER } =
    decoratorFragments;

  useEffect(() => {
    setHeader(DECORATOR_HEADER);
  }, [DECORATOR_HEADER]);

  useInjectDecoratorScript(DECORATOR_SCRIPTS);

  return (
    <html lang="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {parse(DECORATOR_HEAD_ASSETS, { trim: true })}
        <Meta />
        <Links />
      </head>
      <body>
        <div dangerouslySetInnerHTML={header ? { __html: header } : undefined} />
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
  return <Outlet />;
}
