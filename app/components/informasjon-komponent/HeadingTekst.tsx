import { Heading } from "@navikt/ds-react";
import { HeadingTekst } from "~/components/Komponent.types";

interface IProps {
  props: HeadingTekst;
}

export function HeadingTekst({ props }: IProps) {
  return (
    <Heading level={props.nivå} size={props.size} className="mt-4">
      {props.label}
    </Heading>
  );
}
