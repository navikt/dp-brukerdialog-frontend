import { Radio, RadioGroup } from "@navikt/ds-react";
import { EnvalgSporsmal } from "./sporsmal.types";
import { FormScope, useField } from "@rvf/react-router";

interface IProps {
  sporsmal: EnvalgSporsmal;
  formScope: FormScope<string | undefined>;
}

export function Envalg({ sporsmal, formScope }: IProps) {
  const field = useField(formScope);

  return (
    <RadioGroup
      {...field.getInputProps()}
      legend={sporsmal.label}
      key={sporsmal.id}
      description={sporsmal.description || ""}
      error={field.error()}
    >
      {sporsmal.options?.map((opt) => (
        <Radio key={opt.value} value={opt.value}>
          {opt.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
