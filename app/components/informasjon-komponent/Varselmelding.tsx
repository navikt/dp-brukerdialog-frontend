import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import { Varselmelding } from "~/components/Komponent.types";
import parse from "html-react-parser";

interface IProps {
  props: Varselmelding;
}

export function Varselmelding({ props }: IProps) {
  return (
    <Alert variant={props.variant}>
      {props.label && (
        <Heading spacing size="small" level="3">
          {props.label}
        </Heading>
      )}
      {<BodyLong spacing>{parse(props.description || "", { trim: true })}</BodyLong>}
    </Alert>
  );
}
