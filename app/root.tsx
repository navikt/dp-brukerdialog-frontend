import navStyles from "@navikt/ds-css/dist/index.css?url";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";
import parse from "html-react-parser";
import { typedjson, useTypedRouteLoaderData } from "remix-typedjson";
import { useInjectDecoratorScript } from "./hooks/useInjectDecoratorScript";
import { getDecoratorHTML } from "./models/decorator.server";
import { getEnv } from "./utils/env.utils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: navStyles },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "favicon-16x16.png",
  },
  {
    rel: "icon",
    type: "image/x-icon",
    href: "favicon.ico",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const decoratorFragments = await getDecoratorHTML();

  if (!decoratorFragments) {
    throw typedjson({ error: "Kunne ikke hente dekoratør" }, { status: 500 });
  }

  return typedjson({
    decoratorFragments,
    env: {
      BASE_PATH: getEnv("BASE_PATH"),
      APP_ENV: getEnv("APP_ENV"),
      SANITY_DATASET: getEnv("SANITY_DATASET"),
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { decoratorFragments, env } = useTypedRouteLoaderData("root");

  useInjectDecoratorScript(decoratorFragments.DECORATOR_SCRIPTS);

  return (
    <html lang="en">
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
