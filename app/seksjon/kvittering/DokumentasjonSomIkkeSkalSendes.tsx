import { useTranslation } from "react-i18next";
import { BodyShort, Box, Heading, HStack, ReadMore, VStack } from "@navikt/ds-react";
import { dokumentkravSvarSendtTidligere } from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.komponenter";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import { DokumentasjonskravInnhold } from "../dokumentasjon/v1/DokumentasjonskravInnhold";

interface IProps {
  dokummentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonSomIkkeSkalSendes({ dokummentasjonskrav }: IProps) {
  const { t } = useTranslation("kvittering");

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
            {dokummentasjonskrav.svar === dokumentkravSvarSendtTidligere
              ? t("dokumentasjonskrav.sendtTidligere")
              : t("dokumentasjonskrav.senderIkke")}
            <br />
            {dokummentasjonskrav.begrunnelse}
          </BodyShort>
        </VStack>

        <ReadMore header={t("dokumentasjonskrav.readMoreHeader")}>
          <DokumentasjonskravInnhold type={dokummentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box>
  );
}
