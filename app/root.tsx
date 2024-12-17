import type { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import parse from "html-react-parser";
import { typedjson, useTypedRouteLoaderData } from "remix-typedjson";
import { useInjectDecoratorScript } from "./hooks/useInjectDecoratorScript";
import { getDecoratorHTML } from "./models/decorator.server";
import { getEnv } from "./utils/env.utils";
import { logger } from "./utils/logger.utils";

import akselStyles from "@navikt/ds-css/dist/index.css?url";
import indexStyles from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: akselStyles },
  { rel: "stylesheet", href: indexStyles },
];

export async function loader() {
  const decoratorFragments = await getDecoratorHTML();

  if (!decoratorFragments) {
    logger.error("Kunne ikke hente dekoratør");
    throw typedjson({ error: "Kunne ikke hente dekoratør" }, { status: 500 });
  }

  return typedjson({
    decoratorFragments,
    env: {
      IS_LOCALHOST: getEnv("IS_LOCALHOST"),
      BASE_PATH: getEnv("BASE_PATH"),
      APP_ENV: getEnv("APP_ENV"),
      SANITY_DATASET: getEnv("SANITY_DATASET"),
      FARO_URL: getEnv("FARO_URL"),
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { decoratorFragments, env } = useTypedRouteLoaderData("root");

  useInjectDecoratorScript(decoratorFragments.DECORATOR_SCRIPTS);

  return (
    <html lang="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {parse(decoratorFragments.DECORATOR_HEAD_ASSETS, { trim: true })}
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        {parse(decoratorFragments.DECORATOR_HEADER, { trim: true })}
        {children}
        <ScrollRestoration />
        {parse(decoratorFragments.DECORATOR_FOOTER, { trim: true })}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
