import { subDays } from "date-fns";

export interface PåBegynteSøknad {
  soknadUuid: string;
  opprettet: string;
  sistEndretAvBruker?: string;
}

export interface InnsendteSøknad {
  soknadUuid: string;
  forstInnsendt: string;
}

export interface Søknad {
  søknadId: string;
  tittel: string;
  innsendtTimestamp?: string;
  oppdatertTidspunkt?: string;
  status: string;
}

export function mapInnsendteSøknader(
  orkestratorSoknader: Søknad[] | null | undefined
): InnsendteSøknad[] {
  const siste30Dager = subDays(Date.now(), 30);

  return (
    orkestratorSoknader
      ?.filter((soknad) => soknad.status === "INNSENDT" || soknad.status === "JOURNALFØRT")
      .filter(
        (soknad) =>
          soknad.innsendtTimestamp !== undefined &&
          new Date(soknad.innsendtTimestamp) > siste30Dager
      )
      .map((soknad) => ({
        soknadUuid: soknad.søknadId,
        forstInnsendt: soknad.innsendtTimestamp!,
      })) || []
  );
}
