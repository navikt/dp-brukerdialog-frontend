// @vitest-environment jsdom

import type { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DokumentasjonskravKomponent } from "../DokumentasjonskravKomponent";

import type { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import {
  DokumentasjonskravFeilType,
  DokumentasjonskravType
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

import {
  dokumentkravSvarSenderSenere,
  dokumentkravSvarSendNå,
  velgHvaDuVilGjøre
} from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.komponenter";

const mocks = vi.hoisted(() => ({
  oppdaterEtDokumentasjonskrav: vi.fn(),
  valideringsTeller: 0,
  formValues: {} as Record<string, string | undefined>,
  formIsValid: true,
  validate: vi.fn()
}));

vi.mock("react-router", () => ({
  Form: ({ children }: { children: ReactNode }) => <form>{children}</form>
}));

vi.mock("@rvf/react-router", () => ({
  useForm: () => ({
    getFormProps: () => ({}),
    scope: (id: string) => ({ id }),
    validate: mocks.validate,
    formState: {
      isValid: mocks.formIsValid
    },
    transient: {
      value: () => mocks.formValues
    },
    value: (field?: string) => {
      if (!field) {
        return mocks.formValues;
      }

      return mocks.formValues[field];
    }
  })
}));

vi.mock("../dokumentasjonskrav.context", () => ({
  useDokumentasjonskravContext: () => ({
    oppdaterEtDokumentasjonskrav: mocks.oppdaterEtDokumentasjonskrav,
    valideringsTeller: mocks.valideringsTeller
  })
}));

vi.mock("~/hooks/useNullstillSkjulteFelter", () => ({
  useNullstillSkjulteFelter: vi.fn()
}));

vi.mock("~/components/FilOpplasting", () => ({
  FilOpplasting: () => <div data-testid="filopplasting">FilOpplasting</div>
}));

vi.mock("~/components/Komponent", () => ({
  Komponent: ({ props }: { props: { id: string } }) => (
    <div data-testid={`komponent-${props.id}`}>{props.id}</div>
  )
}));

vi.mock("../DokumentasjonskravInnhold", () => ({
  DokumentasjonskravInnhold: ({ type }: { type: DokumentasjonskravType }) => (
    <div data-testid="dokumentasjonskrav-innhold">{type}</div>
  )
}));

vi.mock("../dokumentasjonskrav.schema", () => ({
  dokumentasjonskravSchema: {}
}));

vi.mock("@navikt/ds-react", () => ({
  Box: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  VStack: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Heading: ({ children }: { children: ReactNode }) => <h3>{children}</h3>
}));

function lagDokumentasjonskrav(overrides: Partial<Dokumentasjonskrav> = {}): Dokumentasjonskrav {
  return {
    id: "krav-123",
    spørsmålId: "sporsmal-123",
    tittel: "Testkrav",
    skjemakode: "TEST_SKJEMA",
    seksjonId: "seksjon-123",
    type: DokumentasjonskravType.Barn,
    ...overrides
  };
}

beforeEach(() => {
  mocks.oppdaterEtDokumentasjonskrav.mockClear();
  mocks.validate.mockClear();
  mocks.valideringsTeller = 0;
  mocks.formIsValid = true;
  mocks.formValues = {};
});

describe("DokumentasjonskravKomponent", () => {
  it("viser FilOpplasting når bruker har valgt å sende dokumentasjon nå", () => {
    mocks.formValues = {
      [velgHvaDuVilGjøre]: dokumentkravSvarSendNå
    };

    render(
      <DokumentasjonskravKomponent
        dokumentasjonskrav={lagDokumentasjonskrav({
          svar: dokumentkravSvarSendNå
        })}
      />
    );

    expect(screen.getByRole("heading", { name: "Testkrav" })).toBeInTheDocument();
    expect(screen.getByTestId("dokumentasjonskrav-innhold")).toHaveTextContent(
      DokumentasjonskravType.Barn
    );
    expect(screen.getByTestId("filopplasting")).toBeInTheDocument();
  });

  it("viser ikke FilOpplasting når bruker har valgt å sende dokumentasjon senere", () => {
    mocks.formValues = {
      [velgHvaDuVilGjøre]: dokumentkravSvarSenderSenere
    };

    render(
      <DokumentasjonskravKomponent
        dokumentasjonskrav={lagDokumentasjonskrav({
          svar: dokumentkravSvarSenderSenere
        })}
      />
    );

    expect(screen.queryByTestId("filopplasting")).not.toBeInTheDocument();
  });

  it("validerer skjema når valideringsTeller er større enn 0", async () => {
    mocks.valideringsTeller = 1;
    mocks.formValues = {
      [velgHvaDuVilGjøre]: dokumentkravSvarSenderSenere
    };

    render(
      <DokumentasjonskravKomponent
        dokumentasjonskrav={lagDokumentasjonskrav({
          svar: dokumentkravSvarSenderSenere
        })}
      />
    );

    await waitFor(() => {
      expect(mocks.validate).toHaveBeenCalled();
    });
  });

  it("setter MANGLER_FILER når validering er startet, bruker sender nå og ingen filer finnes", async () => {
    mocks.valideringsTeller = 1;
    mocks.formValues = {
      [velgHvaDuVilGjøre]: dokumentkravSvarSendNå
    };

    render(
      <DokumentasjonskravKomponent
        dokumentasjonskrav={lagDokumentasjonskrav({
          svar: dokumentkravSvarSendNå,
          filer: []
        })}
      />
    );

    await waitFor(() => {
      expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledWith(
        expect.objectContaining({
          feil: DokumentasjonskravFeilType.MANGLER_FILER
        })
      );
    });
  });

  it("setter ikke MANGLER_FILER når bruker sender nå og filer finnes", async () => {
    mocks.valideringsTeller = 1;
    mocks.formValues = {
      [velgHvaDuVilGjøre]: dokumentkravSvarSendNå
    };

    render(
      <DokumentasjonskravKomponent
        dokumentasjonskrav={lagDokumentasjonskrav({
          svar: dokumentkravSvarSendNå,
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

    await waitFor(() => {
      expect(mocks.validate).toHaveBeenCalled();
    });

    expect(mocks.oppdaterEtDokumentasjonskrav).not.toHaveBeenCalledWith(
      expect.objectContaining({
        feil: DokumentasjonskravFeilType.MANGLER_FILER
      })
    );
  });

  it("setter VALIDERINGSFEIL når skjemaet ikke er gyldig", async () => {
    mocks.formIsValid = false;
    mocks.formValues = {
      [velgHvaDuVilGjøre]: dokumentkravSvarSenderSenere
    };

    render(
      <DokumentasjonskravKomponent
        dokumentasjonskrav={lagDokumentasjonskrav({
          svar: dokumentkravSvarSenderSenere
        })}
      />
    );

    await waitFor(() => {
      expect(mocks.oppdaterEtDokumentasjonskrav).toHaveBeenCalledWith(
        expect.objectContaining({
          feil: DokumentasjonskravFeilType.VALIDERINGSFEIL
        })
      );
    });
  });
});
