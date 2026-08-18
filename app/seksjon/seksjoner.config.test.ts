import { describe, expect, it } from "vitest";
import { hentSeksjonConfig, hentSeksjonNavigasjon } from "~/seksjon/seksjoner.config";

describe("hentSeksjonConfig", () => {
  it("returnerer config for alle seksjoner", () => {
    expect(hentSeksjonConfig("personalia")).toEqual({ seksjonId: "personalia", nyesteVersjon: 1 });
    expect(hentSeksjonConfig("din-situasjon")).toEqual({
      seksjonId: "din-situasjon",
      nyesteVersjon: 1,
    });
    expect(hentSeksjonConfig("arbeidsforhold")).toEqual({
      seksjonId: "arbeidsforhold",
      nyesteVersjon: 2,
    });
    expect(hentSeksjonConfig("annen-pengestotte")).toEqual({
      seksjonId: "annen-pengestotte",
      nyesteVersjon: 1,
    });
    expect(hentSeksjonConfig("egen-naring")).toEqual({
      seksjonId: "egen-naring",
      nyesteVersjon: 1,
    });
    expect(hentSeksjonConfig("verneplikt")).toEqual({ seksjonId: "verneplikt", nyesteVersjon: 1 });
    expect(hentSeksjonConfig("utdanning")).toEqual({ seksjonId: "utdanning", nyesteVersjon: 1 });
    expect(hentSeksjonConfig("barnetillegg")).toEqual({
      seksjonId: "barnetillegg",
      nyesteVersjon: 1,
    });
    expect(hentSeksjonConfig("reell-arbeidssoker")).toEqual({
      seksjonId: "reell-arbeidssoker",
      nyesteVersjon: 1,
    });
    expect(hentSeksjonConfig("tilleggsopplysninger")).toEqual({
      seksjonId: "tilleggsopplysninger",
      nyesteVersjon: 1,
    });
    expect(hentSeksjonConfig("dokumentasjon")).toEqual({
      seksjonId: "dokumentasjon",
      nyesteVersjon: 1,
    });
    expect(hentSeksjonConfig("oppsummering")).toEqual({
      seksjonId: "oppsummering",
      nyesteVersjon: 1,
    });
    expect(hentSeksjonConfig("kvittering")).toEqual({ seksjonId: "kvittering", nyesteVersjon: 1 });
  });
});

describe("hentSeksjonNavigasjon", () => {
  it("returnerer korrekt navigasjon for alle seksjoner", () => {
    expect(hentSeksjonNavigasjon("personalia")).toEqual({
      forrigeSeksjonId: null,
      nesteSeksjonId: "din-situasjon",
    });
    expect(hentSeksjonNavigasjon("din-situasjon")).toEqual({
      forrigeSeksjonId: "personalia",
      nesteSeksjonId: "arbeidsforhold",
    });
    expect(hentSeksjonNavigasjon("arbeidsforhold")).toEqual({
      forrigeSeksjonId: "din-situasjon",
      nesteSeksjonId: "annen-pengestotte",
    });
    expect(hentSeksjonNavigasjon("annen-pengestotte")).toEqual({
      forrigeSeksjonId: "arbeidsforhold",
      nesteSeksjonId: "egen-naring",
    });
    expect(hentSeksjonNavigasjon("egen-naring")).toEqual({
      forrigeSeksjonId: "annen-pengestotte",
      nesteSeksjonId: "verneplikt",
    });
    expect(hentSeksjonNavigasjon("verneplikt")).toEqual({
      forrigeSeksjonId: "egen-naring",
      nesteSeksjonId: "utdanning",
    });
    expect(hentSeksjonNavigasjon("utdanning")).toEqual({
      forrigeSeksjonId: "verneplikt",
      nesteSeksjonId: "barnetillegg",
    });
    expect(hentSeksjonNavigasjon("barnetillegg")).toEqual({
      forrigeSeksjonId: "utdanning",
      nesteSeksjonId: "reell-arbeidssoker",
    });
    expect(hentSeksjonNavigasjon("reell-arbeidssoker")).toEqual({
      forrigeSeksjonId: "barnetillegg",
      nesteSeksjonId: "tilleggsopplysninger",
    });
    expect(hentSeksjonNavigasjon("tilleggsopplysninger")).toEqual({
      forrigeSeksjonId: "reell-arbeidssoker",
      nesteSeksjonId: "dokumentasjon",
    });
    expect(hentSeksjonNavigasjon("dokumentasjon")).toEqual({
      forrigeSeksjonId: "tilleggsopplysninger",
      nesteSeksjonId: "oppsummering",
    });
    expect(hentSeksjonNavigasjon("oppsummering")).toEqual({
      forrigeSeksjonId: "dokumentasjon",
      nesteSeksjonId: "kvittering",
    });
    expect(hentSeksjonNavigasjon("kvittering")).toEqual({
      forrigeSeksjonId: "oppsummering",
      nesteSeksjonId: null,
    });
  });
});
