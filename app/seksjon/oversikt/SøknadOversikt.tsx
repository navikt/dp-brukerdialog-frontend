import { BodyLong, Box, Button, Heading, VStack } from "@navikt/ds-react";
import { Link } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { SøknadIkon } from "~/components/SøknadIkon";
import {
  KombinertOgSorterInnsendteSoknader,
  mapOrkestratorInnsendteSoknader,
  mapQuizInnsendteSoknader,
} from "~/models/hent-søknader-for-ident";
import { SøknadOversiktType } from "~/routes/_index";
import FortsettEllerSlettKnapper from "~/seksjon/oversikt/FortsettEllerSlettKnapper";
import { getEnv } from "~/utils/env.utils";
import { formaterNorskDato } from "~/utils/formatering.utils";

interface SøknadOversiktProps {
  søknader: SøknadOversiktType;
}

export function SøknadOversikt({ søknader }: SøknadOversiktProps) {
  const orkestratorSøknader = søknader.orkestratorSøknader;
  const quizSøknader = søknader.quizSøknader;

  const orkestratorInnsendteSøknader = mapOrkestratorInnsendteSoknader(orkestratorSøknader);
  const quizInnsendteSøknader = mapQuizInnsendteSoknader(quizSøknader);
  const kombinertOrkestratorOgQuizInnsendteSøknader = KombinertOgSorterInnsendteSoknader(
    orkestratorInnsendteSøknader,
    quizInnsendteSøknader
  );

  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="soknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          Søknad om dagpenger
        </Heading>
      </div>
      <div className="innhold">
        <VStack gap="space-32">
          <VStack gap="space-16">
            <BodyLong>
              Du har nylig sendt inn en søknad. Vil du ettersende vedlegg til en innsendt søknad
              eller sende inn en ny?
            </BodyLong>
            <VStack gap="space-16" justify="start">
              {kombinertOrkestratorOgQuizInnsendteSøknader.map((soknad) =>
                soknad.erOrkestratorSøknad ? (
                  <Link key={soknad.soknadUuid} to={`${soknad.soknadUuid}/kvittering`}>
                    <Button variant="secondary">
                      Send inn vedlegg til søknad sendt{" "}
                      {formaterNorskDato(new Date(soknad.forstInnsendt))}
                    </Button>
                  </Link>
                ) : (
                  <EksterneLenke
                    href={`${getEnv("DP_SOKNADSDIALOG_URL")}/${soknad.soknadUuid}/kvittering`}
                    tekst={`Send inn vedlegg til søknad sendt ${formaterNorskDato(new Date(soknad.forstInnsendt))}`}
                    variant="secondary"
                    asButton
                  />
                )
              )}
            </VStack>
          </VStack>
          {søknader.påbegyntSøknad && (
            <FortsettEllerSlettKnapper påbegyntSøknad={søknader.påbegyntSøknad} />
          )}
          {!søknader.påbegyntSøknad && (
            <Link to="/opprett-soknad">
              <Button variant="primary" as="a">
                Start ny søknad
              </Button>
            </Link>
          )}
        </VStack>
      </div>
    </main>
  );
}
