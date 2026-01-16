import { DownloadIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack, ReadMore, Tag, VStack } from "@navikt/ds-react";
import { lastnedDokument } from "~/utils/dokument.utils";
import { DokumentasjonskravInnhold } from "../dokumentasjon/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export default function DokumentasjonskravSomErSendtAvDeg({ dokumentasjonskrav }: IProps) {
  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large">
      <VStack gap="4">
        <HStack justify="space-between">
          <Heading size="xsmall" level="4">
            {dokumentasjonskrav.tittel}
          </Heading>
          <BodyShort>
            <Tag variant="success" size={"xsmall"}>
              Mottatt
            </Tag>
          </BodyShort>
        </HStack>

        <HStack>
          {dokumentasjonskrav.bundle && (
            <Button
              variant="tertiary"
              size="small"
              icon={<DownloadIcon />}
              onClick={() =>
                lastnedDokument(dokumentasjonskrav.bundle?.filsti, dokumentasjonskrav.tittel)
              }
            >
              Last ned opplastet dokument
            </Button>
          )}
        </HStack>

        <ReadMore header="Dette må dokumentasjonen inneholde">
          <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box.New>
  );
}
