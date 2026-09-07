import { KomponentBase } from "~/components/Komponent.types";
import { DescriptionRender } from "~/components/DescriptionRender";

interface IProps {
  props: KomponentBase;
}

export function ForklarendeTekst({ props }: IProps) {
  return <div className="forklarende-tekst">{DescriptionRender(props.description)}</div>;
}
