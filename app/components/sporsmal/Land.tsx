import { Select } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { LANDLISTE } from "~/constants";
import { LandSporsmal } from "./sporsmal.types";
import GrunnenTilAtViSpør from "~/components/sporsmal/GrunnenTilAtViSpør";

interface IProps {
  sporsmal: LandSporsmal;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Land({ sporsmal, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <>
      <Select
        {...field.getInputProps()}
        label={sporsmal.label}
        error={field.error()}
        key={sporsmal.id}
      >
        <option value="">Velg et land</option>
        {LANDLISTE.map((land) => (
          <option key={land.value} value={land.value}>
            {land.label}
          </option>
        ))}
      </Select>
      <GrunnenTilAtViSpør spørsmål={sporsmal} />
    </>
  );
}
