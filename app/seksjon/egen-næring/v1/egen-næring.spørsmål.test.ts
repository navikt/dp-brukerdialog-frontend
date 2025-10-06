import { expect, test } from "vitest";
import { genererÅrstallOptions } from "./egen-næring.spørsmål";

test("genererÅrstallOptions genererer forventede årstall", () => {

  const resultat = genererÅrstallOptions();

  const iÅr = new Date().getFullYear()
  expect(resultat).toEqual([
    {value: iÅr.toString(), label: iÅr.toString()},
    {value: (iÅr - 1).toString(), label: (iÅr - 1).toString()},
    {value: (iÅr - 2).toString(), label: (iÅr - 2).toString()},
    {value: (iÅr - 3).toString(), label: (iÅr - 3).toString()},
    {value: (iÅr - 4).toString(), label: (iÅr - 4).toString()},
  ]);
});
