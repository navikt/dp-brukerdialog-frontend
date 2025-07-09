/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import {PassThrough} from "node:stream";

import {createReadableStreamFromReadable} from "@react-router/node";
import {isbot} from "isbot";
import {renderToPipeableStream, type RenderToPipeableStreamOptions} from "react-dom/server";
import type {EntryContext} from "react-router";
import {ServerRouter} from "react-router";
import {getEnv} from "./utils/env.utils";

export const streamTimeout = 5_000;

if (getEnv("USE_MSW") === "true") {
    import("./mocks/mock-server").then(({startMockServer}) => {
        startMockServer();
    });
}

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    routerContext: EntryContext
) {
    return new Promise((resolve, reject) => {
        let shellRendered = false;
        const userAgent = request.headers.get("user-agent");

        // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
        // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
        const readyOption: keyof RenderToPipeableStreamOptions =
            (userAgent && isbot(userAgent)) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";

        const {pipe, abort} = renderToPipeableStream(
            <ServerRouter context={routerContext} url={request.url}/>,
            {
                [readyOption]() {
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
                        console.log(error);
                    }
                },
            }
        );

        // Abort the rendering stream after the `streamTimeout` so it has time to
        // flush down the rejected boundaries
        setTimeout(abort, streamTimeout + 1000);
    });
}