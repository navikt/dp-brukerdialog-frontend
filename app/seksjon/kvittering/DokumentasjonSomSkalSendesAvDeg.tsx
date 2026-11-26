import { Box, Heading, HStack, ReadMore, Tag, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import { DokumentasjonskravInnhold } from "../dokumentasjon/v1/DokumentasjonskravInnhold";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonSomSkalSendesAvDeg({ dokumentasjonskrav }: IProps) {
  const { t } = useTranslation("kvittering");
  return (
    <Box padding="space-16" borderRadius="12" borderWidth="1" borderColor="neutral-subtle">
      <VStack gap="space-16">
        <HStack gap="space-16" justify="space-between" wrap={false} align="start">
          <Heading size="xsmall" level="4">
            {dokumentasjonskrav.tittel}
          </Heading>
          <Tag variant="warning" size="xsmall">
            {t("dokumentkort.mangler")}
          </Tag>
        </HStack>

        <ReadMore header={t("dokumentkort.innhold")}>
          <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box>
  );
}
