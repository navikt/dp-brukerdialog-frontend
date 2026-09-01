import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import path from "path";

export default defineConfig(({ command }) => ({
  base:
    command === "build"
      ? "https://cdn.nav.no/teamdagpenger/dp-brukerdialog-frontend/client/"
      : "/dagpenger/dialog/",

  plugins: [reactRouter(), devtoolsJson()],

  server: {
    open: "/dagpenger/dialog/soknad",
  },

  build: {
    manifest: true,
    sourcemap: process.env.NODE_ENV !== "production",
  },

  resolve: {
    alias: {
      "~": path.resolve(import.meta.dirname, "./app"),
    },
    tsconfigPaths: true,
  },
}));
