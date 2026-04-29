import { BodyShort, Button, Heading, HStack, Theme, VStack } from "@navikt/ds-react";
import { EksterneLenke } from "../EksterneLenke";
import { getEnv } from "~/utils/env.utils";

export function IkkeFunnetFeil() {
  return (
    <Theme>
      <main id="maincontent" tabIndex={-1}>
        <div className="innhold mt-32">
          <VStack gap="space-16">
            <Heading size="large" level="1">
              Beklager, vi fant ikke siden
            </Heading>
            <BodyShort>
              Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
            </BodyShort>

            <HStack gap="space-16">
              <Button variant="secondary" iconPosition="left" onClick={() => window.history.back()}>
                Tilbake til forrige side
              </Button>
              <EksterneLenke
                asButton
                href={getEnv("DP_MINE_DAGPENGER_URL")}
                tekst="Mine dagpenger"
              />
            </HStack>
          </VStack>

          <VStack gap="space-16" className="mt-56">
            <div>
              <Heading level="2" size="large" spacing>
                Page not found
              </Heading>
              <BodyShort spacing>The page you requested cannot be found.</BodyShort>
              <BodyShort>
                Go to the{" "}
                <EksterneLenke href={getEnv("DP_MINE_DAGPENGER_URL")} tekst="mine dagpenger" />, or
                use one of the links in the menu.
              </BodyShort>
            </div>
          </VStack>
        </div>
      </main>
    </Theme>
  );
}
