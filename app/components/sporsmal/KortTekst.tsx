import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { KortTekstSpørsmål } from "~/components/sporsmal/sporsmal.types";

interface IProps {
  sporsmal: KortTekstSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function KortTekst({ sporsmal, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <TextField
      {...field.getInputProps()}
      label={sporsmal.label}
      description={sporsmal.description}
      key={sporsmal.id}
      error={field.error()}
    />
  );
}
