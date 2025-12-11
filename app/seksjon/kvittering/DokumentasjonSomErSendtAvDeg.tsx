import { BodyShort, Box, Heading, HStack, ReadMore, Tag, VStack } from "@navikt/ds-react";
import { DokumentasjonskravInnhold } from "../dokumentasjon/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";
import { ComponentIcon } from "@navikt/aksel-icons";

interface IProps {
  dokummentasjonskrav: Dokumentasjonskrav;
}

export default function DokumentasjonskravSomErSendtAvDeg({ dokummentasjonskrav }: IProps) {
  return (
    <Box padding="space-16" background="surface-action-subtle" borderRadius="large">
      <VStack gap="2">
        <VStack gap="2">
          <HStack gap="2" justify="space-between">
            <Heading size="xsmall" level="4">
              {dokummentasjonskrav.tittel}
            </Heading>
            <Tag variant="success" size="xsmall">
              Mottatt
            </Tag>
          </HStack>

          <BodyShort>
            Se opplastet dokument &lt;&lt; TODO dette skal være en link så bruker får lastet ned
            dokumentet
          </BodyShort>
        </VStack>

        <ReadMore header="Dette må dokumentasjonen inneholde">
          <DokumentasjonskravInnhold type={dokummentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box>
  );
}
