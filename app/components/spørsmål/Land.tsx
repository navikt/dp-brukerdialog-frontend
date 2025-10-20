import { Select } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { LANDLISTE } from "~/utils/land.utils";
import { LandSpørsmål } from "./spørsmål.types";
import parse from "html-react-parser";

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
      {LANDLISTE.map((land) => (
        <option key={land.value} value={land.value}>
          {land.label}
        </option>
      ))}
    </Select>
  );
}
