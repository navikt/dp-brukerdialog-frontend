import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import {
  ModalOperasjon,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  BarnLagtManuelt,
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  fødselsdato,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";

interface IProps {
  barn: BarnLagtManuelt;
}

export function BarnLagtManueltKomponent({ barn: barnProps }: IProps) {
  const { t } = useTranslation("barnetillegg/v1");
  const {
    barnLagtManuelt,
    setBarnLagtManuelt,
    setModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useBarnetilleggContext();

  function fjernBarn() {
    setBarnLagtManuelt(barnLagtManuelt.filter((barn) => barn.id !== barnProps.id));

    setDokumentasjonskrav(
      dokumentasjonskrav.filter((krav) => !barnProps.dokumentasjonskrav?.includes(krav.id))
    );
  }

  return (
    <Box padding="space-16" background="sunken" borderRadius="16">
      <Heading size="small" spacing>
        {barnProps[fornavnOgMellomnavn]} {barnProps[etternavn]}
      </Heading>
      {barnProps[fødselsdato] && (
        <BodyShort size="medium" spacing>
          {t("barnFraPdl.født", { dato: formaterNorskDato(new Date(barnProps[fødselsdato])) })}
        </BodyShort>
      )}
      {barnProps[bostedsland] && (
        <BodyShort size="small" spacing>
          {t("barnFraPdl.borI", {
            land: finnLandnavnMedLocale(barnProps[bostedsland]).toUpperCase(),
          })}
        </BodyShort>
      )}
      <HStack gap="space-16" paddingBlock="space-6">
        <Button
          variant="secondary"
          size="small"
          icon={<PencilIcon aria-hidden />}
          onClick={() => {
            setModalData({ operasjon: ModalOperasjon.Rediger, barn: barnProps });
          }}
        >
          {t("barnLagtManuelt.endreSvar")}
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernBarn}
          icon={<TrashIcon aria-hidden />}
        >
          {t("barnLagtManuelt.fjern")}
        </Button>
      </HStack>
    </Box>
  );
}
