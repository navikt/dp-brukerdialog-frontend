import { ArrowRightIcon, ExternalLinkIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, Button, Heading, VStack } from "@navikt/ds-react";
import { redirect, useLoaderData } from "react-router";
import { SøknadIkon } from "~/components/SøknadIkon";
import { hentArbeidssøkerperioder } from "~/models/hent-arbeidssøkerperioder.server";
import { getEnv } from "~/utils/env.utils";
import { Route } from "./+types/arbeidssoker";

type ArbeidssokerStatus = "UNREGISTERED" | "ERROR";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ status: ArbeidssokerStatus; registreringUrl: string }> {
  const registreringUrl =
    getEnv("ARBEIDSSOKERREGISTRERING_URL") || "https://arbeidssokerregistrering.nav.no/";

  const response = await hentArbeidssøkerperioder(request);

  if (response.ok) {
    const perioder = await response.json();
    const erRegistrert = perioder.some(
      (periode: { avsluttet: unknown }) => periode.avsluttet === null
    );

    if (erRegistrert) {
      throw redirect("/opprett-soknad");
    }

    return { status: "UNREGISTERED", registreringUrl };
  }

  return { status: "ERROR", registreringUrl };
}

export default function ArbeidssokerSide() {
  const { status, registreringUrl } = useLoaderData<typeof loader>();

  function handleRegistrerKlikk() {
    sessionStorage.setItem("kommerFraDagpenger", "true");
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>Søknad om dagpenger</title>
      <div className="soknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          Søknad om dagpenger
        </Heading>
      </div>

      <div className="innhold">
        {status === "ERROR" && (
          <Alert variant="warning" className="mb-8">
            Vi kunne ikke sjekke om du er registrert som arbeidssøker. Du kan forsøke å registrere
            deg, eller gå videre til søknaden.
          </Alert>
        )}

        <VStack gap="4" className="mt-8">
          <BodyLong>
            <strong>Du må være registrert som arbeidssøker for å ha rett til dagpenger</strong>
            <br />
            Du kan tidligst få dagpenger fra datoen du både har registrert deg som arbeidssøker og
            sendt søknad om dagpenger
          </BodyLong>
          <div>
            <Button
              as="a"
              href={registreringUrl}
              variant="primary"
              icon={<ExternalLinkIcon aria-hidden />}
              iconPosition="right"
              onClick={handleRegistrerKlikk}
            >
              Registrer deg som arbeidssøker
            </Button>
          </div>

          <div>
            <Button
              as="a"
              href="/opprett-soknad"
              variant="tertiary"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
            >
              Søk om dagpenger likevel
            </Button>
          </div>
        </VStack>
      </div>
    </main>
  );
}
