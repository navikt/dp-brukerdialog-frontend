import { Select } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { LandSpørsmål } from "./spørsmål.types";
import { LANDLISTE } from "~/utils/land.utils";

interface IProps {
  spørsmål: LandSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Land({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <Select
      {...field.getInputProps()}
      label={spørsmål.label}
      error={field.error()}
      key={spørsmål.id}
    >
      <option value="">Velg et land</option>
      {LANDLISTE.map((land) => (
        <option key={land.value} value={land.value}>
          {land.label}
        </option>
      ))}
    </Select>
  );
}
