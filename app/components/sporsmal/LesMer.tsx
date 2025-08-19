import { ReadMore } from "@navikt/ds-react";
import { KomponentBase } from "~/components/sporsmal/sporsmal.types";

interface IProps {
  spørsmål: KomponentBase;
}

export function LesMer({ spørsmål }: IProps) {
  return <ReadMore header={spørsmål.label}>{spørsmål.description}</ReadMore>;
}
