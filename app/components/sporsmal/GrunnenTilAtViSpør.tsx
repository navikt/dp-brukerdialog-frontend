import { ReadMore } from "@navikt/ds-react";
import { BaseSporsmal } from "~/components/sporsmal/sporsmal.types";

interface IProps {
  spørsmål: BaseSporsmal;
}

export default function GrunnenTilAtViSpør({ spørsmål }: IProps) {
  return (
    spørsmål.grunnenTilAtViSpør && (
      <ReadMore header="Grunnen til at vi spør om dette">{spørsmål.grunnenTilAtViSpør}</ReadMore>
    )
  );
}
