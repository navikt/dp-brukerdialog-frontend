import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { TallSpørsmål } from "~/components/Komponent.types";
import { DescriptionRender } from "~/components/DescriptionRender";

interface IProps {
  props: TallSpørsmål;
  formScope?: FormScope<string | Array<string> | undefined>;
  ref: React.Ref<HTMLInputElement>;
}

export function Tall({ props, formScope, ref }: IProps) {
  const field = useField(formScope!);

  return (
    <TextField
      {...field.getInputProps()}
      ref={ref}
      inputMode="decimal"
      defaultValue={(field.value() as string) ?? undefined}
      label={props.label}
      description={DescriptionRender(props.description)}
      key={props.id}
      onInput={(event) => {
        field.setValue(event.currentTarget.value?.replace(".", ","));
      }}
      error={field.error()}
      autoComplete="off"
    />
  );
}
