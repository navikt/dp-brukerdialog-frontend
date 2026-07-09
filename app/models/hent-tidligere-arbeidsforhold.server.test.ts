import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

vi.mock("~/models/hent-søknader");
vi.mock("~/models/hent-seksjon.server");
vi.mock("~/utils/logger.utils", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

import { hentSeksjon } from "~/models/hent-seksjon.server";
import { hentOrkestratorSøknader } from "~/models/hent-søknader";
import { hentTidligereArbeidsforhold } from "./hent-tidligere-arbeidsforhold.server";

describe("hentTidligereArbeidsforhold", () => {
  const currentSoknadId = "current-soknad";
  const request = new Request("http://localhost:3000");
  const now = new Date("2026-07-09T12:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("skal returnere null når det ikke finnes innsendte søknader", async () => {
    vi.mocked(hentOrkestratorSøknader).mockResolvedValue(
      new Response(JSON.stringify([]), { status: 200 })
    );

    const resultat = await hentTidligereArbeidsforhold(request, currentSoknadId);

    expect(resultat).toBeNull();
    expect(hentSeksjon).not.toHaveBeenCalled();
  });

  it("skal returnere null når alle søknader er eldre enn 6 måneder", async () => {
    vi.mocked(hentOrkestratorSøknader).mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            søknadId: "gammel-soknad",
            status: "INNSENDT",
            innsendtTimestamp: "2025-12-01T12:00:00.000Z",
          },
        ]),
        { status: 200 }
      )
    );

    const resultat = await hentTidligereArbeidsforhold(request, currentSoknadId);

    expect(resultat).toBeNull();
    expect(hentSeksjon).not.toHaveBeenCalled();
  });

  it("skal returnere null når eneste treff er currentSoknadId", async () => {
    vi.mocked(hentOrkestratorSøknader).mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            søknadId: currentSoknadId,
            status: "INNSENDT",
            innsendtTimestamp: "2026-07-01T12:00:00.000Z",
          },
        ]),
        { status: 200 }
      )
    );

    const resultat = await hentTidligereArbeidsforhold(request, currentSoknadId);

    expect(resultat).toBeNull();
    expect(hentSeksjon).not.toHaveBeenCalled();
  });

  it("skal velge nyeste kvalifiserte søknad", async () => {
    vi.mocked(hentOrkestratorSøknader).mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            søknadId: "eldre-soknad",
            status: "INNSENDT",
            innsendtTimestamp: "2026-05-01T12:00:00.000Z",
          },
          {
            søknadId: "nyeste-soknad",
            status: "JOURNALFØRT",
            innsendtTimestamp: "2026-06-15T12:00:00.000Z",
          },
        ]),
        { status: 200 }
      )
    );
    vi.mocked(hentSeksjon).mockResolvedValue(
      new Response(
        JSON.stringify({
          seksjon: {
            seksjonsvar: {
              hvordanHarDuJobbet: "fastArbeidstidI6MånederEllerMer",
              registrerteArbeidsforhold: [
                {
                  id: "1",
                  navnetPåBedriften: "Firma AS",
                },
              ],
            },
          },
        }),
        { status: 200 }
      )
    );

    const resultat = await hentTidligereArbeidsforhold(request, currentSoknadId);

    expect(hentSeksjon).toHaveBeenCalledWith(request, "nyeste-soknad", "arbeidsforhold");
    expect(resultat).toEqual({
      hvordanHarDuJobbet: "fastArbeidstidI6MånederEllerMer",
      registrerteArbeidsforhold: [
        {
          id: "1",
          navnetPåBedriften: "Firma AS",
        },
      ],
    });
  });

  it("skal returnere null ved HTTP-feil fra orkestrator", async () => {
    vi.mocked(hentOrkestratorSøknader).mockResolvedValue(new Response("nei", { status: 500 }));

    const resultat = await hentTidligereArbeidsforhold(request, currentSoknadId);

    expect(resultat).toBeNull();
    expect(hentSeksjon).not.toHaveBeenCalled();
  });

  it("skal returnere null når registrerte arbeidsforhold er tom", async () => {
    vi.mocked(hentOrkestratorSøknader).mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            søknadId: "gyldig-soknad",
            status: "INNSENDT",
            innsendtTimestamp: "2026-06-20T12:00:00.000Z",
          },
        ]),
        { status: 200 }
      )
    );
    vi.mocked(hentSeksjon).mockResolvedValue(
      new Response(
        JSON.stringify({
          seksjon: {
            seksjonsvar: {
              hvordanHarDuJobbet: "fastArbeidstidIMindreEnn6Måneder",
              registrerteArbeidsforhold: [],
            },
          },
        }),
        { status: 200 }
      )
    );

    const resultat = await hentTidligereArbeidsforhold(request, currentSoknadId);

    expect(resultat).toBeNull();
  });
});
