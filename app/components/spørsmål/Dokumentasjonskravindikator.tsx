import { Box } from "@navikt/ds-react";
import { Dokumentasjonskravindikator } from "~/components/spørsmål/spørsmål.types";
import { FileIcon } from "@navikt/aksel-icons";

interface IProps {
  spørsmål: Dokumentasjonskravindikator;
}

export function Dokumentasjonskravindikator({ spørsmål }: Readonly<IProps>) {
  return (
    // TODO: Få en frontender til å lage denne litt mindre hacky.
    <Box
      padding="space-16"
      background="surface-action-subtle"
      borderWidth="1"
      borderColor="border-action"
    >
      <span style={{ float: "left", marginRight: "0.8rem" }}>
        <FileIcon fontSize="1.5rem" style={{ verticalAlign: "text-top" }} />
      </span>
      <span>Du må legge ved: {spørsmål.label}. Dette gjør du på slutten av søknaden.</span>
    </Box>
  );
}
