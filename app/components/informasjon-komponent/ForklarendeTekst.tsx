import { BodyLong } from "@navikt/ds-react";
import { KomponentBase } from "~/components/Komponent.types";
import parse from "html-react-parser";

interface IProps {
  props: KomponentBase;
}

export function ForklarendeTekst({ props }: IProps) {
  // TODO: Få denne til å parse react-komponenter?
  return <BodyLong>{parse(props?.description || "", { trim: true })}</BodyLong>;
}
