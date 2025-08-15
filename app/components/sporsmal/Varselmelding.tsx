import { Alert } from "@navikt/ds-react";
import { VarselmeldingKomponent } from "~/components/sporsmal/sporsmal.types";
import parse from "html-react-parser";
import { FormScope } from "@rvf/react-router";

interface IProps {
  sporsmal: VarselmeldingKomponent;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Varselmelding({ sporsmal, formScope }: Readonly<IProps>) {
  return (
    sporsmal.varselvariant &&
    sporsmal.varselmelding && (
      <Alert variant={sporsmal.varselvariant}>
        {parse(sporsmal.varselmelding || "", { trim: true })}
      </Alert>
    )
  );
}
