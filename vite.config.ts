import { reactRouter } from "@react-router/dev/vite";
import path from "path";
import { defineConfig, type ViteDevServer } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";
import { isOutdatedBasePath, createUpdatedBasePath } from "./app/utils/redirect.utils";

const handleOutdatedBasePath = {
  name: "handle-outdated-base-path",
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      const url = new URL(req.url ?? "", "http://localhost");
      const request = new Request(url);
      if (isOutdatedBasePath(request)) {
        res.writeHead(301, { Location: createUpdatedBasePath(url.pathname) + url.search });
        res.end();
        return;
      }
      next();
    });
  }
};

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "https://cdn.nav.no/teamdagpenger/dp-brukerdialog-frontend/client/"
      : "/dagpenger/dialog/soknad",
  plugins: [reactRouter(), tsconfigPaths(), devtoolsJson(), handleOutdatedBasePath],
  build: {
    manifest: true,
    sourcemap: process.env.NODE_ENV !== "production"
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app")
    }
  }
});
