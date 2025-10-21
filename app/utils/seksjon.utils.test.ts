import { describe, expect, it } from "vitest";
import { lagSeksjonPayload } from "../utils/seksjon.utils";
import {
  egenNæringEgenNæringsvirksomhetSpørsmål,
  egenNæringEgetGårdsbrukSpørsmål,
  leggTilGårdsbrukSpørsmål,
  leggTilNæringsvirksomhetSpørsmål,
} from "../seksjon/egen-næring/v1/egen-næring.spørsmål";

describe("lagSeksjonPayload", () => {
  const formData = {
    "driver-du-egen-næringsvirksomhet": "ja",
    næringsvirksomheter: [
      {
        organisasjonsnummer: "1",
        "hvor-mange-timer-jobbet-per-uke-før-arbeidstiden-ble-redusert": "2",
        "hvor-mange-timer-jobbet-per-uke-nå": "2",
      },
    ],
    "driver-du-eget-gårdsbruk": "ja",
    gårdsbruk: [
      {
        organisasjonsnummer: "1",
        "hvilke-type-gårdsbruk-driver-du": ["dyr"],
        "hvem-eier-gårdsbruket": ["jeg"],
        "hvor-mange-prosent-av-inntekten-går-til-deg": "1",
        "hvor-mange-arbeidstimer-blir-brukt-på-gårdsbruket-totalt-iløpet-av-et-år-valgt-år": "2025",
        "hvor-mange-arbeidstimer-blir-brukt-på-gårdsbruket-totalt-iløpet-av-et-år-antall-timer":
          "1",
        "hvordan-har-du-beregnet-antall-arbeidstimer-totalt": "1",
      },
      {
        organisasjonsnummer: "2",
        "hvilke-type-gårdsbruk-driver-du": ["jord"],
        "hvem-eier-gårdsbruket": ["jeg"],
        "hvor-mange-prosent-av-inntekten-går-til-deg": "2",
        "hvor-mange-arbeidstimer-blir-brukt-på-gårdsbruket-totalt-iløpet-av-et-år-valgt-år": "2024",
        "hvor-mange-arbeidstimer-blir-brukt-på-gårdsbruket-totalt-iløpet-av-et-år-antall-timer":
          "2",
        "hvordan-har-du-beregnet-antall-arbeidstimer-totalt": "2",
      },
    ],
    versjon: 1,
  };

  it("should create del1Payload for egenNæringEgenNæringsvirksomhetSpørsmål", () => {
    const del1Payload = lagSeksjonPayload(egenNæringEgenNæringsvirksomhetSpørsmål, formData);
    expect(del1Payload.length).toBeGreaterThan(0);
    expect(del1Payload.some((item) => item.id === "driver-du-egen-næringsvirksomhet")).toBe(true);
  });

  it("should create del2Payload for each næringsvirksomhet", () => {
    const del2Payload = formData.næringsvirksomheter.flatMap((virksomhet) =>
      lagSeksjonPayload(leggTilNæringsvirksomhetSpørsmål, virksomhet)
    );
    expect(del2Payload.length).toBeGreaterThan(0);
    expect(del2Payload.some((item) => item.id === "organisasjonsnummer")).toBe(true);
  });

  it("should create del3Payload for egenNæringEgetGårdsbrukSpørsmål", () => {
    const del3Payload = lagSeksjonPayload(egenNæringEgetGårdsbrukSpørsmål, formData);
    expect(del3Payload.length).toBeGreaterThan(0);
    expect(del3Payload.some((item) => item.id === "driver-du-eget-gårdsbruk")).toBe(true);
  });

  it("should create del4Payload for each gårdsbruk", () => {
    const del4Payload = formData.gårdsbruk.flatMap((gårdsbruket) =>
      lagSeksjonPayload(leggTilGårdsbrukSpørsmål, gårdsbruket)
    );
    expect(del4Payload.length).toBeGreaterThan(0);
    expect(del4Payload.some((item) => item.id === "organisasjonsnummer")).toBe(true);
  });

  it("should create brutto payload with all parts", () => {
    const del1Payload = lagSeksjonPayload(egenNæringEgenNæringsvirksomhetSpørsmål, formData);
    const del2Payload = formData.næringsvirksomheter.flatMap((virksomhet) =>
      lagSeksjonPayload(leggTilNæringsvirksomhetSpørsmål, virksomhet)
    );
    const del3Payload = lagSeksjonPayload(egenNæringEgetGårdsbrukSpørsmål, formData);
    const del4Payload = formData.gårdsbruk.flatMap((gårdsbruket) =>
      lagSeksjonPayload(leggTilGårdsbrukSpørsmål, gårdsbruket)
    );
    const brutto = [...del1Payload, ...del2Payload, ...del3Payload, ...del4Payload];
    expect(brutto.length).toBe(
      del1Payload.length + del2Payload.length + del3Payload.length + del4Payload.length
    );
  });
});
