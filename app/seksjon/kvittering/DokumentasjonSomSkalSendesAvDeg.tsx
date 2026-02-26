import { BodyShort, Box, Heading, HStack, ReadMore, Tag, VStack } from "@navikt/ds-react";
import { DokumentasjonskravInnhold } from "../dokumentasjon/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonSomSkalSendesAvDeg({ dokumentasjonskrav }: IProps) {
  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large">
      <VStack gap="4">
        <HStack justify="space-between">
          <Heading size="xsmall" level="4">
            {dokumentasjonskrav.tittel}
          </Heading>
          <Tag variant="warning" size="xsmall">
            Mangler
          </Tag>
        </HStack>

        <BodyShort>Skal sendes av deg</BodyShort>

        <ReadMore header="Dette må dokumentasjonen inneholde">
          <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box.New>
  );
}
