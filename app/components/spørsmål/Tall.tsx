import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { TallSpørsmål } from "~/components/spørsmål/spørsmål.types";
import parse from "html-react-parser";

interface IProps {
  spørsmål: TallSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Tall({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <TextField
      {...field.getInputProps()}
      inputMode="decimal"
      label={spørsmål.label}
      description={parse(spørsmål?.description || "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      key={spørsmål.id}
      onInput={(event) => {
        field.setValue(event.currentTarget.value?.replace(".", ","));
      }}
      error={field.error()}
    />
  );
}
