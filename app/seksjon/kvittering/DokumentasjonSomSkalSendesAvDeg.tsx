import { BodyShort, Box, Heading, ReadMore, Tag, VStack } from "@navikt/ds-react";
import { DokumentasjonskravInnhold } from "../dokumentasjon/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export default function DokumentasjonSomSkalSendesAvDeg({ dokumentasjonskrav }: IProps) {
  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large">
      <VStack gap="4">
        <Heading size="xsmall" level="4">
          {dokumentasjonskrav.tittel}
        </Heading>
        <BodyShort>
          <Tag variant="warning" size="xsmall">
            Mangler
          </Tag>
        </BodyShort>

        <BodyShort>Skal sendes av deg</BodyShort>

        <ReadMore header="Dette må dokumentasjonen inneholde">
          <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box.New>
  );
}
