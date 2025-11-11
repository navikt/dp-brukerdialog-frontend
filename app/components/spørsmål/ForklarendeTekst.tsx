import { BodyLong } from "@navikt/ds-react";
import { KomponentBase } from "~/components/spørsmål/spørsmål.types";
import parse from "html-react-parser";

interface IProps {
  spørsmål: KomponentBase;
}

export function ForklarendeTekst({ spørsmål }: IProps) {
  // TODO: Få denne til å parse react-komponenter?
  return <BodyLong>{parse(spørsmål?.description || "", { trim: true })}</BodyLong>;
}
