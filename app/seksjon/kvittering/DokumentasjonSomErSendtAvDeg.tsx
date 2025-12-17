import { DownloadIcon } from "@navikt/aksel-icons";
import { Box, Button, Heading, HStack, ReadMore, Tag } from "@navikt/ds-react";
import { lastnedDokument } from "~/utils/dokument.utils";
import { DokumentasjonskravInnhold } from "../dokumentasjon/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export default function DokumentasjonskravSomErSendtAvDeg({ dokumentasjonskrav }: IProps) {
  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large">
      <HStack gap="2" justify="space-between">
        <Heading size="xsmall" level="4">
          {dokumentasjonskrav.tittel}
        </Heading>
        <Tag variant="success" size="xsmall">
          Mottatt
        </Tag>
      </HStack>

      {dokumentasjonskrav.bundle && (
        <Button
          variant="tertiary"
          className="mt-4"
          size="small"
          icon={<DownloadIcon />}
          onClick={() =>
            lastnedDokument(dokumentasjonskrav.bundle?.filsti, dokumentasjonskrav.tittel)
          }
        >
          Last ned opplastet dokument
        </Button>
      )}

      <ReadMore header="Dette må dokumentasjonen inneholde" className="mt-4">
        <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
      </ReadMore>
    </Box.New>
  );
}
