import { Arbeidssøkerperioder } from "~/models/hent-arbeidssøkerStatus.server";

export const mockArbeidssøkerperioder: Arbeidssøkerperioder[] = [
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
