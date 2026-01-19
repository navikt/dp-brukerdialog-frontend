import { BodyShort, Box, Heading, HStack, ReadMore, VStack } from "@navikt/ds-react";
import { DokumentasjonskravInnhold } from "../dokumentasjon/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import { dokumentkravSvarSendtTidligere } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";

interface IProps {
  dokummentasjonskrav: Dokumentasjonskrav;
}

export default function DokumentasjonSomIkkeSkalSendes({ dokummentasjonskrav }: IProps) {
  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large">
      <VStack gap="2">
        <VStack gap="2">
          <HStack gap="2" justify="space-between">
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
    </Box.New>
  );
}
