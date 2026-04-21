import { subDays } from "date-fns";

export interface PåBegynteSøknader {
  soknadUuid: string;
  opprettet: string;
  sistEndretAvbruker?: string;
}

export interface InnsendteSøknader {
  soknadUuid: string;
  forstInnsendt: string;
}

export interface QuizSøknader {
  paabegynt?: PåBegynteSøknader | null;
  innsendte?: InnsendteSøknader[];
}

export interface OrkestratorSoknad {
  søknadId: string;
  tittel: string;
  innsendtTimestamp?: string;
  oppdatertTidspunkt?: string;
  status: string;
}

export interface KombinertInnsendtSoknad extends InnsendteSøknader {
  isOrkestratorSoknad: boolean;
}

export function mapOrkestratorInnsendteSoknader(
  orkestratorSoknader: OrkestratorSoknad[] | null | undefined
): KombinertInnsendtSoknad[] {
  const within30Days = subDays(Date.now(), 30);

  return (
    orkestratorSoknader
      ?.filter((soknad) => soknad.status === "INNSENDT" || soknad.status === "JOURNALFØRT")
      .filter(
        (soknad) =>
          soknad.innsendtTimestamp !== undefined &&
          new Date(soknad.innsendtTimestamp) > within30Days
      )
      .map((soknad) => ({
        soknadUuid: soknad.søknadId,
        forstInnsendt: soknad.innsendtTimestamp!,
        isOrkestratorSoknad: true,
      })) || []
  );
}

export function mapQuizInnsendteSoknader(
  innsendte: InnsendteSøknader[] | undefined
): KombinertInnsendtSoknad[] {
  return (
    innsendte?.map((soknad) => ({
      ...soknad,
      isOrkestratorSoknad: false,
    })) || []
  );
}

export function KombinertOgSorterInnsendteSoknader(
  orkestratorInnsendte: KombinertInnsendtSoknad[],
  quizInnsendte: KombinertInnsendtSoknad[]
): KombinertInnsendtSoknad[] {
  return [...orkestratorInnsendte, ...quizInnsendte].sort(
    (a, b) => new Date(b.forstInnsendt).getTime() - new Date(a.forstInnsendt).getTime()
  );
}
