import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Mock react-i18next to prevent "NO_I18NEXT_INSTANCE" errors in tests
vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-i18next")>();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: vi.fn().mockResolvedValue(undefined),
        language: "nb",
      },
    }),
  };
});

afterEach(() => {
  cleanup();
});
