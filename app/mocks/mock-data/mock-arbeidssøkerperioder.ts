import { IArbeidssokerperioder } from "~/models/hent-arbeidssøkerperioder.server";

export const mockArbeidssøkerperioder: IArbeidssokerperioder[] = [
  {
    periodeId: "mock-periode-id",
    startet: {
      tidspunkt: new Date().toISOString(),
      utfoertAv: { type: "SLUTTBRUKER" },
      kilde: "mock",
      aarsak: "mock",
    },
    avsluttet: null,
  },
];
