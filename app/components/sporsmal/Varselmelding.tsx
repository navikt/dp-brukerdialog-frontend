import { Alert } from "@navikt/ds-react";
import { VarselmeldingKomponent } from "~/components/sporsmal/sporsmal.types";
import parse from "html-react-parser";

interface IProps {
  sporsmal: VarselmeldingKomponent;
}

export function Varselmelding({ sporsmal }: Readonly<IProps>) {
  return (
    sporsmal.varselvariant &&
    sporsmal.varselmelding && (
      <Alert variant={sporsmal.varselvariant}>
        {parse(sporsmal.varselmelding || "", { trim: true })}
      </Alert>
    )
  );
}
