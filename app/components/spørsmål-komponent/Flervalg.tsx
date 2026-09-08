import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { DescriptionRender } from "~/components/DescriptionRender";
import { FlervalgSpørsmål } from "../Komponent.types";

interface IProps {
  props: FlervalgSpørsmål;
  formScope?: FormScope<string | Array<string> | undefined>;
  ref: React.Ref<HTMLFieldSetElement>;
}

export function Flervalg({ props, formScope, ref }: IProps) {
  const field = useField(formScope!);
  const value = (field.value() as string[]) ?? undefined;

  return (
    <CheckboxGroup
      {...field.getInputProps()}
      ref={ref}
      legend={props.label}
      description={DescriptionRender(props.description)}
      key={props.id}
      error={field.error()}
      value={value}
      defaultValue={(field.value() as string[]) ?? undefined}
    >
      {props.options?.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          {option.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
