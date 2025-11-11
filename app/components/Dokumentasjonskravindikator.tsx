import { Box } from "@navikt/ds-react";
import { Dokumentasjonskravindikator } from "~/components/Komponent.types";
import { FileTextIcon } from "@navikt/aksel-icons";

interface IProps {
  props: Dokumentasjonskravindikator;
}

export function Dokumentasjonskravindikator({ props }: IProps) {
  return (
    <Box padding="space-8">
      <span style={{ float: "left", marginRight: "0.8rem" }}>
        <FileTextIcon fontSize="1.5rem" aria-hidden />
      </span>
      <span>Du må legge ved: {props.label}. Dette gjør du på slutten av søknaden.</span>
    </Box>
  );
}
