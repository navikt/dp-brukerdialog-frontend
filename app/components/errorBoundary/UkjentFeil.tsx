import { ArrowLeftIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading, HStack, Theme, VStack } from "@navikt/ds-react";
import { getEnv } from "~/utils/env.utils";
import { EksterneLenke } from "../EksterneLenke";

export function UkjentFeil() {
  return (
    <Theme>
      <main id="maincontent" tabIndex={-1}>
        <div className="innhold">
          <VStack gap="space-16">
            <Heading size="medium" level="1">
              Vi har tekniske problemer akkurat nå
            </Heading>
            <BodyLong>
              Beklager, vi får ikke kontakt med systemene våre. Svarene dine er lagret og du kan
              prøve igjen om litt.
            </BodyLong>
          </VStack>
          <HStack gap="space-16" className="mt-32">
            <Button
              variant="secondary"
              icon={<ArrowLeftIcon aria-hidden />}
              iconPosition="left"
              onClick={() => window.history.back()}
            >
              Gå tilbake
            </Button>
            <EksterneLenke asButton href={getEnv("DP_MINE_DAGPENGER_URL")} tekst="Mine dagpenger" />
          </HStack>
        </div>
      </main>
    </Theme>
  );
}
