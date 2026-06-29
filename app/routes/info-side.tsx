import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import { EksterneLenke } from "~/components/EksterneLenke";
import { getEnv } from "~/utils/env.utils";

export default function Infoside() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <title>Infoside</title>
      <Heading size="large" level="1" spacing>
        Søknaden kan ikke åpnes
      </Heading>

      <VStack gap="space-32">
        <BodyLong>Du finner søknaden under 'Siste dokumenter' på Min side.</BodyLong>

        <EksterneLenke asButton href={getEnv("MIN_SIDE_URL")} tekst="Min side" />
      </VStack>
    </main>
  );
}
