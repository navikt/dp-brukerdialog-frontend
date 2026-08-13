import { DownloadIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack, ReadMore, Tag, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { lastnedDokument } from "~/utils/dokument.utils";
import { DokumentasjonskravInnhold } from "../dokumentasjon/v1/DokumentasjonskravInnhold";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonskravSomErSendtAvDeg({ dokumentasjonskrav }: IProps) {
  const { t } = useTranslation("kvittering");
  return (
    <Box padding="space-16" background="sunken" borderRadius="12">
      <VStack gap="space-16">
        <HStack justify="space-between">
          <Heading size="xsmall" level="4">
            {dokumentasjonskrav.tittel}
          </Heading>
          <BodyShort>
            <Tag variant="success" size="xsmall">
              {t("dokumentkort.mottatt")}
            </Tag>
          </BodyShort>
        </HStack>

        <HStack>
          {dokumentasjonskrav.bundle && (
            <Button
              variant="tertiary"
              size="small"
              icon={<DownloadIcon aria-hidden />}
              onClick={() =>
                lastnedDokument(dokumentasjonskrav.bundle?.filsti, dokumentasjonskrav.tittel)
              }
            >
              {t("dokumentkort.lastNed")}
            </Button>
          )}
        </HStack>

        <ReadMore header={t("dokumentkort.innhold")}>
          <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
        </ReadMore>
      </VStack>
    </Box>
  );
}
