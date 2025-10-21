import { BodyShort, Box, Heading, HStack, ReadMore, Tag, VStack } from "@navikt/ds-react";

type DokumentasjonsBoxProps = {
  type: string;
  beskrivelse: string;
  sendesAv: string;
  status: string;
};

export default function DokumentasjonsBox({
  type,
  beskrivelse,
  sendesAv,
  status,
}: DokumentasjonsBoxProps) {
  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="large">
      <VStack gap="2">
        <HStack justify="space-between">
          <Heading size="xsmall">{type}</Heading>

          {status === "Mangler" && (
            <Tag variant={"warning"} size="xsmall">
              Mangler
            </Tag>
          )}
          {status === "Mottatt" && (
            <Tag variant={"success"} size="xsmall">
              Mottatt
            </Tag>
          )}
        </HStack>
        <BodyShort>Sendes av {sendesAv}</BodyShort>
        <ReadMore header={"Dette må dokumentasjonen inneholde"}>{beskrivelse}</ReadMore>
      </VStack>
    </Box>
  );
}
