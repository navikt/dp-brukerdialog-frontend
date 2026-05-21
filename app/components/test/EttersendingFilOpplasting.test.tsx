// @vitest-environment jsdom

import type { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { EttersendingFilOpplasting } from "../EttersendingFilOpplasting";

import type {
  Dokumentasjonskrav,
  DokumentkravFil
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

import {
  DokumentasjonskravFeilType,
  DokumentasjonskravType,
  FilOpplastingFeilType
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

import {
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst
} from "~/utils/dokument.utils";

const mocks = vi.hoisted(() => ({
  oppdaterEttersending: vi.fn(),
  valideringStartet: false
}));

vi.mock("react-router", () => ({
  useParams: () => ({
    soknadId: "soknad-123"
  })
}));

vi.mock("~/seksjon/ettersending/ettersending.context", () => ({
  useEttersending: () => ({
    oppdaterEttersending: mocks.oppdaterEttersending,
    valideringStartet: mocks.valideringStartet
  })
}));

vi.mock("~/utils/env.utils", () => ({
  getEnv: () => ""
}));

vi.mock("~/seksjon/dokumentasjon/v1/DokumentasjonskravInnhold", () => ({
  DokumentasjonskravInnhold: ({ type }: { type: DokumentasjonskravType }) => (
    <div data-testid="dokumentasjonskrav-innhold">{type}</div>
  )
}));

vi.mock("@navikt/ds-react", () => ({
  Box: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  VStack: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  HStack: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Heading: ({ children }: { children: ReactNode }) => <h3>{children}</h3>,
  Tag: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  ErrorMessage: ({ children }: { children: ReactNode }) => <div role="alert">{children}</div>,
  FileObject: class FileObject {}
}));

vi.mock("@navikt/ds-react/FileUpload", () => ({
  FileUploadDropzone: ({
    label,
    description,
    accept,
    fileLimit,
    onSelect
  }: {
    label: string;
    description: string;
    accept: string;
    fileLimit: { max: number; current: number };
    onSelect: (files: Array<{ file: File }>) => void;
  }) => (
    <div>
      <label htmlFor="ettersending-file-upload">{label}</label>
      <p>{description}</p>

      <input
        id="ettersending-file-upload"
        aria-label={label}
        type="file"
        multiple
        data-accept={accept}
        data-current={fileLimit.current}
        data-max={fileLimit.max}
        onChange={(event) => {
          const files = Array.from(event.currentTarget.files ?? []).map((file) => ({
            file
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
    button
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
  )
}));

function lagEttersending(overrides: Partial<Dokumentasjonskrav> = {}): Dokumentasjonskrav {
  return {
    id: "ettersending-123",
    spørsmålId: "sporsmal-123",
    tittel: "Ettersending test",
    skjemakode: "TEST_SKJEMA",
    seksjonId: "seksjon-123",
    type: DokumentasjonskravType.Barn,
    filer: undefined,
    ...overrides
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
          filsti: "tmp/test.pdf"
        }
      ],
      text: async () => "ok"
    })
  );
}

beforeEach(() => {
  mocks.oppdaterEttersending.mockClear();
  mocks.valideringStartet = false;
  mockFetchOk();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("EttersendingFilOpplasting", () => {
  it("viser tittel, status og opplastingsfelt med beskrivelse", () => {
    render(<EttersendingFilOpplasting ettersending={lagEttersending()} />);

    const input = screen.getByLabelText("Last opp dokument");

    expect(screen.getByRole("heading", { name: "Ettersending test" })).toBeInTheDocument();
    expect(screen.getByText("Mangler")).toBeInTheDocument();
    expect(screen.getByTestId("dokumentasjonskrav-innhold")).toHaveTextContent(
      DokumentasjonskravType.Barn
    );

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

  it("bruker fallback-tittel når tittel mangler", () => {
    render(
      <EttersendingFilOpplasting
        ettersending={lagEttersending({
          tittel: undefined
        })}
      />
    );

    expect(screen.getByRole("heading", { name: "Dokumentasjon" })).toBeInTheDocument();
  });

  it("laster opp gyldig fil og oppdaterer ettersending", async () => {
    const user = userEvent.setup();

    render(<EttersendingFilOpplasting ettersending={lagEttersending()} />);

    const file = new File(["content"], "test.pdf", {
      type: "application/pdf"
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/dokumentasjonskrav/soknad-123/ettersending-123/last-opp-fil",
        expect.objectContaining({
          method: "POST",
          body: expect.any(FormData)
        })
      );
    });

    expect(mocks.oppdaterEttersending).toHaveBeenCalledTimes(2);

    expect(mocks.oppdaterEttersending).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "test.pdf",
            lasterOpp: true,
            file
          })
        ]
      })
    );

    expect(mocks.oppdaterEttersending).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "test.pdf",
            storrelse: 7,
            filsti: "tmp/test.pdf",
            lasterOpp: false,
            feil: undefined
          })
        ]
      })
    );
  });

  it("setter feil når filformatet ikke er tillatt", async () => {
    const user = userEvent.setup();

    render(<EttersendingFilOpplasting ettersending={lagEttersending()} />);

    const file = new File(["content"], "test.txt", {
      type: "text/plain"
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    expect(fetch).not.toHaveBeenCalled();

    expect(mocks.oppdaterEttersending).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "test.txt",
            feil: FilOpplastingFeilType.UGYLDIG_FORMAT
          })
        ]
      })
    );
  });

  it("setter feil når filen er duplikat", async () => {
    const user = userEvent.setup();

    const eksisterendeFil: DokumentkravFil = {
      id: "existing-file",
      filnavn: "test.pdf",
      storrelse: 7,
      filsti: "tmp/existing.pdf"
    };

    render(
      <EttersendingFilOpplasting
        ettersending={lagEttersending({
          filer: [eksisterendeFil]
        })}
      />
    );

    const file = new File(["content"], "test.pdf", {
      type: "application/pdf"
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    expect(fetch).not.toHaveBeenCalled();

    expect(mocks.oppdaterEttersending).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: [
          eksisterendeFil,
          expect.objectContaining({
            filnavn: "test.pdf",
            feil: FilOpplastingFeilType.DUPLIKAT_FIL
          })
        ]
      })
    );
  });

  it("setter feil når filen er for stor", async () => {
    const user = userEvent.setup();

    render(<EttersendingFilOpplasting ettersending={lagEttersending()} />);

    const file = new File([new Uint8Array(MAX_FIL_STØRRELSE + 1)], "stor.pdf", {
      type: "application/pdf"
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    expect(fetch).not.toHaveBeenCalled();

    expect(mocks.oppdaterEttersending).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "stor.pdf",
            feil: FilOpplastingFeilType.FIL_FOR_STOR
          })
        ]
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
        text: async () => ""
      })
    );

    render(<EttersendingFilOpplasting ettersending={lagEttersending()} />);

    const file = new File(["content"], "test.pdf", {
      type: "application/pdf"
    });

    await user.upload(screen.getByLabelText("Last opp dokument"), file);

    await waitFor(() => {
      expect(mocks.oppdaterEttersending).toHaveBeenCalledTimes(2);
    });

    expect(mocks.oppdaterEttersending).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        filer: [
          expect.objectContaining({
            filnavn: "test.pdf",
            storrelse: 7,
            lasterOpp: false,
            feil: FilOpplastingFeilType.TEKNISK_FEIL
          })
        ]
      })
    );
  });

  it("sletter lokal fil uten å kalle API når filsti mangler", async () => {
    const user = userEvent.setup();

    render(
      <EttersendingFilOpplasting
        ettersending={lagEttersending({
          filer: [
            {
              id: "file-1",
              filnavn: "test.pdf",
              storrelse: 7
            }
          ]
        })}
      />
    );

    await user.click(screen.getByRole("button", { name: "Slett test.pdf" }));

    expect(fetch).not.toHaveBeenCalled();

    expect(mocks.oppdaterEttersending).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: undefined,
        feil: undefined
      })
    );
  });

  it("sletter lagret fil via API når filsti finnes", async () => {
    const user = userEvent.setup();

    render(
      <EttersendingFilOpplasting
        ettersending={lagEttersending({
          filer: [
            {
              id: "file-1",
              filnavn: "test.pdf",
              storrelse: 7,
              filsti: "tmp/test.pdf"
            }
          ]
        })}
      />
    );

    await user.click(screen.getByRole("button", { name: "Slett test.pdf" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/dokumentasjonskrav/soknad-123/ettersending-123/slett-fil",
        expect.objectContaining({
          method: "POST",
          body: expect.any(FormData)
        })
      );
    });

    expect(mocks.oppdaterEttersending).toHaveBeenCalledWith(
      expect.objectContaining({
        filer: undefined,
        feil: undefined
      })
    );
  });

  it("setter slettefeil når sletting via API feiler", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => [],
        text: async () => ""
      })
    );

    render(
      <EttersendingFilOpplasting
        ettersending={lagEttersending({
          filer: [
            {
              id: "file-1",
              filnavn: "test.pdf",
              storrelse: 7,
              filsti: "tmp/test.pdf"
            }
          ]
        })}
      />
    );

    await user.click(screen.getByRole("button", { name: "Slett test.pdf" }));

    await waitFor(() => {
      expect(mocks.oppdaterEttersending).toHaveBeenCalledWith(
        expect.objectContaining({
          filer: [
            expect.objectContaining({
              id: "file-1",
              feil: FilOpplastingFeilType.SLETTING_FEIL
            })
          ],
          feil: DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL
        })
      );
    });
  });

  it("viser ikke feilmelding for filfeil før validering er startet", () => {
    render(
      <EttersendingFilOpplasting
        ettersending={lagEttersending({
          filer: [
            {
              id: "file-1",
              filnavn: "test.txt",
              feil: FilOpplastingFeilType.UGYLDIG_FORMAT
            }
          ]
        })}
      />
    );

    expect(
      screen.queryByText("Du må rette feilen over før dokumentasjon kan sendes inn.")
    ).not.toBeInTheDocument();
  });

  it("viser feilmelding når validering er startet og en fil har feil", () => {
    mocks.valideringStartet = true;

    render(
      <EttersendingFilOpplasting
        ettersending={lagEttersending({
          filer: [
            {
              id: "file-1",
              filnavn: "test.txt",
              feil: FilOpplastingFeilType.UGYLDIG_FORMAT
            }
          ]
        })}
      />
    );

    expect(
      screen.getByText("Du må rette feilen over før dokumentasjon kan sendes inn.")
    ).toBeInTheDocument();
  });
});
