import { Alert, BodyLong, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { SøknadIkon } from "~/components/SøknadIkon";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { getEnv } from "~/utils/env.utils";

export function ArbeidssøkerView() {
  const { t } = useTranslation("arbeidssøker");
  const { arbeidssøkerStatus } = useTypedRouteLoaderData("routes/arbeidssoker");

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>{t("side.tittel")}</title>
      <div className="søknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          {t("side.overskrift")}
        </Heading>
      </div>

      <div className="innhold">
        {arbeidssøkerStatus === "FEIL" && (
          <Alert variant="warning" className="mb-8">
            {t("tekniskFeil.beskjed")}
          </Alert>
        )}

        <VStack gap="space-16" className="mt-32">
          <BodyLong>
            <strong>{t("informasjon.overskrift")}</strong>
            <br />
            {t("informasjon.beskrivelse")}
          </BodyLong>
          <HStack gap="space-16" align="center">
            <Button
              as="a"
              href={
                getEnv("ARBEIDSSOKERREGISTRERING_URL") || "https://arbeidssokerregistrering.nav.no/"
              }
              variant="primary"
              onClick={() => {
                sessionStorage.setItem("kommerFraDagpenger", "true");
              }}
            >
              {t("handlinger.registrer")}
            </Button>

            <Button as="a" href="https://www.nav.no/minside" variant="secondary">
              {t("handlinger.avbryt")}
            </Button>
          </HStack>

          <BodyLong>
            <Link to="/opprett-soknad">{t("soknad.lenketekst")}</Link>, {t("soknad.beskrivelse")}
          </BodyLong>
        </VStack>
      </div>
    </main>
  );
}
