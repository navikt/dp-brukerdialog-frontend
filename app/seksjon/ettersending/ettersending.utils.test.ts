import { describe, expect, it } from "vitest";
import {
  harMinstEnFilOgIngenFeil,
  hentGyldigeEttersendingeneTilBundling,
  hentOppdaterteDokumentasjonskravene,
  hentOppdaterteDokumentasjonskravSeksjoner,
} from "./ettersending.utils";
import {
  Dokumentasjonskrav,
  DokumentkravFil,
  DokumentasjonskravType,
  FilOpplastingFeilType,
} from "../dokumentasjon/dokumentasjon.types";

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

describe("hentGyldigeEttersendingeneTilBundling", () => {
  it("skal returnere ettersendingene med gyldige filer (ingen feil)", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
    ];

    const resultat = hentGyldigeEttersendingeneTilBundling(ettersendingene);

    expect(resultat).toHaveLength(2);
    expect(resultat[0].id).toBe("1");
    expect(resultat[1].id).toBe("2");
  });

  it("skal filtrere bort ettersendingene uten filer", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", undefined),
      mockDokumentasjonskrav("3", null),
      mockDokumentasjonskrav("4", []),
    ];

    const resultat = hentGyldigeEttersendingeneTilBundling(ettersendingene);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].id).toBe("1");
  });

  it("skal filtrere bort ettersendingene med tomme filer-array", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", []),
    ];

    const resultat = hentGyldigeEttersendingeneTilBundling(ettersendingene);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].id).toBe("1");
  });

  it("skal filtrere bort ettersendingene hvor minst én fil har feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [
        mockFil("fil-2"),
        mockFil("fil-3", FilOpplastingFeilType.FIL_FOR_STOR),
      ]),
      mockDokumentasjonskrav("3", [mockFil("fil-4", FilOpplastingFeilType.TEKNISK_FEIL)]),
    ];

    const resultat = hentGyldigeEttersendingeneTilBundling(ettersendingene);

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

    const resultat = hentGyldigeEttersendingeneTilBundling(ettersendingene);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].id).toBe("6");
  });

  it("skal returnere tom array når ingen ettersendingene er gyldige", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", undefined),
      mockDokumentasjonskrav("2", []),
      mockDokumentasjonskrav("3", [mockFil("fil-3", FilOpplastingFeilType.TEKNISK_FEIL)]),
    ];

    const resultat = hentGyldigeEttersendingeneTilBundling(ettersendingene);

    expect(resultat).toHaveLength(0);
  });

  it("skal returnere tom array når input er tom array", () => {
    const resultat = hentGyldigeEttersendingeneTilBundling([]);

    expect(resultat).toHaveLength(0);
  });

  it("skal håndtere ettersendingene med flere filer uten feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1"), mockFil("fil-2"), mockFil("fil-3")]),
    ];

    const resultat = hentGyldigeEttersendingeneTilBundling(ettersendingene);

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

    const resultat = hentGyldigeEttersendingeneTilBundling(ettersendingene);

    expect(resultat).toHaveLength(0);
  });
});

describe("harMinstEnFilOgIngenFeil", () => {
  it("skal returnere true når minst én ettersending har gyldige filer", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(true);
  });

  it("skal returnere false når noen ettersendingene har filer med feil", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", undefined),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
      mockDokumentasjonskrav("3", []),
      mockDokumentasjonskrav("4", [mockFil("fil-4", FilOpplastingFeilType.TEKNISK_FEIL)]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(false);
  });

  it("skal returnere false når ingen ettersendingene har filer", () => {
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

  it("skal returnere true når alle ettersendingene med filer er gyldige", () => {
    const ettersendingene: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", undefined),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
      mockDokumentasjonskrav("3", []),
      mockDokumentasjonskrav("4", [mockFil("fil-4")]),
    ];

    const resultat = harMinstEnFilOgIngenFeil(ettersendingene);

    expect(resultat).toBe(true);
  });

  it("skal returnere false selv om noen ettersendingene er gyldige når andre har feil", () => {
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

describe("hentOppdaterteDokumentasjonskravene", () => {
  it("skal returnere oppdaterte dokumentasjonskrav når det finnes bundlet ettersendingene med samme id", () => {
    const opprinnelige: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
      mockDokumentasjonskrav("3", [mockFil("fil-3")]),
    ];

    const bundlet: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1-bundlet")]),
      mockDokumentasjonskrav("3", [mockFil("fil-3-bundlet")]),
    ];

    const resultat = hentOppdaterteDokumentasjonskravene(opprinnelige, bundlet);

    expect(resultat).toHaveLength(3);
    expect(resultat[0]).toBe(bundlet[0]);
    expect(resultat[1]).toBe(opprinnelige[1]);
    expect(resultat[2]).toBe(bundlet[1]);
  });

  it("skal returnere opprinnelige dokumentasjonskrav når ingen bundlet ettersendingene finnes", () => {
    const opprinnelige: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
    ];

    const bundlet: Dokumentasjonskrav[] = [];

    const resultat = hentOppdaterteDokumentasjonskravene(opprinnelige, bundlet);

    expect(resultat).toEqual(opprinnelige);
  });

  it("skal returnere opprinnelige dokumentasjonskravene når ingen id-er matcher", () => {
    const opprinnelige: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
    ];

    const bundlet: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("99", [mockFil("fil-99-bundlet")]),
      mockDokumentasjonskrav("100", [mockFil("fil-100-bundlet")]),
    ];

    const resultat = hentOppdaterteDokumentasjonskravene(opprinnelige, bundlet);

    expect(resultat).toEqual(opprinnelige);
  });

  it("skal returnere alle oppdaterte dokumentasjonskravene når alle id-er matcher", () => {
    const opprinnelige: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
      mockDokumentasjonskrav("3", [mockFil("fil-3")]),
    ];

    const bundlet: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1-bundlet")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2-bundlet")]),
      mockDokumentasjonskrav("3", [mockFil("fil-3-bundlet")]),
    ];

    const resultat = hentOppdaterteDokumentasjonskravene(opprinnelige, bundlet);

    expect(resultat).toEqual(bundlet);
  });

  it("skal beholde rekkefølgen fra opprinnelige dokumentasjonskravene", () => {
    const opprinnelige: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("1", [mockFil("fil-1")]),
      mockDokumentasjonskrav("2", [mockFil("fil-2")]),
      mockDokumentasjonskrav("3", [mockFil("fil-3")]),
      mockDokumentasjonskrav("4", [mockFil("fil-4")]),
    ];

    const bundlet: Dokumentasjonskrav[] = [
      mockDokumentasjonskrav("3", [mockFil("fil-3-bundlet")]),
      mockDokumentasjonskrav("1", [mockFil("fil-1-bundlet")]),
    ];

    const resultat = hentOppdaterteDokumentasjonskravene(opprinnelige, bundlet);

    expect(resultat[0].id).toBe("1");
    expect(resultat[1].id).toBe("2");
    expect(resultat[2].id).toBe("3");
    expect(resultat[3].id).toBe("4");
    expect(resultat[0].filer?.[0].id).toBe("fil-1-bundlet");
    expect(resultat[2].filer?.[0].id).toBe("fil-3-bundlet");
  });
});

describe("hentOppdaterteDokumentasjonskravSeksjoner", () => {
  it("skal gruppere dokumentasjonskravene etter seksjonId", () => {
    const ettersendingeneFerdigBundlet: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("2", [mockFil("fil-2")]), seksjonId: "utdanning" },
    ];

    const oppdaterteDokumentasjonskravene: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("2", [mockFil("fil-2")]), seksjonId: "utdanning" },
      { ...mockDokumentasjonskrav("3", [mockFil("fil-3")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("4", [mockFil("fil-4")]), seksjonId: "utdanning" },
    ];

    const resultat = hentOppdaterteDokumentasjonskravSeksjoner(
      ettersendingeneFerdigBundlet,
      oppdaterteDokumentasjonskravene
    );

    expect(resultat).toHaveLength(2);
    expect(resultat[0].seksjonId).toBe("arbeidsforhold");
    expect(resultat[0].dokumentasjonskravene).toHaveLength(2);
    expect(resultat[1].seksjonId).toBe("utdanning");
    expect(resultat[1].dokumentasjonskravene).toHaveLength(2);
  });

  it("skal returnere kun dokumentasjonskravene som tilhører hver seksjon", () => {
    const ettersendingeneFerdigBundlet: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
    ];

    const oppdaterteDokumentasjonskravene: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("2", [mockFil("fil-2")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("3", [mockFil("fil-3")]), seksjonId: "utdanning" },
    ];

    const resultat = hentOppdaterteDokumentasjonskravSeksjoner(
      ettersendingeneFerdigBundlet,
      oppdaterteDokumentasjonskravene
    );

    expect(resultat).toHaveLength(1);
    expect(resultat[0].seksjonId).toBe("arbeidsforhold");
    expect(resultat[0].dokumentasjonskravene).toHaveLength(2);
    expect(resultat[0].dokumentasjonskravene[0].id).toBe("1");
    expect(resultat[0].dokumentasjonskravene[1].id).toBe("2");
  });

  it("skal håndtere flere ettersendingene fra samme seksjon", () => {
    const ettersendingeneFerdigBundlet: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("2", [mockFil("fil-2")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("3", [mockFil("fil-3")]), seksjonId: "arbeidsforhold" },
    ];

    const oppdaterteDokumentasjonskravene: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("2", [mockFil("fil-2")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("3", [mockFil("fil-3")]), seksjonId: "arbeidsforhold" },
    ];

    const resultat = hentOppdaterteDokumentasjonskravSeksjoner(
      ettersendingeneFerdigBundlet,
      oppdaterteDokumentasjonskravene
    );

    expect(resultat).toHaveLength(1);
    expect(resultat[0].seksjonId).toBe("arbeidsforhold");
    expect(resultat[0].dokumentasjonskravene).toHaveLength(3);
  });

  it("skal returnere tom array når bundlede ettersendinger er tom", () => {
    const ettersendingeneFerdigBundlet: Dokumentasjonskrav[] = [];

    const oppdaterteDokumentasjonskravene: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
    ];

    const resultat = hentOppdaterteDokumentasjonskravSeksjoner(
      ettersendingeneFerdigBundlet,
      oppdaterteDokumentasjonskravene
    );

    expect(resultat).toHaveLength(0);
  });

  it("skal beholde rekkefølgen på seksjonene basert på første forekomst i bundlet ettersendingene", () => {
    const ettersendingeneFerdigBundlet: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "utdanning" },
      { ...mockDokumentasjonskrav("2", [mockFil("fil-2")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("3", [mockFil("fil-3")]), seksjonId: "verneplikt" },
    ];

    const oppdaterteDokumentasjonskravene: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "utdanning" },
      { ...mockDokumentasjonskrav("2", [mockFil("fil-2")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("3", [mockFil("fil-3")]), seksjonId: "verneplikt" },
    ];

    const resultat = hentOppdaterteDokumentasjonskravSeksjoner(
      ettersendingeneFerdigBundlet,
      oppdaterteDokumentasjonskravene
    );

    expect(resultat).toHaveLength(3);
    expect(resultat[0].seksjonId).toBe("utdanning");
    expect(resultat[1].seksjonId).toBe("arbeidsforhold");
    expect(resultat[2].seksjonId).toBe("verneplikt");
  });

  it("skal kun inkludere seksjoner som har ferdig bundle ettersendingene", () => {
    const ettersendingeneFerdigBundlet: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
    ];

    const oppdaterteDokumentasjonskravene: Dokumentasjonskrav[] = [
      { ...mockDokumentasjonskrav("1", [mockFil("fil-1")]), seksjonId: "arbeidsforhold" },
      { ...mockDokumentasjonskrav("2", [mockFil("fil-2")]), seksjonId: "utdanning" },
      { ...mockDokumentasjonskrav("3", [mockFil("fil-3")]), seksjonId: "verneplikt" },
    ];

    const resultat = hentOppdaterteDokumentasjonskravSeksjoner(
      ettersendingeneFerdigBundlet,
      oppdaterteDokumentasjonskravene
    );

    expect(resultat).toHaveLength(1);
    expect(resultat[0].seksjonId).toBe("arbeidsforhold");
    expect(resultat[0].dokumentasjonskravene).toHaveLength(1);
  });
});
