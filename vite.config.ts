import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

const basePath = "/arbeid/dagpenger/brukerdialog-frontend/";

export default defineConfig({
  base: basePath,
  plugins: [
    remix({
      basename: basePath,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
