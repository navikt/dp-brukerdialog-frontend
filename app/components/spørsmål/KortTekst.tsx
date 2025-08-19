import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { KortTekstSpørsmål } from "~/components/spørsmål/spørsmål.types";

interface IProps {
  spørsmål: KortTekstSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function KortTekst({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <TextField
      {...field.getInputProps()}
      label={spørsmål.label}
      description={spørsmål.description}
      key={spørsmål.id}
      error={field.error()}
    />
  );
}
