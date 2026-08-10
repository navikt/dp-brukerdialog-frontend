import { BodyLong, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Form, Link, useActionData, useNavigation } from "react-router";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadIkon } from "~/components/SøknadIkon";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { mapInnsendteSøknader } from "~/models/hent-søknader-for-ident";
import { action } from "~/routes/_index";
import { formaterNorskDato } from "~/utils/formatering.utils";

export function SøknadOversikt() {
  const { t } = useTranslation("soknadOversikt");
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const { søknader, påbegyntSøknad } = useTypedRouteLoaderData("routes/_index");

  const sletterSøknad =
    (navigation.state === "submitting" || navigation.state === "loading") &&
    navigation.formData != null;

  const innsendteSøknader = mapInnsendteSøknader(søknader);

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>{t("side.tittel")}</title>
      <div className="soknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          {t("side.overskrift")}
        </Heading>
      </div>
      <div className="innhold">
        <VStack gap="space-32">
          {søknader.length > 0 && (
            <VStack gap="space-16">
              <BodyLong>{t("innsendtSoknad.beskrivelse")}</BodyLong>
              <VStack gap="space-8">
                {innsendteSøknader.map((soknad) => (
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
                {t("pabegyntSoknad.beskrivelse", {
                  date: formaterNorskDato(new Date(påbegyntSøknad.sistEndretAvBruker!)),
                })}
              </BodyLong>
              <VStack gap="space-16">
                <Link to={`/${påbegyntSøknad.soknadUuid}/personalia`}>
                  <Button>Fortsett påbegynt søknad</Button>
                </Link>
                <HStack gap="space-16">
                  <Form method="post">
                    <input type="hidden" name="soknadUuid" value={påbegyntSøknad.soknadUuid} />
                    <Button type="submit" variant="secondary" loading={sletterSøknad}>
                      {t("pabegyntSoknad.slettOgStartPaNyttKnapp")}
                    </Button>
                  </Form>
                </HStack>
              </VStack>
            </VStack>
          )}

          <VStack>
            {!påbegyntSøknad && (
              <Link to="/arbeidssoker">
                <Button variant="primary">{t("nySoknad.startNySoknadKnapp")}</Button>
              </Link>
            )}
          </VStack>

          {actionData && (
            <SeksjonTekniskFeil tittel={t("tekniskFeil.melding")} beskrivelse={actionData.error} />
          )}
        </VStack>
      </div>
    </main>
  );
}
