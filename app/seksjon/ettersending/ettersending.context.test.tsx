// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import {
  Bundle,
  Dokumentasjonskrav,
  DokumentasjonskravType,
  FilOpplastingFeilType,
} from "../dokumentasjon/dokumentasjon.types";
import {
  dokumentkravEttersendt,
  dokumentkravSvarSenderSenere,
} from "../dokumentasjon/v1/dokumentasjonskrav.komponenter";
import { EttersendingProvider, useEttersending } from "./ettersending.context";
import { bundleFiler, lagreEttersending } from "./ettersending.utils";

const bundle: Bundle = {
  filnavn: "bundle.pdf",
  urn: "urn:bundle",
  filsti: "bundle.pdf",
  storrelse: 1024,
  tidspunkt: "2026-11-25T19:00:00Z",
};

vi.mock("./ettersending.utils", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./ettersending.utils")>()),
  bundleFiler: vi.fn(),
  lagreEttersending: vi.fn(),
}));

function krav(id: string, overrides: Partial<Dokumentasjonskrav> = {}): Dokumentasjonskrav {
  return {
    id,
    spørsmålId: id,
    seksjonId: "arbeidsforhold",
    skjemakode: "TEST",
    type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
    svar: dokumentkravSvarSenderSenere,
    filer: [{ id: `fil-${id}`, filnavn: `${id}.pdf`, urn: `urn:${id}` }],
    ...overrides,
  };
}

function renderEttersending(kravene: Dokumentasjonskrav[]) {
  return renderHook(() => useEttersending(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <EttersendingProvider
        søknadId="soknad-123"
        dokumentasjonskravene={kravene}
        ettersendingene={kravene}
      >
        {children}
      </EttersendingProvider>
    ),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(bundleFiler).mockResolvedValue(bundle);
  vi.mocked(lagreEttersending).mockResolvedValue(true);
});

describe("innsending per dokumentasjonskrav", () => {
  it("sender bare valgt krav og bevarer tidligere innsending ved neste lagring i samme seksjon", async () => {
    const a = krav("a");
    const b = krav("b");
    const c = krav("c", { seksjonId: "barnetillegg", filer: [] });
    const { result } = renderEttersending([a, b, c]);

    await act(() => result.current.validerOgLagre("a"));

    expect(bundleFiler).toHaveBeenCalledExactlyOnceWith(a, "soknad-123");
    expect(lagreEttersending).toHaveBeenLastCalledWith("soknad-123", "arbeidsforhold", [
      expect.objectContaining({ id: "a", svar: dokumentkravEttersendt }),
      b,
    ]);
    expect(result.current.ettersendingene).toEqual([b, c]);

    await act(() => result.current.validerOgLagre("b"));

    expect(lagreEttersending).toHaveBeenLastCalledWith("soknad-123", "arbeidsforhold", [
      expect.objectContaining({ id: "a", svar: dokumentkravEttersendt }),
      expect.objectContaining({ id: "b", svar: dokumentkravEttersendt }),
    ]);
    expect(result.current.ettersendingene).toEqual([c]);
    expect(result.current.dokumentasjonskravene[2]).toEqual(c);
  });

  it("lar ikke filfeil på et annet krav blokkere innsendingen", async () => {
    const a = krav("a");
    const b = krav("b", {
      filer: [{ id: "feil", filnavn: "feil.pdf", feil: FilOpplastingFeilType.TEKNISK_FEIL }],
    });
    const { result } = renderEttersending([a, b]);

    await act(() => result.current.validerOgLagre("a"));

    expect(bundleFiler).toHaveBeenCalledExactlyOnceWith(a, "soknad-123");
    expect(result.current.ettersendingene).toEqual([b]);
    expect(result.current.validerteKrav).toEqual(["a"]);
  });

  it.each([
    { filer: [] },
    { filer: [{ id: "fil", filnavn: "test.pdf", lasterOpp: true }] },
    {
      filer: [{ id: "fil", filnavn: "test.pdf", feil: FilOpplastingFeilType.TEKNISK_FEIL }],
    },
  ])("bundler ikke et krav uten ferdige, gyldige filer: %j", async (overrides) => {
    const { result } = renderEttersending([krav("a", overrides)]);

    await act(() => result.current.validerOgLagre("a"));

    expect(bundleFiler).not.toHaveBeenCalled();
    expect(lagreEttersending).not.toHaveBeenCalled();
    expect(result.current.validerteKrav).toEqual(["a"]);
  });

  it.each(["bundling", "lagring"])(
    "beholder kravet for nytt forsøk ved feil i %s",
    async (steg) => {
      if (steg === "bundling") vi.mocked(bundleFiler).mockResolvedValueOnce(null);
      else vi.mocked(lagreEttersending).mockResolvedValueOnce(false);
      const a = krav("a");
      const { result } = renderEttersending([a]);

      await act(() => result.current.validerOgLagre("a"));

      expect(result.current.tekniskeFeilKrav).toEqual(["a"]);
      expect(result.current.dokumentasjonskravene).toEqual([a]);
      expect(result.current.ettersendingene).toEqual([a]);
      expect(result.current.lagrer).toBe(false);
      if (steg === "bundling") expect(lagreEttersending).not.toHaveBeenCalled();

      await act(() => result.current.validerOgLagre("a"));

      expect(result.current.tekniskeFeilKrav).toEqual([]);
      expect(result.current.ettersendingene).toEqual([]);
    }
  );

  it("hindrer doble eller samtidige innsendinger", async () => {
    let fullførBundle!: (bundle: Bundle | null) => void;
    vi.mocked(bundleFiler).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          fullførBundle = resolve;
        })
    );
    const a = krav("a");
    const { result } = renderEttersending([a, krav("b")]);
    let innsending!: Promise<void>;

    act(() => {
      innsending = result.current.validerOgLagre("a");
    });
    expect(result.current.lagrerKravId).toBe("a");

    await act(async () => {
      await result.current.validerOgLagre("a");
      await result.current.validerOgLagre("b");
      fullførBundle(bundle);
      await innsending;
    });

    expect(bundleFiler).toHaveBeenCalledExactlyOnceWith(a, "soknad-123");
    expect(lagreEttersending).toHaveBeenCalledTimes(1);
    expect(result.current.lagrer).toBe(false);
  });
});
