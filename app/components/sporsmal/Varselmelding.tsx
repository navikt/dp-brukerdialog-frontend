import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import { Varselmelding } from "~/components/sporsmal/sporsmal.types";
import parse from "html-react-parser";

interface IProps {
  sporsmal: Varselmelding;
}

export function Varselmelding({ sporsmal }: Readonly<IProps>) {
  return (
    <Alert variant={sporsmal.variant}>
      {sporsmal.label && (
        <Heading spacing size="small" level="3">
          Informasjon om ansvaret ditt
        </Heading>
      )}
      {<BodyLong spacing>{parse(sporsmal.description || "", { trim: true })}</BodyLong>}
    </Alert>
  );
}
