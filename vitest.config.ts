import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/.react-router/**"],
    coverage: {
      include: ["**/*.{ts,tsx}"],
      exclude: [
        "**/.react-router/**",
        "**/routes.ts",
        "**/*.config.ts",
        "**/*.types.ts",
        "**/mocks/**",
        "**/sanity/**",
        "app/entry.client.tsx",
        "app/entry.server.tsx",
      ],
      provider: "v8",
    },
  },
});
