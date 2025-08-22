import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { Box, Button, HStack } from "@navikt/ds-react";
import { Barn } from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";

interface IProps {
  barn: Barn;
}

export function BarnLagtManuelt({ barn }: IProps) {
  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3>
        {barn.fornavnOgMellomnavn} {barn.etternavn}
      </h3>
      <p>{barn.fødselsdato}</p>
      <p>{barn.hvilkenLandBorBarnet}</p>

      <HStack gap="4">
        <Button
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box>
  );
}
