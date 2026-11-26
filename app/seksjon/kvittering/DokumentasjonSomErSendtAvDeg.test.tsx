// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Dokumentasjonskrav, DokumentasjonskravType } from "../dokumentasjon/dokumentasjon.types";
import { DokumentasjonskravSomErSendtAvDeg } from "./DokumentasjonSomErSendtAvDeg";

vi.mock("~/utils/env.utils", () => ({
  getEnv: () => "/soknad",
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (_key: string, { dato }: { dato: string }) => `Sendt av deg ${dato}`,
  }),
}));

const dokumentasjonskrav: Dokumentasjonskrav = {
  id: "krav-1",
  spørsmålId: "sporsmal-1",
  tittel: "Arbeidsavtale",
  skjemakode: "skjema",
  seksjonId: "arbeidsforhold",
  type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
  bundle: {
    filnavn: "arbeidsavtale.pdf",
    urn: "urn:dokument",
    filsti: "dokumenter/avtale med & tegn.pdf",
    storrelse: 100,
    tidspunkt: "2026-11-26T12:00:00Z",
  },
};

describe("DokumentasjonskravSomErSendtAvDeg", () => {
  it("lenker til dokumentet i en ny fane og viser innsendingsdato", () => {
    render(<DokumentasjonskravSomErSendtAvDeg dokumentasjonskrav={dokumentasjonskrav} />);

    const lenke = screen.getByRole("link", { name: "Arbeidsavtale" });
    const url = new URL(lenke.getAttribute("href")!, "https://example.com");

    expect(url.pathname).toBe("/soknad/api/dokumentasjonskrav/vis-fil");
    expect(url.searchParams.get("filsti")).toBe("dokumenter/avtale med & tegn.pdf");
    expect(lenke).toHaveAttribute("target", "_blank");
    expect(lenke).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("Sendt av deg 26. november 2026")).toBeInTheDocument();
  });

  it("viser tittelen uten lenke eller dato når bundle mangler", () => {
    render(
      <DokumentasjonskravSomErSendtAvDeg
        dokumentasjonskrav={{ ...dokumentasjonskrav, bundle: null }}
      />
    );

    expect(screen.getByText("Arbeidsavtale")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText(/Sendt av deg/)).not.toBeInTheDocument();
  });
});
