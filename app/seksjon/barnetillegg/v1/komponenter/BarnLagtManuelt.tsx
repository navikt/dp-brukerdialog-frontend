import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack } from "@navikt/ds-react";
import {
  ModalOperasjonEnum,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  Barn,
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  fødselsdato,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";

interface IProps {
  barn: Barn;
}

export function BarnLagtManuelt({ barn: barnProps }: IProps) {
  const {
    barnLagtManuelt,
    setBarnLagtManuelt,
    setModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useBarnetilleggContext();

  function fjernEtBarn() {
    const oppdatertBarnLagtManuelt = barnLagtManuelt.filter((barn) => barn.id !== barnProps.id);
    const oppdatertDokumentasjonskrav = dokumentasjonskrav.filter(
      (krav) =>
        !Array.isArray(barnProps.dokumentasjonskrav) ||
        !barnProps.dokumentasjonskrav.includes(krav.id)
    );

    setBarnLagtManuelt(oppdatertBarnLagtManuelt);
    setDokumentasjonskrav(oppdatertDokumentasjonskrav);
  }

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <Heading size="small" spacing>
        {barnProps[fornavnOgMellomnavn]} {barnProps[etternavn]}
      </Heading>
      {barnProps[fødselsdato] && (
        <BodyShort size="medium" spacing>
          Født {formaterNorskDato(new Date(barnProps[fødselsdato]))}
        </BodyShort>
      )}
      {barnProps[bostedsland] && (
        <BodyShort size="small" spacing>
          BOR I {finnLandnavnMedLocale(barnProps[bostedsland]).toUpperCase()}
        </BodyShort>
      )}

      <HStack gap="4" paddingBlock="space-6">
        <Button
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={() => {
            setModalData({ operasjon: ModalOperasjonEnum.Rediger, barn: barnProps });
          }}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernEtBarn}
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box>
  );
}
