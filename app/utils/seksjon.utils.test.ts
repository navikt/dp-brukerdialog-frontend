import { describe, expect, it } from "vitest";
import {
  egenNæringEgenNæringsvirksomhetKomponenter,
  egenNæringEgetGårdsbrukKomponenter,
  leggTilGårdsbrukKomponenter,
  leggTilNæringsvirksomhetKomponenter,
} from "../seksjon/egen-næring/v1/egen-næring.komponenter";
import { lagSeksjonPayload, validerSøknadId } from "./seksjon.utils";

describe("lagSeksjonPayload", () => {
  const formData = {
    driverDuEgenNæringsvirksomhet: "ja",
    næringsvirksomheter: [
      {
        organisasjonsnummer: "1",
        hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert: "2",
        hvorMangeTimerJobbetPerUkeNå: "2",
      },
    ],
    driverDuEgetGårdsbruk: "ja",
    gårdsbruk: [
      {
        organisasjonsnummer: "1",
        hvilkeTypeGårdsbrukDriverDu: ["dyr"],
        hvemEierGårdsbruket: ["jeg"],
        hvorMangeProsentAvInntektenGårTilDeg: "1",
        hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr: "2025",
        hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer: "1",
        hvordanHarDuBeregnetAntallArbeidstimerTotalt: "1",
      },
      {
        organisasjonsnummer: "2",
        hvilkeTypeGårdsbrukDriverDu: ["jord"],
        hvemEierGårdsbruket: ["jeg"],
        hvorMangeProsentAvInntektenGårTilDeg: "2",
        hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr: "2024",
        hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer: "2",
        hvordanHarDuBeregnetAntallArbeidstimerTotalt: "2",
      },
    ],
    versjon: 1,
  };

  it("should create del1Payload for egenNæringEgenNæringsvirksomhetSpørsmål", () => {
    const del1Payload = lagSeksjonPayload(egenNæringEgenNæringsvirksomhetKomponenter, formData);
    expect(del1Payload.length).toBeGreaterThan(0);
    expect(del1Payload.some((item) => item.id === "driverDuEgenNæringsvirksomhet")).toBe(true);
  });

  it("should create del2Payload for each næringsvirksomhet", () => {
    const del2Payload = formData.næringsvirksomheter.flatMap((virksomhet) =>
      lagSeksjonPayload(leggTilNæringsvirksomhetKomponenter, virksomhet)
    );
    expect(del2Payload.length).toBeGreaterThan(0);
    expect(del2Payload.some((item) => item.id === "organisasjonsnummer")).toBe(true);
  });

  it("should create del3Payload for egenNæringEgetGårdsbrukSpørsmål", () => {
    const del3Payload = lagSeksjonPayload(egenNæringEgetGårdsbrukKomponenter, formData);
    expect(del3Payload.length).toBeGreaterThan(0);
    expect(del3Payload.some((item) => item.id === "driverDuEgetGårdsbruk")).toBe(true);
  });

  it("should create del4Payload for each gårdsbruk", () => {
    const del4Payload = formData.gårdsbruk.flatMap((gårdsbruket) =>
      lagSeksjonPayload(leggTilGårdsbrukKomponenter, gårdsbruket)
    );
    expect(del4Payload.length).toBeGreaterThan(0);
    expect(del4Payload.some((item) => item.id === "organisasjonsnummer")).toBe(true);
  });

  it("should create brutto payload with all parts", () => {
    const del1Payload = lagSeksjonPayload(egenNæringEgenNæringsvirksomhetKomponenter, formData);
    const del2Payload = formData.næringsvirksomheter.flatMap((virksomhet) =>
      lagSeksjonPayload(leggTilNæringsvirksomhetKomponenter, virksomhet)
    );
    const del3Payload = lagSeksjonPayload(egenNæringEgetGårdsbrukKomponenter, formData);
    const del4Payload = formData.gårdsbruk.flatMap((gårdsbruket) =>
      lagSeksjonPayload(leggTilGårdsbrukKomponenter, gårdsbruket)
    );
    const brutto = [...del1Payload, ...del2Payload, ...del3Payload, ...del4Payload];
    expect(brutto.length).toBe(
      del1Payload.length + del2Payload.length + del3Payload.length + del4Payload.length
    );
  });
});

describe("validerSøknadId", () => {
  it("kaster ikke feil for gyldig UUID", () => {
    expect(() => validerSøknadId("550e8400-e29b-41d4-a716-446655440000")).not.toThrow();
  });

  it("kaster 404 Response for ugyldig UUID", () => {
    expect(() => validerSøknadId("ikke-en-uuid")).toThrow();
  });

  it("kaster 404 Response for tilfeldig tekst", () => {
    try {
      validerSøknadId("abc123");
    } catch (e) {
      expect(e instanceof Response).toBe(true);
      expect((e as Response).status).toBe(404);
    }
  });
});
