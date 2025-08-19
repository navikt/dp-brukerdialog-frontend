import { Radio, RadioGroup } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { EnvalgSpørsmål } from "./spørsmål.types";

interface IProps {
  spørsmål: EnvalgSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Envalg({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <RadioGroup
      {...field.getInputProps()}
      legend={spørsmål.label}
      key={spørsmål.id}
      description={parse(spørsmål?.description || "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      error={field.error()}
    >
      {spørsmål.options?.map((opt) => (
        <Radio key={opt.value} value={opt.value}>
          {opt.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
