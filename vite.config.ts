import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

const basePath = "/arbeid/dagpenger/brukerdialog/";
const cdnPath = "https://cdn.nav.no/teamdagpenger/dp-brukerdialog-frontend/client/";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? cdnPath : basePath,
  plugins: [
    remix({
      basename: basePath,
      future: {
        v3_fetcherPersist: false,
        v3_relativeSplatPath: false,
        v3_throwAbortReason: false,
        v3_singleFetch: false,
        v3_lazyRouteDiscovery: false,
      },
    }),
    tsconfigPaths(),
  ],
});
