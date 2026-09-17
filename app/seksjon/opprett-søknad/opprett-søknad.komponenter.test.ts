import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import nb from "./locales/nb.json";

const sourceFiles = ["opprett-søknad.komponenter.tsx", "OpprettSøknadView.tsx"];

function getValueAtPath(object: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) => {
    if (typeof value !== "object" || value === null) {
      return undefined;
    }

    return key in value ? (value as Record<string, unknown>)[key] : undefined;
  }, object);
}

function getReferencedKeys(): string[] {
  const keys = new Set<string>();

  for (const file of sourceFiles) {
    const source = readFileSync(new URL(`./${file}`, import.meta.url), "utf8");
    for (const match of source.matchAll(/\bt\("([^"]+)"/g)) {
      keys.add(match[1]);
    }
  }

  return [...keys];
}

function getLeafKeys(object: unknown, prefix = ""): string[] {
  if (typeof object !== "object" || object === null) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(object).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return getLeafKeys(value, path);
  });
}

describe("oversettingsnøkler for opprett søknad", () => {
  it("skal finnes som tekstverdier i nb.json", () => {
    const keys = getReferencedKeys();

    expect(keys).not.toHaveLength(0);

    for (const key of keys) {
      expect(getValueAtPath(nb, key), `Mangler oversettingsnøkkel: ${key}`).toEqual(
        expect.any(String)
      );
    }
  });

  it("skal ikke inneholde ubrukte nøkler i nb.json", () => {
    const referencedKeys = getReferencedKeys();
    const unusedKeys = getLeafKeys(nb).filter((key) => !referencedKeys.includes(key));

    expect(unusedKeys).toEqual([]);
  });
});
