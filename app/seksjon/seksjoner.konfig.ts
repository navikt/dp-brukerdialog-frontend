export type SeksjonKonfig = {
  seksjonId: seksjonId;
  nyesteVersjon: number;
  forrigeSeksjonId: seksjonId | null;
  nesteSeksjonId: seksjonId | null;
};

type SeksjonGrunnlag = Pick<SeksjonKonfig, "seksjonId" | "nyesteVersjon">;

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

export const seksjonKonfig: SeksjonGrunnlag[] = [
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
  { seksjonId: "oppsummering", nyesteVersjon: 1 },
  { seksjonId: "kvittering", nyesteVersjon: 1 },
];

export function hentSeksjonKonfig(seksjonId: seksjonId): SeksjonKonfig {
  const indeks = seksjonKonfig.findIndex((seksjon) => seksjon.seksjonId === seksjonId);

  if (indeks === -1) {
    throw new Error(`Ukjent seksjon: ${seksjonId}`);
  }

  return {
    ...seksjonKonfig[indeks],
    forrigeSeksjonId: seksjonKonfig[indeks - 1]?.seksjonId ?? null,
    nesteSeksjonId: seksjonKonfig[indeks + 1]?.seksjonId ?? null,
  };
}
