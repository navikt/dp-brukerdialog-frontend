import { Søknad } from "~/models/hent-søknader-for-ident";

export const mockOrkestratorSøknader: Søknad[] = [
  {
    søknadId: "b1778783-3ec1-4cd1-8eae-b496c10a6122",
    tittel: "Søknad om dagpenger",
    status: "PÅBEGYNT",
    oppdatertTidspunkt: new Date().toISOString(),
  },
  {
    søknadId: "a2345678-1234-5678-abcd-ef1234567890",
    tittel: "Søknad om dagpenger",
    status: "INNSENDT",
    innsendtTimestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    oppdatertTidspunkt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
