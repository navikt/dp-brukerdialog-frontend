import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { FlervalgSpørsmål } from "./spørsmål.types";

interface IProps {
  spørsmål: FlervalgSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Flervalg({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <CheckboxGroup
      {...field.getInputProps()}
      legend={spørsmål.label}
      description={spørsmål.description}
      key={spørsmål.id}
      error={field.error()}
    >
      {spørsmål.options?.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          {option.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
