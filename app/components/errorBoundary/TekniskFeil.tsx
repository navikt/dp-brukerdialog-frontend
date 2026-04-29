import {
  BodyShort,
  Button,
  CopyButton,
  Heading,
  HStack,
  Label,
  Theme,
  VStack,
} from "@navikt/ds-react";
import { isRouteErrorResponse } from "react-router";
import { getEnv } from "~/utils/env.utils";
import { EksterneLenke } from "../EksterneLenke";

export function TekniskFeil({ error }: { error?: unknown }) {
  return (
    <Theme>
      <main id="maincontent" tabIndex={-1}>
        <div className="innhold mt-32">
          <VStack gap="space-16">
            <Heading size="large" level="1">
              Vi har tekniske problemer akkurat nå
            </Heading>
            <BodyShort>
              Beklager, vi får ikke kontakt med systemene våre. Svarene dine er lagret og du kan
              prøve igjen om litt.
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

          {getEnv("IS_LOCALHOST") === "true" && isRouteErrorResponse(error) && (
            <VStack gap="space-4" className="mt-56">
              <HStack align="center" gap="space-8">
                <Label>Feilmelding:</Label>
                <CopyButton copyText={error.data || ""} />
              </HStack>
              <div className="kode">{error.data}</div>
            </VStack>
          )}

          {getEnv("IS_LOCALHOST") === "true" && error instanceof Error && (
            <VStack gap="space-4" className="mt-56">
              <HStack align="center" gap="space-8">
                <Label>Stack trace:</Label>
                <CopyButton copyText={error.stack || ""} />
              </HStack>
              <div className="kode">{error.stack}</div>
            </VStack>
          )}
        </div>
      </main>
    </Theme>
  );
}
