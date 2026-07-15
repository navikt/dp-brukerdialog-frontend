import { BodyLong, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { Form, Link, useActionData, useNavigation } from "react-router";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadIkon } from "~/components/SøknadIkon";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { mapInnsendteSøknader } from "~/models/hent-søknader-for-ident";
import { action } from "~/routes/_index";
import { formaterNorskDato } from "~/utils/formatering.utils";

export const SEKSJON_TITTEL = "Søknad om dagpenger: Søknadsoversikt";

export function SøknadOversikt() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const { søknader, påbegyntSøknad } = useTypedRouteLoaderData("routes/_index");

  const sletterSøknad =
    (navigation.state === "submitting" || navigation.state === "loading") &&
    navigation.formData != null;

  const orkestratorInnsendteSøknader = mapInnsendteSøknader(søknader);

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>{SEKSJON_TITTEL}</title>
      <div className="soknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          Søknad om dagpenger
        </Heading>
      </div>
      <div className="innhold">
        <VStack gap="space-32">
          {søknader.length > 0 && (
            <VStack gap="space-16">
              <BodyLong>
                Du har nylig sendt inn en søknad. Vil du ettersende vedlegg til en innsendt søknad
                eller sende inn en ny?
              </BodyLong>
              <VStack gap="space-8">
                {orkestratorInnsendteSøknader.map((soknad) => (
                  <Link key={soknad.soknadUuid} to={`${soknad.soknadUuid}/kvittering`}>
                    <Button variant="secondary">
                      Send inn vedlegg til søknad sendt{" "}
                      {formaterNorskDato(new Date(soknad.forstInnsendt))}
                    </Button>
                  </Link>
                ))}
              </VStack>
            </VStack>
          )}
          {påbegyntSøknad && (
            <VStack gap="space-16">
              <BodyLong>
                Du har en påbegynt søknad, sist endret{" "}
                {formaterNorskDato(new Date(påbegyntSøknad.sistEndretAvBruker!))}. Vil du fortsette
                på denne eller starte en ny?
              </BodyLong>
              <VStack gap="space-16">
                {påbegyntSøknad && (
                  <Link to={`/${påbegyntSøknad.soknadUuid}/personalia`}>
                    <Button variant="primary">Fortsett påbegynt søknad</Button>
                  </Link>
                )}
                <HStack gap="space-16">
                  <Form method="post">
                    <input type="hidden" name="soknadUuid" value={påbegyntSøknad.soknadUuid} />
                    <Button type="submit" variant="secondary" loading={sletterSøknad}>
                      Slett og start ny søknad
                    </Button>
                  </Form>
                </HStack>
              </VStack>
            </VStack>
          )}

          <VStack>
            {!påbegyntSøknad && (
              <Link to="/arbeidssoker">
                <Button variant="primary">Start ny søknad</Button>
              </Link>
            )}
          </VStack>

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
