import { expect, it, test } from "vitest";
import { formaterDatoSvar } from "./formatering.utils";

test("formaterDatoSvar returnerer dato på norsk format hvis spørsmålet er av type dato", () => {
  expect(formaterDatoSvar({ type: "dato", id: "id", label: "label" }, "2025-12-31")).toEqual(
    "31. desember 2025"
  );
});

test("formaterDatoSvar returnerer dato på norsk format hvis spørsmålet er av type periodeFra", () => {
  expect(formaterDatoSvar({ type: "periodeFra", id: "id", label: "label" }, "2025-12-31")).toEqual(
    "31. desember 2025"
  );
});

test("formaterDatoSvar returnerer dato på norsk format hvis spørsmålet er av type periodeTil", () => {
  expect(formaterDatoSvar({ type: "periodeTil", id: "id", label: "label" }, "2025-12-31")).toEqual(
    "31. desember 2025"
  );
});

test("formaterDatoSvar returnerer uendret input hvis spørsmålet er av en annen type enn dato, periodeFra eller periodeTil og svaret er en dato", () => {
  expect(formaterDatoSvar({ type: "kortTekst", id: "id", label: "label" }, "2025-12-31")).toEqual(
    "2025-12-31"
  );
});

test("formaterDatoSvar returnerer uendret input hvis spørsmålet er av en annen type enn dato, periodeFra eller periodeTil og svaret ikke er en dato", () => {
  expect(formaterDatoSvar({ type: "kortTekst", id: "id", label: "label" }, "Dette er ikke en dato.")).toEqual(
    "Dette er ikke en dato."
  );
});
