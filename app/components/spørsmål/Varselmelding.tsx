import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import { Varselmelding } from "~/components/spørsmål/spørsmål.types";
import parse from "html-react-parser";

interface IProps {
  spørsmål: Varselmelding;
}

export function Varselmelding({ spørsmål }: Readonly<IProps>) {
  return (
    <Alert variant={spørsmål.variant}>
      {spørsmål.label && (
        <Heading spacing size="small" level="3">
          Informasjon om ansvaret ditt
        </Heading>
      )}
      {<BodyLong spacing>{parse(spørsmål.description || "", { trim: true })}</BodyLong>}
    </Alert>
  );
}
