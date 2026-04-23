import { ArrowRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading, Theme, VStack } from "@navikt/ds-react";
import { isRouteErrorResponse } from "react-router";
import { getEnv } from "~/utils/env.utils";

type ErrorBoundaryKomponentProps = {
  error: unknown;
};

export function ErrorBoundaryKomponent({ error }: ErrorBoundaryKomponentProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <Theme>
        <main id="maincontent" tabIndex={-1}>
          <div className="innhold">
            <VStack gap="space-16">
              <Heading size="large" level="1">
                Vi har tekniske problemer akkurat nå
              </Heading>
              <BodyLong>{error.data}</BodyLong>
            </VStack>
            <Button
              className="mt-32"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
              onClick={() => {
                window.location.href = getEnv("DP_MINE_DAGPENGER_URL");
              }}
            >
              Gå til mine dagpenger
            </Button>
          </div>
        </main>
      </Theme>
    );
  } else if (error instanceof Error) {
    return (
      <Theme>
        <main id="maincontent" tabIndex={-1}>
          <div className="innhold">
            <VStack gap="space-16">
              <Heading size="large" level="1">
                Vi har tekniske problemer akkurat nå
              </Heading>
              <BodyLong>{error.message}</BodyLong>
              {getEnv("IS_LOCALHOST") === "true" && (
                <div>
                  <p>Stack trace:</p>
                  <div>{error.stack}</div>
                </div>
              )}
            </VStack>
            <Button
              className="mt-32"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
              onClick={() => {
                window.location.href = getEnv("DP_MINE_DAGPENGER_URL");
              }}
            >
              Gå til mine dagpenger
            </Button>
          </div>
        </main>
      </Theme>
    );
  } else {
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
            <Button
              className="mt-32"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
              onClick={() => {
                window.location.href = getEnv("DP_MINE_DAGPENGER_URL");
              }}
            >
              Gå til mine dagpenger
            </Button>
          </div>
        </main>
      </Theme>
    );
  }
}
