import { Select } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { FLERE_LAND, OFTE_VALGTE_LAND } from "~/utils/land.utils";
import { LandSpørsmål } from "./Komponent.types";

interface IProps {
  props: LandSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Land({ props, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <Select
      {...field.getInputProps()}
      defaultValue={field.value() ?? undefined}
      label={props.label}
      description={parse(props?.description || "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      error={field.error()}
      key={props.id}
    >
      <option value="">Velg et land</option>
      <optgroup label="Ofte valgte land">
        {OFTE_VALGTE_LAND.map((land) => (
          <option key={land.value} value={land.value}>
            {land.label}
          </option>
        ))}
      </optgroup>
      <optgroup label="Flere land">
        {FLERE_LAND.map((land) => (
          <option key={land.value} value={land.value}>
            {land.label}
          </option>
        ))}
      </optgroup>
    </Select>
  );
}
