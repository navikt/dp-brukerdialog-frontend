import { SøknadOversiktType } from "~/routes/_index";
import {
  KombinertOgSorterInnsendteSoknader,
  mapOrkestratorInnsendteSoknader,
  mapQuizInnsendteSoknader,
} from "~/models/hent-søknader-for-ident";
import { BodyLong, Button, VStack } from "@navikt/ds-react";
import { Link } from "react-router";

interface SøknadOversiktProps {
  søknader: SøknadOversiktType;
}

export default function SøknadOversikt({ søknader }: SøknadOversiktProps) {
  const orkestratorSøknader = søknader.orkestratorSøknader;
  const quizSøknader = søknader.quizSøknader;
  const redirectUrl = søknader.aktivSøknadRedirectUrl;

  const orkestratorInnsendteSøknader = mapOrkestratorInnsendteSoknader(orkestratorSøknader);
  const quizInnsendteSøknader = mapQuizInnsendteSoknader(quizSøknader);
  const kombinertOrkestratorOgQuizInnsendteSøknader = KombinertOgSorterInnsendteSoknader(
    orkestratorInnsendteSøknader,
    quizInnsendteSøknader
  );

  return (
    <div className="innhold">
      <BodyLong>
        Du har nylig sendt inn en søknad. Vil du ettersende vedlegg til en innsendt søknad eller
        sende inn en ny?
      </BodyLong>
      <VStack gap="4">
        {kombinertOrkestratorOgQuizInnsendteSøknader.map((soknad) => (
          <Link
            key={soknad.soknadUuid}
            to={
              soknad.isOrkestratorSoknad
                ? `/${soknad.soknadUuid}/kvittering`
                : `${redirectUrl}/soknad/${soknad.soknadUuid}/kvittering`
            }
          >
            <Button variant="secondary" as="a">
              Send inn vedlegg til søknad sendt {soknad.forstInnsendt}
            </Button>
          </Link>
        ))}
      </VStack>
    </div>
  );
}
