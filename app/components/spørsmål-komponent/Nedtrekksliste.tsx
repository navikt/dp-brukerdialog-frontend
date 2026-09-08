import { Select } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { DescriptionRender } from "~/components/DescriptionRender";
import { NedtrekkslisteSpørsmål } from "../Komponent.types";

interface IProps {
  props: NedtrekkslisteSpørsmål;
  formScope?: FormScope<string | Array<string> | undefined>;
  horisontal?: boolean;
  ref: React.Ref<HTMLSelectElement>;
}

export function Nedtrekksliste({ props, formScope, ref }: IProps) {
  const field = useField(formScope!);

  return (
    <Select
      {...field.getInputProps()}
      ref={ref}
      defaultValue={field.value() ?? undefined}
      label={props.label}
      key={props.id}
      description={DescriptionRender(props.description)}
      error={field.error()}
      autoComplete="off"
    >
      <option key="" value=""></option>
      {props.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
  );
}
