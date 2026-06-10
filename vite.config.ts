import { reactRouter } from "@react-router/dev/vite";
import path from "path";
import { defineConfig, type ViteDevServer } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  erGammelSøknadIngress,
  erUtdatertIngress,
  redirectTilInfoside,
  redirectTilOppdatertIngress,
} from "./app/utils/redirect.utils";

const handleIngress = {
  name: "handle-ingress",
  enforce: "pre" as const,
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      const url = new URL(req.url ?? "/", "http://localhost:5173");
      const request = new Request(url);
      if (erUtdatertIngress(request)) {
        const redirectResponse = redirectTilOppdatertIngress(url);
        const location = redirectResponse.headers.get("Location");
        if (!location) {
          next();
          return;
        }
        res.writeHead(301, { Location: location });
        res.end();
        return;
      }
      if (erGammelSøknadIngress(request)) {
        const redirectResponse = redirectTilInfoside(url);
        const location = redirectResponse.headers.get("Location");
        if (!location) {
          next();
          return;
        }
        res.writeHead(302, { Location: location });
        res.end();
        return;
      }
      next();
    });
  },
};

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "https://cdn.nav.no/teamdagpenger/dp-brukerdialog-frontend/client/"
      : "/dagpenger/dialog/soknad",
  plugins: [handleIngress, reactRouter(), tsconfigPaths(), devtoolsJson()],
  build: {
    manifest: true,
    sourcemap: process.env.NODE_ENV !== "production",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
});
