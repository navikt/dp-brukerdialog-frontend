import { ReadMore } from "@navikt/ds-react";
import { BaseSporsmal } from "~/components/sporsmal/sporsmal.types";

interface IProps {
  spørsmål: BaseSporsmal;
}

export function LesMer({ spørsmål }: IProps) {
  return (
    spørsmål.lesMerTekst && (
      <ReadMore header={spørsmål.lesMerLedetekst || "Grunnen til at vi spør om dette"}>{spørsmål.lesMerTekst}</ReadMore>
    )
  );
}
