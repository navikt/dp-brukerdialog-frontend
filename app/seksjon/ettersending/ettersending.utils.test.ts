import { describe, expect, it } from "vitest";
import { harMinstEnFilOgIngenFeil, hentGyldigeEttersendingene } from "./ettersending.utils";
import {
  Dokumentasjonskrav,
  DokumentkravFil,
  DokumentasjonskravType,
  FilOpplastingFeilType,
} from "../dokumentasjon/dokumentasjon.types";

describe("hentGyldigeEttersendingene", () => {
  const mockDokumentasjonskrav = (
    id: string,
    filer?: DokumentkravFil[] | null
  ): Dokumentasjonskrav => ({
    id,
    spørsmålId: "test-spørsmål",
    skjemakode: "XYZ123",
    seksjonId: "arbeidsforhold",
    type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
    filer,
  });

  const mockFil = (id: string, feil?: FilOpplastingFeilType): DokumentkravFil => ({
    id,
    filnavn: `test-${id}.pdf`,
    storrelse: 1024,
    feil,
  });

  it("skal returnere ettersendinger med gyldige filer (ingen feil)", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
    ];

    const resultat = hentGyldigeEttersendingene(ettersendingene);

    expect(resultat).toHaveLength(2);
    expect(resultat[0].id).toBe("1");
    expect(resultat[1].id).toBe("2");
  });

  it("skal filtrere bort ettersendinger uten filer", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", undefined),
      mockDokumentasjonskrav("3", null),
      mockDokumentasjonskrav("4", []),
    ];

    const resultat = hentGyldigeEttersendingene(ettersendingene);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].id).toBe("1");
  });

  it("skal filtrere bort ettersendinger med tomme filer-array", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", []),
    ];

    const resultat = hentGyldigeEttersendingene(ettersendingene);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].id).toBe("1");
  });

  it("skal filtrere bort ettersendinger hvor minst én fil har feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [
        mockFil("fil-2"),
        mockFil("fil-3", FilOpplastingFeilType.FIL_FOR_STOR),
      ]),
      mockDokumentasjonskrav("3", [mockFil("fil-4", FilOpplastingFeilType.TEKNISK_FEIL)]),
    ];

    const resultat = hentGyldigeEttersendingene(ettersendingene);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].id).toBe("1");
  });

  it("skal håndtere alle FilOpplastingFeilType", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1", FilOpplastingFeilType.FIL_FOR_STOR)]),
      mockDokumentasjonskrav("2", [mockFil("fil-2", FilOpplastingFeilType.UGYLDIG_FORMAT)]),
      mockDokumentasjonskrav("3", [mockFil("fil-3", FilOpplastingFeilType.TEKNISK_FEIL)]),
      mockDokumentasjonskrav("4", [mockFil("fil-4", FilOpplastingFeilType.DUPLIKAT_FIL)]),
      mockDokumentasjonskrav("5", [mockFil("fil-5", FilOpplastingFeilType.UKJENT_FEIL)]),
      mockDokumentasjonskrav("6", [mockFil("fil-6")]),
    ];

    const resultat = hentGyldigeEttersendingene(ettersendingene);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].id).toBe("6");
  });

  it("skal returnere tom array når ingen ettersendinger er gyldige", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", undefined),
      mockDokumentasjonskrav("2", []),
      mockDokumentasjonskrav("3", [mockFil("fil-3", FilOpplastingFeilType.TEKNISK_FEIL)]),
    ];

    const resultat = hentGyldigeEttersendingene(ettersendingene);

    expect(resultat).toHaveLength(0);
  });

  it("skal returnere tom array når input er tom array", () => {
    const resultat = hentGyldigeEttersendingene([]);

    expect(resultat).toHaveLength(0);
  });

  it("skal håndtere ettersendinger med flere filer uten feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1"), mockFil("fil-2"), mockFil("fil-3")]),
    ];

    const resultat = hentGyldigeEttersendingene(ettersendingene);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].filer).toHaveLength(3);
  });

  it("skal filtrere bort hvis én av mange filer har feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [
        mockFil("fil-1"),
        mockFil("fil-2"),
        mockFil("fil-3", FilOpplastingFeilType.TEKNISK_FEIL),
        mockFil("fil-4"),
      ]),
    ];

    const resultat = hentGyldigeEttersendingene(ettersendingene);

    expect(resultat).toHaveLength(0);
  });
});

describe("harMinstEnGyldigEttersending", () => {
  const mockDokumentasjonskrav = (
    id: string,
    filer?: DokumentkravFil[] | null
  ): Dokumentasjonskrav => ({
    id,
    spørsmålId: "test-spørsmål",
    skjemakode: "XYZ123",
    seksjonId: "arbeidsforhold",
    type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
    filer,
  });

  const mockFil = (id: string, feil?: FilOpplastingFeilType): DokumentkravFil => ({
    id,
    filnavn: `test-${id}.pdf`,
    storrelse: 1024,
    feil,
  });

  it("skal returnere true når minst én ettersending har gyldige filer", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(true);
  });

  it("skal returnere false når noen ettersendinger har filer med feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", undefined),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
      mockDokumentasjonskrav("3", []),
      mockDokumentasjonskrav("4", [mockFil("fil-4", FilOpplastingFeilType.TEKNISK_FEIL)]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(false);
  });

  it("skal returnere false når ingen ettersendinger har filer", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", undefined),
      mockDokumentasjonskrav("2", null),
      mockDokumentasjonskrav("3", []),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(false);
  });

  it("skal returnere false når alle filer har feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1", FilOpplastingFeilType.FIL_FOR_STOR)]),
      mockDokumentasjonskrav("2", [mockFil("fil-2", FilOpplastingFeilType.TEKNISK_FEIL)]),
      mockDokumentasjonskrav("3", [mockFil("fil-3", FilOpplastingFeilType.UGYLDIG_FORMAT)]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(false);
  });

  it("skal returnere false når array er tom", () => {
    const resultat = harMinstEnFilOgIngenFeil([]);

    expect(resultat).toBe(false);
  });

  it("skal returnere false når en ettersending har én gyldig fil og én fil med feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [
        mockFil("fil-1"),
        mockFil("fil-2", FilOpplastingFeilType.FIL_FOR_STOR),
      ]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(false);
  });

  it("skal returnere true når én ettersending har flere gyldige filer", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1"), mockFil("fil-2"), mockFil("fil-3")]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(true);
  });

  it("skal returnere true når alle ettersendinger med filer er gyldige", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", undefined),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
      mockDokumentasjonskrav("3", []),
      mockDokumentasjonskrav("4", [mockFil("fil-4")]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(true);
  });

  it("skal returnere false selv om noen ettersendinger er gyldige når andre har feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", undefined),
      mockDokumentasjonskrav("2", []),
      mockDokumentasjonskrav("3", [mockFil("fil-3", FilOpplastingFeilType.TEKNISK_FEIL)]),
      mockDokumentasjonskrav("4", null),
      mockDokumentasjonskrav("5", [mockFil("fil-5")]), // Én gyldig, men nr 3 har feil
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(false);
  });
});
