import { expect, test } from "vitest";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import { finnOptionLabel } from "./seksjon.utils";

const alleSpørsmål: KomponentType[] = [
  {
    id: "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand",
    type: "envalg",
    label: "Hvilke utenlandske pengestøtte har du mottatt eller søkt om?",
    options: [
      { value: "sykepenger", label: "Sykepenger" },
      {
        value: "foreldrepengerEllerSvangerskapspenger",
        label: "Foreldrepenger eller svangerskapspenger",
      },
      {
        value: "dagpengerEllerArbeidsledighetstrygd",
        label: "Dagpenger / arbeidsledighetstrygd",
      },
      {
        value: "pleiepengerOmsorgspengerEllerOpplæringspenger",
        label: "Pleiepenger, omsorgspenger eller opplæringspenger ",
      },
    ],
  },
];

test("finnOptionLabel returnerer forventet resultat hvis spørsmål og option eksisterer", () => {
  const resultat = finnOptionLabel(
    alleSpørsmål,
    "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand",
    "foreldrepengerEllerSvangerskapspenger"
  );

  expect(resultat).toEqual("Foreldrepenger eller svangerskapspenger");
});

test("finnOptionLabel returnerer forventet resultat hvis spørsmål eksisterer, men option ikke gjør det", () => {
  const resultat = finnOptionLabel(
    alleSpørsmål,
    "hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand",
    "enUkjentOption"
  );

  expect(resultat).toEqual("Ukjent spørsmål eller option");
});

test("finnOptionLabel returnerer forventet resultat hvis spørsmål ikke eksisterer", () => {
  const resultat = finnOptionLabel(
    alleSpørsmål,
    "etUkjentSpørsmål",
    "enUkjentOption"
  );

  expect(resultat).toEqual("Ukjent spørsmål eller option");
});