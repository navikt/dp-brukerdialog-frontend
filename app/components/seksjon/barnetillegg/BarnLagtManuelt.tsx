import { Box } from "@navikt/ds-react";
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
      <p>{barn.fodselsnummer.toString()}</p>
    </Box>
  );
}
