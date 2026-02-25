import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { TallSpørsmål } from "~/components/Komponent.types";

interface IProps {
  props: TallSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  ref: React.Ref<HTMLInputElement>;
}

export function Tall({ props, formScope, ref }: IProps) {
  const field = useField(formScope);

  return (
    <TextField
      {...field.getInputProps()}
      ref={ref}
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
