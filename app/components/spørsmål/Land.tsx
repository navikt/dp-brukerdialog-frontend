import { Select } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { FLERE_LAND, OFTE_VALGTE_LAND } from "~/utils/land.utils";
import { LandSpørsmål } from "./spørsmål.types";

interface IProps {
  spørsmål: LandSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Land({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <Select
      {...field.getInputProps()}
      label={spørsmål.label}
      description={parse(spørsmål?.description || "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      error={field.error()}
      key={spørsmål.id}
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
