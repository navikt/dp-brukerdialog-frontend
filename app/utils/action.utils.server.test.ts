import { expect, test } from "vitest";
import { normaliserFormData } from "./action.utils.server";

test("normaliserFormData håndterer mockReellArbeidssøker riktig", () => {
  const råFormData = {
    "kan-du-jobbe-både-heltid-og-deltid": "nei",
    "kan-ikke-jobbe-heltid-og-deltid-situasjonen-som-gjelder-deg[0]":
      "kan-ikke-jobbe-heltid-og-deltid-redusert-helse",
    "kan-ikke-jobbe-heltid-og-deltid-situasjonen-som-gjelder-deg[1]":
      "kan-ikke-jobbe-heltid-og-deltid-omsorg-for-barn-under-ett-år",
    "kan-ikke-jobbe-både-heltid-og-deltid-antall-timer": "20",
    "kan-du-jobbe-i-hele-norge": "nei",
    "kan-ikke-jobbe-i-hele-norge-situasjonen-som-gjelder-deg[0]":
      "kan-ikke-jobbe-i-hele-norge-redusert-helse",
    "kan-ikke-jobbe-i-hele-norge-situasjonen-som-gjelder-deg[1]":
      "kan-ikke-jobbe-i-hele-norge-omsorg-for-barn-under-ett-år",
    "kan-du-ta-alle-typer-arbeid": "ja",
    "er-du-villig-til-å-bytte-yrke-eller-gå-ned-i-lønn": "ja",
  };

  const forventetFormData = {
    "kan-du-jobbe-både-heltid-og-deltid": "nei",
    "kan-ikke-jobbe-heltid-og-deltid-situasjonen-som-gjelder-deg": [
      "kan-ikke-jobbe-heltid-og-deltid-redusert-helse",
      "kan-ikke-jobbe-heltid-og-deltid-omsorg-for-barn-under-ett-år",
    ],
    "kan-ikke-jobbe-både-heltid-og-deltid-antall-timer": "20",
    "kan-du-jobbe-i-hele-norge": "nei",
    "kan-ikke-jobbe-i-hele-norge-situasjonen-som-gjelder-deg": [
      "kan-ikke-jobbe-i-hele-norge-redusert-helse",
      "kan-ikke-jobbe-i-hele-norge-omsorg-for-barn-under-ett-år",
    ],
    "kan-du-ta-alle-typer-arbeid": "ja",
    "er-du-villig-til-å-bytte-yrke-eller-gå-ned-i-lønn": "ja",
  };

  const resultat = normaliserFormData(råFormData);

  expect(resultat).toEqual(forventetFormData);
});
