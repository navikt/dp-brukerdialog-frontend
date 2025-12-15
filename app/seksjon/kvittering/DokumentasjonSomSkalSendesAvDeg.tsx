import { BodyShort, Box, Heading, HStack, ReadMore, Tag, VStack } from "@navikt/ds-react";
import { DokumentasjonskravInnhold } from "../dokumentasjon/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";

interface IProps {
  dokummentasjonskrav: Dokumentasjonskrav;
}

export default function DokumentasjonSomSkalSendesAvDeg({ dokummentasjonskrav }: IProps) {
  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large">
      <VStack gap="2">
        <VStack gap="2">
          <HStack gap="2" justify="space-between">
            <Heading size="xsmall" level="4">
              {dokummentasjonskrav.tittel}
            </Heading>
            <Tag variant="warning" size="xsmall">
              Mangler
            </Tag>
          </HStack>

          <BodyShort>Skal sendes av deg</BodyShort>
        </VStack>

        <ReadMore header="Dette må dokumentasjonen inneholde">
          <DokumentasjonskravInnhold type={dokummentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box.New>
  );
}
