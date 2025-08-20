import { ReadMore } from "@navikt/ds-react";
import { KomponentBase } from "~/components/spørsmål/spørsmål.types";
import parse from "html-react-parser";

interface IProps {
  spørsmål: KomponentBase;
}

export function LesMer({ spørsmål }: IProps) {
  // TODO: Få denne til å parse react-komponenter?
  return <ReadMore header={spørsmål.label}>{parse(spørsmål?.description || "", { trim: true })}</ReadMore>;
}
