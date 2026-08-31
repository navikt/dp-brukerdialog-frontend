export type SeksjonMetadata = {
  seksjonId: seksjonId;
  tittel: string;
  nyesteVersjon: number;
  forrigeSeksjonId: seksjonId | null;
  nesteSeksjonId: seksjonId | null;
};

export type SeksjonKonfig = Pick<SeksjonMetadata, "seksjonId" | "tittel" | "nyesteVersjon">;

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

export const seksjonKonfig: SeksjonKonfig[] = [
  { seksjonId: "personalia", tittel: "steg.personalia", nyesteVersjon: 1 },
  { seksjonId: "din-situasjon", tittel: "steg.dinSituasjon", nyesteVersjon: 1 },
  { seksjonId: "arbeidsforhold", tittel: "steg.arbeidsforhold", nyesteVersjon: 2 },
  { seksjonId: "annen-pengestotte", tittel: "steg.annenPengestotte", nyesteVersjon: 1 },
  { seksjonId: "egen-naring", tittel: "steg.egenNaering", nyesteVersjon: 1 },
  { seksjonId: "verneplikt", tittel: "steg.verneplikt", nyesteVersjon: 1 },
  { seksjonId: "utdanning", tittel: "steg.utdanning", nyesteVersjon: 1 },
  { seksjonId: "barnetillegg", tittel: "steg.barnetillegg", nyesteVersjon: 1 },
  { seksjonId: "reell-arbeidssoker", tittel: "steg.reellArbeidssoker", nyesteVersjon: 1 },
  { seksjonId: "tilleggsopplysninger", tittel: "steg.tilleggsopplysninger", nyesteVersjon: 1 },
  { seksjonId: "dokumentasjon", tittel: "steg.dokumentasjon", nyesteVersjon: 1 },
  { seksjonId: "oppsummering", tittel: "steg.oppsummering", nyesteVersjon: 1 },
  { seksjonId: "kvittering", tittel: "steg.kvittering", nyesteVersjon: 1 },
];

export function hentSeksjonKonfig(seksjonId: seksjonId): SeksjonMetadata {
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
