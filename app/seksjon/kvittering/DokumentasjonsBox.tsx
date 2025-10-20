import { BodyShort, Box, Heading, HStack, ReadMore, Tag } from "@navikt/ds-react";

type DokumentasjonsBoxProps = {
  type: string;
  beskrivelse: string;
  sendesAv: string;
};

export default function DokumentasjonsBox({ type, beskrivelse, sendesAv }: DokumentasjonsBoxProps) {
  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="large">
      <HStack justify="space-between">
        <Heading spacing size="xsmall">
          {type}
        </Heading>
        <Tag variant="warning" size="xsmall">
          Mangler
        </Tag>
      </HStack>
      <BodyShort>Sendes av {sendesAv}</BodyShort>
      <ReadMore header={"Dette må dokumentasjonen inneholde"}>{beskrivelse}</ReadMore>
    </Box>
  );
}
