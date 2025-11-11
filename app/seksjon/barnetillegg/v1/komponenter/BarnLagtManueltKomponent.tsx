import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack } from "@navikt/ds-react";
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
      dokumentasjonskrav.filter((krav) => krav.id !== barnProps?.dokumentasjonskrav?.[0])
    );
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
            setModalData({ operasjon: ModalOperasjon.Rediger, barn: barnProps });
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
