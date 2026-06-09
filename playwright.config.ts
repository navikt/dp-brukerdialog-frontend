import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: {
    timeout: 10_000
  },
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry"
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:5173/dagpenger/dialog/soknad",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...process.env,
      USE_MSW: "true"
    }
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
