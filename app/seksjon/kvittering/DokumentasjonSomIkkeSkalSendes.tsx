import { BodyShort, Box, Heading, HStack, ReadMore, VStack } from "@navikt/ds-react";
import { DokumentasjonskravInnhold } from "../dokumentasjon/v1/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import { dokumentkravSvarSendtTidligere } from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.komponenter";

interface IProps {
  dokummentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonSomIkkeSkalSendes({ dokummentasjonskrav }: IProps) {
  return (
    <Box padding="space-16" background="sunken" borderRadius="12">
      <VStack gap="space-8">
        <VStack gap="space-8">
          <HStack gap="space-8" justify="space-between">
            <Heading size="xsmall" level="4">
              {dokummentasjonskrav.tittel}
            </Heading>
          </HStack>

          <BodyShort>
            {(dokummentasjonskrav.svar === dokumentkravSvarSendtTidligere &&
              "Du har opplyst at du har sendt dette tidligere:") ||
              "Du har opplyst at du ikke sender dette:"}
            <br />
            {dokummentasjonskrav.begrunnelse}
          </BodyShort>
        </VStack>

        <ReadMore header="Dette må dokumentasjonen inneholde">
          <DokumentasjonskravInnhold type={dokummentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box>
  );
}
