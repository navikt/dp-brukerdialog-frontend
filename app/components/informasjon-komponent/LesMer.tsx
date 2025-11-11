import { ReadMore } from "@navikt/ds-react";
import { KomponentBase } from "~/components/Komponent.types";
import parse from "html-react-parser";

interface IProps {
  props: KomponentBase;
}

export function LesMer({ props }: IProps) {
  // TODO: Få denne til å parse react-komponenter?
  return (
    <ReadMore header={props.label}>{parse(props?.description || "", { trim: true })}</ReadMore>
  );
}
