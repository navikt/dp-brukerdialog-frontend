import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack } from "@navikt/ds-react";
import {
  ModalOperasjonEnum,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/barnetillegg.context";
import { Barn } from "~/seksjon/barnetillegg/barnetillegg.spørsmål";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { findLandNavn } from "~/utils/land.utils";

interface IProps {
  barn: Barn;
  barnIndex: number;
}

export function BarnLagtManuelt({ barn, barnIndex }: IProps) {
  const { barnLagtManuelt, setBarnLagtManuelt, setModalData } = useBarnetilleggContext();

  function fjernBarn() {
    setBarnLagtManuelt(barnLagtManuelt.filter((_, i) => i !== barnIndex));
  }

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <Heading size="small" spacing>
        {barn.fornavnOgMellomnavn} {barn.etternavn}
      </Heading>
      {barn.fødselsdato && (
        <BodyShort size="medium" spacing>
          Født {formaterNorskDato(new Date(barn.fødselsdato))}
        </BodyShort>
      )}
      {barn.bostedsland && (
        <BodyShort size="small" spacing>
          BOR I {findLandNavn(barn.bostedsland).toUpperCase()}
        </BodyShort>
      )}

      <HStack gap="4" paddingBlock="space-6">
        <Button
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={() => {
            setModalData({ operasjon: ModalOperasjonEnum.Rediger, barn, barnIndex });
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
