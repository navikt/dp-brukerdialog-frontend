import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
  test: {
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/.react-router/**"],
    setupFiles: ["./app/components/test/setup.ts"],
    coverage: {
      include: ["**/*.{ts,tsx}"],
      exclude: [
        "**/.react-router/**",
        "**/routes.ts",
        "**/*.config.ts",
        "**/*.types.ts",
        "**/*.komponenter.ts",
        "**/*.schema.ts",
        "**/api.internal.*.ts",
        "**/mocks/**",
        "**/sanity/**",
        "**/*.test.{ts,tsx}",
        "**/test/**",
        "app/entry.client.tsx",
        "app/entry.server.tsx",
      ],
      provider: "v8",
    },
  },
});