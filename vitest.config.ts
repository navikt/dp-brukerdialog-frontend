import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"], // Kun filer som slutter på .test.ts
  },
});
