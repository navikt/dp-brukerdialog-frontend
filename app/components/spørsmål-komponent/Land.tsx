import { Select } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { Ref } from "react";
import { EØS_LAND, FLERE_LAND, OFTE_VALGTE_LAND } from "~/utils/land.utils";
import { LandSpørsmål } from "../Komponent.types";

interface IProps {
  props: LandSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  ref: Ref<HTMLSelectElement>;
}

export function Land({ props, formScope, ref }: IProps) {
  const field = useField(formScope);

  return (
    <Select
      {...field.getInputProps()}
      ref={ref}
      defaultValue={field.value() ?? undefined}
      label={props.label}
      description={parse(props?.description || "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      error={field.error()}
      key={props.id}
    >
      <option value="">Velg et land</option>
      {props.erEøsLand && (
        <>
          {EØS_LAND.map((land) => (
            <option key={land.value} value={land.value}>
              {land.label}
            </option>
          ))}
        </>
      )}

      {!props.erEøsLand && (
        <>
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
        </>
      )}
    </Select>
  );
}
