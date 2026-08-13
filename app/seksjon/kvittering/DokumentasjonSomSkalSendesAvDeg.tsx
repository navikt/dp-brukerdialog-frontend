import { BodyShort, Box, Heading, HStack, ReadMore, Tag, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { DokumentasjonskravInnhold } from "../dokumentasjon/v1/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonSomSkalSendesAvDeg({ dokumentasjonskrav }: IProps) {
  const { t } = useTranslation("kvittering");
  return (
    <Box padding="space-16" background="sunken" borderRadius="12">
      <VStack gap="space-16">
        <HStack justify="space-between">
          <Heading size="xsmall" level="4">
            {dokumentasjonskrav.tittel}
          </Heading>
          <Tag variant="warning" size="xsmall">
            {t("dokumentkort.mangler")}
          </Tag>
        </HStack>

        <BodyShort>{t("dokumentkort.skalSendesAvDeg")}</BodyShort>

        <ReadMore header={t("dokumentkort.innhold")}>
          <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box>
  );
}
