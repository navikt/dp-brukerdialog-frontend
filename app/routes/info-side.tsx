import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import { EksterneLenke } from "~/components/EksterneLenke";
import { getEnv } from "~/utils/env.utils";

export default function Infoside() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <title>Infoside</title>
      <Heading size="large" level="1" spacing>
        Din søknad om dagpenger har blitt mottatt og arkivert
      </Heading>

      <VStack gap="space-32">
        <BodyLong>
          Nav har mottatt søknaden din om dagpenger, og den er nå arkivert. Søknaden blir behandlet
          så snart som mulig. Du vil få en bekreftelse på e-post når behandlingen er ferdig.
        </BodyLong>
        <BodyLong>Den arkiverte søknaden finner du i Dokumentoversikt på Mine dagpenger.</BodyLong>

        <EksterneLenke asButton href={getEnv("DP_MINE_DAGPENGER_URL")} tekst="Mine dagpenger" />
      </VStack>
    </main>
  );
}
