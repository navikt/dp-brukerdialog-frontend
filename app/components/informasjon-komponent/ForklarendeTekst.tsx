import parse from "html-react-parser";
import { KomponentBase } from "~/components/Komponent.types";

interface IProps {
  props: KomponentBase;
}

export function ForklarendeTekst({ props }: IProps) {
  return <>{parse(props?.description || "", { trim: true })}</>;
}
