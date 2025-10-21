import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack } from "@navikt/ds-react";
import { useEffect } from "react";
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

export function BarnLagtManuelt({ barn }: IProps) {
  const {
    barnLagtManuelt,
    setBarnLagtManuelt,
    setModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useBarnetilleggContext();

  function fjernBarn() {
    setBarnLagtManuelt(barnLagtManuelt.filter((b) => b.id !== barn.id));

    setDokumentasjonskrav(
      dokumentasjonskrav.filter((krav) => krav.id !== barn.dokumentasjonskravId)
    );
  }

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <Heading size="small" spacing>
        {barn[fornavnOgMellomnavn]} {barn[etternavn]}
      </Heading>
      {barn[fødselsdato] && (
        <BodyShort size="medium" spacing>
          Født {formaterNorskDato(new Date(barn[fødselsdato]))}
        </BodyShort>
      )}
      {barn[bostedsland] && (
        <BodyShort size="small" spacing>
          BOR I {finnLandnavnMedLocale(barn[bostedsland]).toUpperCase()}
        </BodyShort>
      )}

      <HStack gap="4" paddingBlock="space-6">
        <Button
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={() => {
            setModalData({ operasjon: ModalOperasjonEnum.Rediger, barn });
          }}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernBarn}
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box>
  );
}
