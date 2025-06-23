/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { isRouteErrorResponse, RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { logger } from "./utils/logger.utils";
import { faro } from "@grafana/faro-web-sdk";
import { getEnv } from "./utils/env.utils";

const ABORT_DELAY = 5_000;

const csp = {
  "script-src": ["blob:"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://cdn.nav.no/teamdagpenger/dp-brukerdialog-frontend/",
  ],
  "connect-src": [
    "'self'",
    "*.nav.no",
    "rt6o382n.api.sanity.io",
    "rt6o382n.apicdn.sanity.io",
    "https://telemetry.ekstern.dev.nav.no/collect",
    "https://telemetry.nav.no/collect",
  ],
};
let cspString = `connect-src ${csp["connect-src"].join(" ")}; img-src ${csp["img-src"].join(" ")};`;

if (getEnv("IS_LOCALHOST") === "true") {
  cspString =
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * blob: 'unsafe-inline' 'unsafe-eval'; connect-src * blob: 'unsafe-inline'; img-src * 'self' blob: data:; frame-src * data: blob:; style-src * 'unsafe-inline';";
}

if (getEnv("USE_MSW") === "true") {
  import("~/mocks/mock-server").then(({ server, startMockServer }) => {
    startMockServer(server);
  });
}


export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  return isbot(request.headers.get("user-agent") || "")
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("Content-Security-Policy", cspString);

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

export function handleError(error: unknown) {
  logger.error(error);

  if (isRouteErrorResponse(error)) {
    faro.api?.pushError(new Error(error.data), { type: `${error.status} ${error.statusText}` });
  }

  if (error instanceof Error) {
    faro.api?.pushError(error);
  }
}
