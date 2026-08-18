type Konfig = {
  seksjonId: seksjonId;
  nyesteVersjon?: number;
};

export type SeksjonNavigasjon = {
  forrigeSeksjonId?: seksjonId;
  nesteSeksjonId?: seksjonId;
};

export type SeksjonConfig = Konfig & {
  nyesteVersjon: number;
};

type seksjonId =
  | "personalia"
  | "din-situasjon"
  | "arbeidsforhold"
  | "annen-pengestotte"
  | "egen-naring"
  | "verneplikt"
  | "utdanning"
  | "barnetillegg"
  | "reell-arbeidssoker"
  | "tilleggsopplysninger"
  | "dokumentasjon"
  | "oppsummering"
  | "kvittering";

export const seksjonKonfig = [
  { seksjonId: "personalia", nyesteVersjon: 1 },
  { seksjonId: "din-situasjon", nyesteVersjon: 1 },
  { seksjonId: "arbeidsforhold", nyesteVersjon: 2 },
  { seksjonId: "annen-pengestotte", nyesteVersjon: 1 },
  { seksjonId: "egen-naring", nyesteVersjon: 1 },
  { seksjonId: "verneplikt", nyesteVersjon: 1 },
  { seksjonId: "utdanning", nyesteVersjon: 1 },
  { seksjonId: "barnetillegg", nyesteVersjon: 1 },
  { seksjonId: "reell-arbeidssoker", nyesteVersjon: 1 },
  { seksjonId: "tilleggsopplysninger", nyesteVersjon: 1 },
  { seksjonId: "dokumentasjon", nyesteVersjon: 1 },
  { seksjonId: "oppsummering" },
  { seksjonId: "kvittering" },
] as const satisfies readonly Konfig[];

export function hentSeksjonConfig(seksjonId: seksjonId): SeksjonConfig {
  const seksjon = seksjonKonfig.find((seksjon) => seksjon.seksjonId === seksjonId);

  if (!seksjon || !("nyesteVersjon" in seksjon) || typeof seksjon.nyesteVersjon !== "number") {
    throw new Error(`Mangler versjon for seksjon: ${seksjonId}`);
  }

  return { ...seksjon, nyesteVersjon: seksjon.nyesteVersjon };
}

export function hentSeksjonNavigasjon(seksjonId: seksjonId): SeksjonNavigasjon {
  const indeks = seksjonKonfig.findIndex((seksjon) => seksjon.seksjonId === seksjonId);

  if (indeks === -1) {
    throw new Error(`Ukjent seksjon: ${seksjonId}`);
  }

  return {
    forrigeSeksjonId: seksjonKonfig[indeks - 1]?.seksjonId,
    nesteSeksjonId: seksjonKonfig[indeks + 1]?.seksjonId,
  };
}
