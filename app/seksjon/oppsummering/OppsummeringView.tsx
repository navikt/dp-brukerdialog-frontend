import { BodyLong, Button, HStack, InfoCard, VStack } from "@navikt/ds-react";
import { useLoaderData, useNavigation, useParams } from "react-router";
import { stegISøknaden } from "~/routes/$soknadId";
import { loader } from "~/routes/$soknadId.oppsummering";
import Oppsummering from "~/seksjon/oppsummering/Oppsummering";
import DokumentasjonOppsummering from "~/seksjon/dokumentasjon/DokumentasjonOppsummering";
import { ExclamationmarkTriangleIcon } from "@navikt/aksel-icons";
import React from "react";

export default function OppsummeringView() {
  const loaderData = useLoaderData<typeof loader>();
  const { soknadId } = useParams();
  const { state } = useNavigation();

  if (!loaderData) {
    return null;
  }

  return (
    <div className="innhold">
      <h2>Se over før du sender inn</h2>
      <VStack gap="20">
        <VStack gap="6">
          <InfoCard data-color="warning">
            <InfoCard.Header icon={<ExclamationmarkTriangleIcon aria-hidden />}>
              <InfoCard.Title>Søknaden din er ikke sendt enda</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
              <BodyLong>Husk å trykke på "Send søknad" nederst på siden før du avslutter.</BodyLong>
            </InfoCard.Content>
          </InfoCard>
          <BodyLong>
            Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre
            opplysningene.
          </BodyLong>
          <BodyLong>
            Når du har sendt inn søknaden kommer du til en kvitteringsside med informasjon om veien
            videre. Der kan du også ettersende dokumentasjon som mangler.
          </BodyLong>
          <h2>Dine svar</h2>
          {stegISøknaden.map((seksjon) => {
            const seksjonsData = loaderData.seksjoner.find((s) => s.seksjonId === seksjon.path);
            if (!seksjonsData) return null;
            return (
              <Oppsummering
                key={seksjon.path}
                seksjonsId={seksjon.path}
                seksjonsUrl={`/${soknadId}/${seksjon.path}`}
                seksjonsData={seksjonsData.data}
              />
            );
          })}
          <DokumentasjonOppsummering
            søknadId={soknadId}
            dokumentasjonskrav={loaderData.dokumentasjonskrav}
          />
          <HStack className="mt-4">
            <form method="POST">
              <Button loading={state === "submitting" || state === "loading"}>Send søknad</Button>
            </form>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
