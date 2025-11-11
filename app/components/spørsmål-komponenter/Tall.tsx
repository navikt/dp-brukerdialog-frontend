import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { TallSpørsmål } from "~/components/Komponent.types";

interface IProps {
  props: TallSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Tall({ props, formScope }: IProps) {
  const field = useField(formScope);

  return (
    <TextField
      {...field.getInputProps()}
      inputMode="decimal"
      defaultValue={(field.value() as string) ?? undefined}
      label={props.label}
      description={parse(props?.description || "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      key={props.id}
      onInput={(event) => {
        field.setValue(event.currentTarget.value?.replace(".", ","));
      }}
      error={field.error()}
    />
  );
}
