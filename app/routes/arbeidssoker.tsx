import { Alert, BodyLong, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { Link, redirect, useLoaderData } from "react-router";
import { SøknadIkon } from "~/components/SøknadIkon";
import {
  hentArbeidssøkerperioder,
  IArbeidssokerperioder,
} from "~/models/hent-arbeidssøkerperioder.server";
import { getEnv } from "~/utils/env.utils";
import { Route } from "./+types/arbeidssoker";

type LoaderData = {
  status: "UNREGISTERED" | "ERROR";
};

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderData | Response> {
  const response = await hentArbeidssøkerperioder(request);

  if (!response.ok) {
    return { status: "ERROR" };
  }

  const perioder: IArbeidssokerperioder[] = await response.json();
  const erRegistrert = perioder.some((periode) => periode.avsluttet === null);

  if (erRegistrert) {
    return redirect("/opprett-soknad");
  }

  return { status: "UNREGISTERED" };
}

export default function ArbeidssokerSide() {
  const { status } = useLoaderData<typeof loader>();

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

        <VStack gap="space-16" className="mt-32">
          <BodyLong>
            <strong>Du må være registrert som arbeidssøker for å ha rett til dagpenger</strong>
            <br />
            Du kan tidligst få dagpenger fra datoen du både har registrert deg som arbeidssøker og
            sendt søknad om dagpenger
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
              Registrer deg som arbeidssøker
            </Button>

            <Button as="a" href="https://www.nav.no/minside" variant="secondary">
              Avbryt
            </Button>
          </HStack>

          <BodyLong>
            <Link to="/opprett-soknad">Jeg vil søke om dagpenger likevel</Link>, og er klar over at
            jeg mest sannsynlig vil få avslag på søknaden
          </BodyLong>
        </VStack>
      </div>
    </main>
  );
}
