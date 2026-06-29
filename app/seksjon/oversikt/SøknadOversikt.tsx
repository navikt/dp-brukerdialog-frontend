import { BodyLong, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
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

export const SEKSJON_TITTEL = "Søknad om dagpenger: Søknadsoversikt";

export function SøknadOversikt() {
  const { t } = useTranslation("soknadOversikt");
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const { søknader, quizSøknader, påbegyntSøknad } = useTypedRouteLoaderData("routes/_index");

  const sletterSøknad =
    (navigation.state === "submitting" || navigation.state === "loading") &&
    navigation.formData != null;

  const orkestratorInnsendteSøknader = mapOrkestratorInnsendteSoknader(søknader);
  const quizInnsendteSøknader = mapQuizInnsendteSoknader(quizSøknader);
  const alleSøknader = KombinertOgSorterInnsendteSoknader(
    orkestratorInnsendteSøknader,
    quizInnsendteSøknader
  );

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>{SEKSJON_TITTEL}</title>
      <div className="soknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          {t("heading")}
        </Heading>
      </div>
      <div className="innhold">
        <VStack gap="space-32">
          {alleSøknader.length > 0 && (
            <VStack gap="space-16">
              <BodyLong>{t("innsendtSoknad.beskrivelse")}</BodyLong>
              <VStack gap="space-8">
                {alleSøknader.map((soknad) =>
                  soknad.erQuizSøknad ? (
                    <EksterneLenke
                      key={soknad.soknadUuid}
                      href={`${getEnv("DP_SOKNADSDIALOG_URL")}/${soknad.soknadUuid}/kvittering`}
                      tekst={t("innsendtSoknad.vedleggsKnapp", {
                        date: formaterNorskDato(new Date(soknad.forstInnsendt)),
                      })}
                      variant="secondary"
                      asButton
                    />
                  ) : (
                    <Link key={soknad.soknadUuid} to={`${soknad.soknadUuid}/kvittering`}>
                      <Button variant="secondary">
                        {t("innsendtSoknad.vedleggsKnapp", {
                          date: formaterNorskDato(new Date(soknad.forstInnsendt)),
                        })}
                      </Button>
                    </Link>
                  )
                )}
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
                {påbegyntSøknad.erQuizSøknad && (
                  <EksterneLenke
                    href={`${getEnv("DP_SOKNADSDIALOG_URL")}/${påbegyntSøknad.soknadUuid}?fortsett=true`}
                    tekst={t("pabegyntSoknad.fortsettKnapp")}
                    variant="primary"
                    asButton
                  />
                )}
                {!påbegyntSøknad.erQuizSøknad && (
                  <Link to={`/${påbegyntSøknad.soknadUuid}/personalia`}>
                    <Button variant="primary">{t("pabegyntSoknad.fortsettKnapp")}</Button>
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
