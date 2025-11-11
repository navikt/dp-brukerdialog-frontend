import { Select } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { NedtrekkslisteSpørsmål } from "./spørsmål.types";

interface IProps {
  spørsmål: NedtrekkslisteSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  horisontal?: boolean;
}

export function Nedtrekksliste({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <Select
      {...field.getInputProps()}
      defaultValue={field.value() ?? undefined}
      label={spørsmål.label}
      key={spørsmål.id}
      description={parse(spørsmål?.description || "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      error={field.error()}
    >
      <option key="" value=""></option>
      {spørsmål.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
  );
}
