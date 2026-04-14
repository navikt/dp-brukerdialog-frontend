import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, Button, Heading, HStack, Link, VStack } from "@navikt/ds-react";
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
          <HStack gap="4" align="center">
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

            <Button as="a" href="https://www.nav.no/minside" variant="secondary">
              Avbryt
            </Button>
          </HStack>

          <BodyLong>
            <Link href={`${getEnv("BASE_PATH")}/opprett-soknad`}>
              Jeg vil søke om dagpenger likevel
            </Link>
            , og er klar over at jeg mest sannsynlig vil få avslag på søknaden
          </BodyLong>
        </VStack>
      </div>
    </main>
  );
}
