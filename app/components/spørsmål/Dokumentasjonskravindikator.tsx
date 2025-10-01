import { Box } from "@navikt/ds-react";
import { Dokumentasjonskravindikator } from "~/components/spørsmål/spørsmål.types";
import { FileTextIcon } from "@navikt/aksel-icons";

interface IProps {
  spørsmål: Dokumentasjonskravindikator;
}

export function Dokumentasjonskravindikator({ spørsmål }: IProps) {
  return (
    <Box padding="space-8">
      <span style={{ float: "left", marginRight: "0.8rem" }}>
        <FileTextIcon fontSize="1.5rem" aria-hidden />
      </span>
      <span>Du må legge ved: {spørsmål.label}. Dette gjør du på slutten av søknaden.</span>
    </Box>
  );
}
