import { describe, expect, it } from "vitest";
import { hentSeksjonKonfig } from "~/seksjon/seksjoner.konfig";

describe("hentSeksjonKonfig", () => {
  it("returnerer config for alle seksjoner", () => {
    expect(hentSeksjonKonfig("personalia")).toEqual({
      seksjonId: "personalia",
      nyesteVersjon: 1,
      forrigeSeksjonId: null,
      nesteSeksjonId: "din-situasjon",
    });
    expect(hentSeksjonKonfig("din-situasjon")).toEqual({
      seksjonId: "din-situasjon",
      nyesteVersjon: 1,
      forrigeSeksjonId: "personalia",
      nesteSeksjonId: "arbeidsforhold",
    });
    expect(hentSeksjonKonfig("arbeidsforhold")).toEqual({
      seksjonId: "arbeidsforhold",
      nyesteVersjon: 2,
      forrigeSeksjonId: "din-situasjon",
      nesteSeksjonId: "annen-pengestotte",
    });
    expect(hentSeksjonKonfig("annen-pengestotte")).toEqual({
      seksjonId: "annen-pengestotte",
      nyesteVersjon: 1,
      forrigeSeksjonId: "arbeidsforhold",
      nesteSeksjonId: "egen-naring",
    });
    expect(hentSeksjonKonfig("egen-naring")).toEqual({
      seksjonId: "egen-naring",
      nyesteVersjon: 1,
      forrigeSeksjonId: "annen-pengestotte",
      nesteSeksjonId: "verneplikt",
    });
    expect(hentSeksjonKonfig("verneplikt")).toEqual({
      seksjonId: "verneplikt",
      nyesteVersjon: 1,
      forrigeSeksjonId: "egen-naring",
      nesteSeksjonId: "utdanning",
    });
    expect(hentSeksjonKonfig("utdanning")).toEqual({
      seksjonId: "utdanning",
      nyesteVersjon: 1,
      forrigeSeksjonId: "verneplikt",
      nesteSeksjonId: "barnetillegg",
    });
    expect(hentSeksjonKonfig("barnetillegg")).toEqual({
      seksjonId: "barnetillegg",
      nyesteVersjon: 1,
      forrigeSeksjonId: "utdanning",
      nesteSeksjonId: "reell-arbeidssoker",
    });
    expect(hentSeksjonKonfig("reell-arbeidssoker")).toEqual({
      seksjonId: "reell-arbeidssoker",
      nyesteVersjon: 1,
      forrigeSeksjonId: "barnetillegg",
      nesteSeksjonId: "tilleggsopplysninger",
    });
    expect(hentSeksjonKonfig("tilleggsopplysninger")).toEqual({
      seksjonId: "tilleggsopplysninger",
      nyesteVersjon: 1,
      forrigeSeksjonId: "reell-arbeidssoker",
      nesteSeksjonId: "dokumentasjon",
    });
    expect(hentSeksjonKonfig("dokumentasjon")).toEqual({
      seksjonId: "dokumentasjon",
      nyesteVersjon: 1,
      forrigeSeksjonId: "tilleggsopplysninger",
      nesteSeksjonId: "oppsummering",
    });
    expect(hentSeksjonKonfig("oppsummering")).toEqual({
      seksjonId: "oppsummering",
      nyesteVersjon: 1,
      forrigeSeksjonId: "dokumentasjon",
      nesteSeksjonId: "kvittering",
    });
    expect(hentSeksjonKonfig("kvittering")).toEqual({
      seksjonId: "kvittering",
      nyesteVersjon: 1,
      forrigeSeksjonId: "oppsummering",
      nesteSeksjonId: null,
    });
  });
});
