import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { FlervalgSpørsmål } from "../Komponent.types";
import { useEffect } from "react";
import parse from "html-react-parser";

interface IProps {
  props: FlervalgSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Flervalg({ props, formScope }: Readonly<IProps>) {
  const field = useField(formScope);
  const value = (field.value() as string[]) ?? undefined;

  return (
    <CheckboxGroup
      {...field.getInputProps()}
      legend={props.label}
      description={parse(props?.description ?? "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
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
