import { ReadMore } from "@navikt/ds-react";
import { KomponentBase } from "~/components/Komponent.types";
import { DescriptionRender } from "~/components/DescriptionRender";

interface IProps {
  props: KomponentBase;
}

export function LesMer({ props }: IProps) {
  return <ReadMore header={props.label}>{DescriptionRender(props.description)}</ReadMore>;
}
