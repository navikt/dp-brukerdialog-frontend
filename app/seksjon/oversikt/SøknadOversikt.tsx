import { BodyLong, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { Form, Link, useActionData, useNavigation } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadIkon } from "~/components/SøknadIkon";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import {
  KombinertOgSorterInnsendteSoknader,
  mapOrkestratorInnsendteSoknader,
  mapQuizInnsendteSoknader,
} from "~/models/hent-søknader-for-ident";
import { action } from "~/routes/_index";
import { getEnv } from "~/utils/env.utils";
import { formaterNorskDato } from "~/utils/formatering.utils";

export function SøknadOversikt() {
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { søknader, quizSøknader, påbegyntSøknad } = useTypedRouteLoaderData("routes/_index");

  const orkestratorInnsendteSøknader = mapOrkestratorInnsendteSoknader(søknader);
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
                soknad.erQuizSøknad ? (
                  <EksterneLenke
                    key={soknad.soknadUuid}
                    href={`${getEnv("DP_SOKNADSDIALOG_URL")}/${soknad.soknadUuid}/kvittering`}
                    tekst={`Send inn vedlegg til søknad sendt ${formaterNorskDato(new Date(soknad.forstInnsendt))}`}
                    variant="secondary"
                    asButton
                  />
                ) : (
                  <Link key={soknad.soknadUuid} to={`${soknad.soknadUuid}/kvittering`}>
                    <Button variant="secondary">
                      Send inn vedlegg til søknad sendt{" "}
                      {formaterNorskDato(new Date(soknad.forstInnsendt))}
                    </Button>
                  </Link>
                )
              )}
            </VStack>
          </VStack>
          {påbegyntSøknad && (
            <VStack gap="space-16">
              <BodyLong>
                Du har en påbegynt søknad, sist endret{" "}
                {formaterNorskDato(new Date(påbegyntSøknad.sistEndretAvBruker!))}. Vil du fortsette
                på denne eller starte en ny?
              </BodyLong>
              <VStack gap="space-16">
                {påbegyntSøknad.erQuizSøknad && (
                  <EksterneLenke
                    href={`${getEnv("DP_SOKNADSDIALOG_URL")}/${påbegyntSøknad.soknadUuid}?fortsett=true`}
                    tekst="Fortsett påbegynt søknad"
                    variant="primary"
                    asButton
                  />
                )}
                {!påbegyntSøknad.erQuizSøknad && (
                  <Link to={`/${påbegyntSøknad.soknadUuid}/personalia`}>
                    <Button variant="primary">Fortsett påbegynt søknad</Button>
                  </Link>
                )}
                <HStack gap="space-16">
                  <Form method="post">
                    <input type="hidden" name="soknadUuid" value={påbegyntSøknad.soknadUuid} />
                    <input
                      type="hidden"
                      name="erQuizSøknad"
                      value={String(påbegyntSøknad.erQuizSøknad)}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      loading={state === "submitting" || state === "loading"}
                    >
                      Slett og start ny søknad
                    </Button>
                  </Form>
                </HStack>
              </VStack>
            </VStack>
          )}
          {!påbegyntSøknad && (
            <Link to="/arbeidssoker">
              <Button variant="primary" as="a">
                Start ny søknad
              </Button>
            </Link>
          )}

          {actionData && (
            <SeksjonTekniskFeil
              tittel="Det har oppstått en teknisk feil"
              beskrivelse={actionData.error}
            />
          )}
        </VStack>
      </div>
    </main>
  );
}
