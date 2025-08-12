import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { KortTekstSporsmal } from "./sporsmal.types";

interface IProps {
  sporsmal: KortTekstSporsmal;
  formScope: FormScope<string | undefined>;
}

export function KortTekst({ sporsmal, formScope }: IProps) {
  const field = useField(formScope);

  return (
    <TextField
      {...field.getInputProps()}
      label={sporsmal.label}
      key={sporsmal.id}
      error={field.error()}
    />
  );
}
