import { BodyLong, Heading, List, VStack } from "@navikt/ds-react";

import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/Dokumentasjonskrav";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.dokumentasjon";

export function DokumentasjonView() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="innhold">
      <h2>Dokumentasjon</h2>
      <BodyLong spacing>
        Du må laste opp dokumentasjon som bekrefter opplysningene i søknaden. Du får raskere svar på
        søknaden din hvis vi har all dokumentasjonen når vi starter behandlingen. Du kan bruke
        filformatene PDF, JPG og PNG.
      </BodyLong>
      <BodyLong>Slik bruker du bilder som dokumentasjon i søknaden:</BodyLong>
      <BodyLong spacing>
        <List as="ol">
          <List.Item>Bruk et kamera med god oppløsning.</List.Item>
          <List.Item>Pass på at det er godt lys.</List.Item>
          <List.Item>Legg dokumentet på et bord eller gulv med kontrast til dokumentet.</List.Item>
        </List>
      </BodyLong>

      <Heading size="small" level="3">
        Dokumenter du skal sende inn
      </Heading>
      <VStack gap="4">
        {loaderData.map((seksjon) =>
          seksjon?.dokumentasjonskrav?.map((dokumentasjonskrav) => (
            <Dokumentasjonskrav
              key={dokumentasjonskrav.id}
              dokumentasjonskrav={dokumentasjonskrav}
            />
          ))
        )}
      </VStack>
    </div>
  );
}
