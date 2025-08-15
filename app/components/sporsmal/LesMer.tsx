import { ReadMore } from "@navikt/ds-react";
import { BaseSporsmal } from "~/components/sporsmal/sporsmal.types";

interface IProps {
  spørsmål: BaseSporsmal;
}

export default function LesMer({ spørsmål }: IProps) {
  return (
    spørsmål.lesMerDescription && (
      <ReadMore header={spørsmål.lesMerLabel || "Grunnen til at vi spør om dette"}>{spørsmål.lesMerDescription}</ReadMore>
    )
  );
}
