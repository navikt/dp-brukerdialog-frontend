// @vitest-environment jsdom

import type { ReactNode } from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FilOpplasting } from "../FilOpplasting";

import type {
  Dokumentasjonskrav,
  DokumentkravFil,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

import {
  DokumentasjonskravFeilType,
  DokumentasjonskravType,
  FilOpplastingFeilType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

import {
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst,
} from "~/utils/dokument.utils";

import { dokumentkravSvarSendNå } from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.komponenter";

const mocks = vi.hoisted(() => ({
  oppdaterEtDokumentasjonskrav: vi.fn(),
}));

vi.mock("react-router", () => ({
  useParams: () => ({
    soknadId: "soknad-123",
  }),
}));

vi.mock("~/seksjon/dokumentasjon/v1/dokumentasjonskrav.context", () => ({
  useDokumentasjonskravContext: () => ({
    oppdaterEtDokumentasjonskrav: mocks.oppdaterEtDokumentasjonskrav,
  }),
}));

vi.mock("~/utils/env.utils", () => ({
  getEnv: () => "",
}));

vi.mock("@navikt/ds-react", () => ({
  Box: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  VStack: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  ErrorMessage: ({ children }: { children: ReactNode }) => <div role="alert">{children}</div>,
  FileObject: class FileObject {},
}));

vi.mock("@navikt/ds-react/FileUpload", () => ({
  FileUploadDropzone: ({
    label,
    description,
    accept,
    fileLimit,
    onSelect,
  }: {
    label: string;
    description: string;
    accept: string;
    fileLimit: { max: number; current: number };
    onSelect: (files: Array<{ file: File }>) => void;
  }) => (
    <div>
      <label htmlFor="file-upload">{label}</label>
      <p>{description}</p>

      <input
        id="file-upload"
        aria-label={label}
        type="file"
        multiple
        data-accept={accept}
        data-current={fileLimit.current}
        data-max={fileLimit.max}
        onChange={(event) => {
          const files = Array.from(event.currentTarget.files ?? []).map((file) => ({
            file,
          }));

          onSelect(files);
        }}
      />
    </div>
  ),

  FileUploadItem: ({
    file,
    status,
    error,
    button,
  }: {
    file: { name?: string; size?: number };
    status: string;
    error?: string;
    button?: { onClick: () => void };
  }) => (
    <div data-testid="file-upload-item" data-status={status}>
      <span>{file.name}</span>

      {error && <span role="alert">{error}</span>}

      {button && (
        <button type="button" onClick={button.onClick}>
          Slett {file.name}
        </button>
      )}
    </div>
  ),
}));

function lagDokumentasjonskrav(overrides: Partial<Dokumentasjonskrav> = {}): Dokumentasjonskrav {
  return {
    id: "krav-123",
    spørsmålId: "sporsmal-123",
    tittel: "Testkrav",
    skjemakode: "TEST_SKJEMA",
    seksjonId: "seksjon-123",
    type: DokumentasjonskravType.Barn,
    svar: undefined,
    begrunnelse: "Eksisterende begrunnelse",
    filer: undefined,
    bundle: undefined,
    feil: undefined,
    skjemaSvar: undefined,
    ...overrides,
  };
}

function mockFetchOk() {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          filnavn: "test.pdf",
          storrelse: 7,
          filsti: "tmp/test.pdf",
        },
      ],
      text: async () => "ok",
    })
  );
}

beforeEach(() => {
  mocks.oppdaterEtDokumentasjonskrav.mockClear();
  mockFetchOk();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("FilOpplasting", () => {
  it("viser opplastingsfelt med beskrivelse", () => {
    render(<FilOpplasting dokumentasjonskrav={lagDokumentasjonskrav()} />);

    const input = screen.getByLabelText("Last opp dokument");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("data-max", String(MAX_ANTALL_FILER));
    expect(input).toHaveAttribute("data-current", "0");
    expect(input).toHaveAttribute("data-accept", hentTillatteFiltyperString());

    expect(
      screen.getByText(
        `Maks filstørrelse er ${hentMaksFilStørrelseMB()} MB, og tillatte filtyper er ${hentTillatteFiltyperTekst()}.`
      )
    ).toBeInTheDocument();
  });

  it("laster opp gyldig fil og oppdaterer dokumentasjonskravet", async () => {
    const user = userEvent.setup();

    render(<FilOpplasting dokumentasjonskrav={lagDokumentasjonskrav()} />);

    const file = new File(["content"], "test.pdf", {
      type: "application/pdf",
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/dokumentasjonskrav/soknad-123/krav-123/last-opp-fil",
        expect.objectContaining({
          method: "POST",
          body: expect.any(FormData),
        })
      );
    });

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledTimes(2);

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "test.pdf",
            lasterOpp: true,
            file,
          }),
        ],
        feil: undefined,
      })
    );

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "test.pdf",
            storrelse: 7,
            filsti: "tmp/test.pdf",
            lasterOpp: false,
            feil: undefined,
          }),
        ],
        begrunnelse: undefined,
        svar: dokumentkravSvarSendNå,
        feil: undefined,
      })
    );
  });

  it("setter feil når filformatet ikke er tillatt", async () => {
    const user = userEvent.setup();

    render(<FilOpplasting dokumentasjonskrav={lagDokumentasjonskrav()} />);

    const file = new File(["content"], "test.txt", {
      type: "text/plain",
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    expect(fetch).not.toHaveBeenCalled();

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "test.txt",
            feil: FilOpplastingFeilType.UGYLDIG_FORMAT,
          }),
        ],
        feil: DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL,
      })
    );
  });

  it("setter feil når filen er duplikat", async () => {
    const user = userEvent.setup();

    const eksisterendeFil: DokumentkravFil = {
      id: "existing-file",
      filnavn: "test.pdf",
      storrelse: 7,
      filsti: "tmp/existing.pdf",
    };

    render(
      <FilOpplasting
        dokumentasjonskrav={lagDokumentasjonskrav({
          filer: [eksisterendeFil],
        })}
      />
    );

    const file = new File(["content"], "test.pdf", {
      type: "application/pdf",
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    expect(fetch).not.toHaveBeenCalled();

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: [
          eksisterendeFil,
          expect.objectContaining({
            filnavn: "test.pdf",
            feil: FilOpplastingFeilType.DUPLIKAT_FIL,
          }),
        ],
        feil: DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL,
      })
    );
  });

  it("setter feil når filen er for stor", async () => {
    const user = userEvent.setup();

    render(<FilOpplasting dokumentasjonskrav={lagDokumentasjonskrav()} />);

    const file = new File([new Uint8Array(MAX_FIL_STØRRELSE + 1)], "stor.pdf", {
      type: "application/pdf",
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    expect(fetch).not.toHaveBeenCalled();

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "stor.pdf",
            feil: FilOpplastingFeilType.FIL_FOR_STOR,
          }),
        ],
        feil: DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL,
      })
    );
  });

  it("setter teknisk feil når opplasting feiler", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => [],
        text: async () => "",
      })
    );

    render(<FilOpplasting dokumentasjonskrav={lagDokumentasjonskrav()} />);

    const file = new File(["content"], "test.pdf", {
      type: "application/pdf",
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    await waitFor(() => {
      expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledTimes(2);
    });

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "test.pdf",
            storrelse: 7,
            lasterOpp: false,
            feil: FilOpplastingFeilType.TEKNISK_FEIL,
          }),
        ],
      })
    );
  });

  it("sletter lokal fil uten å kalle API når filsti mangler", async () => {
    const user = userEvent.setup();

    render(
      <FilOpplasting
        dokumentasjonskrav={lagDokumentasjonskrav({
          filer: [
            {
              id: "file-1",
              filnavn: "test.pdf",
              storrelse: 7,
            },
          ],
        })}
      />
    );

    await user.click(screen.getByRole("button", { name: "Slett test.pdf" }));

    expect(fetch).not.toHaveBeenCalled();

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: undefined,
        feil: undefined,
      })
    );
  });

  it("sletter lagret fil via API når filsti finnes", async () => {
    const user = userEvent.setup();

    render(
      <FilOpplasting
        dokumentasjonskrav={lagDokumentasjonskrav({
          filer: [
            {
              id: "file-1",
              filnavn: "test.pdf",
              storrelse: 7,
              filsti: "tmp/test.pdf",
            },
          ],
        })}
      />
    );

    await user.click(screen.getByRole("button", { name: "Slett test.pdf" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/dokumentasjonskrav/soknad-123/krav-123/slett-fil",
        expect.objectContaining({
          method: "POST",
          body: expect.any(FormData),
        })
      );
    });

    expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: undefined,
        feil: undefined,
      })
    );
  });

  it("viser feilmelding når filer mangler", () => {
    render(
      <FilOpplasting
        dokumentasjonskrav={lagDokumentasjonskrav({
          filer: [],
          feil: DokumentasjonskravFeilType.MANGLER_FILER,
        })}
      />
    );

    expect(
      screen.getByText("Du må laste opp minst en fil før dokumentasjonen kan sendes inn.")
    ).toBeInTheDocument();
  });

  it("viser feilmelding når en opplastet fil har feil", () => {
    render(
      <FilOpplasting
        dokumentasjonskrav={lagDokumentasjonskrav({
          feil: DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL,
          filer: [
            {
              id: "file-1",
              filnavn: "test.txt",
              feil: FilOpplastingFeilType.UGYLDIG_FORMAT,
            },
          ],
        })}
      />
    );

    expect(
      screen.getByText("Du må rette feilen over før dokumentasjon kan sendes inn.")
    ).toBeInTheDocument();
  });
});
