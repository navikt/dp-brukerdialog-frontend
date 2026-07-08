import { subMonths } from "date-fns";
import { Arbeidsforhold } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { hentOrkestratorSøknader } from "~/models/hent-søknader";
import { OrkestratorSoknad } from "~/models/hent-søknader-for-ident";
import { logger } from "~/utils/logger.utils";

export type TidligereArbeidsforhold = {
  hvordanHarDuJobbet: string;
  registrerteArbeidsforhold: Arbeidsforhold[];
};

export async function hentTidligereArbeidsforhold(
  request: Request,
  currentSoknadId: string
): Promise<TidligereArbeidsforhold | null> {
  try {
    const response = await hentOrkestratorSøknader(request);

    if (!response.ok) {
      return null;
    }

    const alleSøknader: OrkestratorSoknad[] = await response.json();
    const innenfor6Måneder = subMonths(Date.now(), 6);

    const tidligereSøknad = alleSøknader
      .filter(
        (søknad) => søknad.status === "INNSENDT" || søknad.status === "JOURNALFØRT"
      )
      .filter(
        (søknad) =>
          søknad.søknadId !== currentSoknadId &&
          søknad.innsendtTimestamp !== undefined &&
          new Date(søknad.innsendtTimestamp) > innenfor6Måneder
      )
      .sort(
        (a, b) =>
          new Date(b.innsendtTimestamp!).getTime() - new Date(a.innsendtTimestamp!).getTime()
      )[0];

    if (!tidligereSøknad) {
      return null;
    }

    const seksjonResponse = await hentSeksjon(request, tidligereSøknad.søknadId, "arbeidsforhold");

    if (!seksjonResponse.ok) {
      return null;
    }

    const seksjonData = await seksjonResponse.json();
    const seksjonsvar = seksjonData?.seksjon?.seksjonsvar;

    const hvordanHarDuJobbet: string | undefined = seksjonsvar?.hvordanHarDuJobbet;
    const registrerteArbeidsforhold: Arbeidsforhold[] =
      seksjonsvar?.registrerteArbeidsforhold ?? [];

    if (!hvordanHarDuJobbet || registrerteArbeidsforhold.length === 0) {
      return null;
    }

    return { hvordanHarDuJobbet, registrerteArbeidsforhold };
  } catch (error) {
    logger.warn("Klarte ikke å hente tidligere arbeidsforhold", { error });
    return null;
  }
}
