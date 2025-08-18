import { Radio, RadioGroup } from "@navikt/ds-react";
import { EnvalgSporsmal } from "./sporsmal.types";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { LesMer } from "~/components/sporsmal/LesMer";

interface IProps {
  sporsmal: EnvalgSporsmal;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Envalg({ sporsmal, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <>
      <RadioGroup
        {...field.getInputProps()}
        legend={sporsmal.label}
        key={sporsmal.id}
        description={parse(sporsmal?.description || "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
        error={field.error()}
      >
        {sporsmal.options?.map((opt) => (
          <Radio key={opt.value} value={opt.value}>
            {opt.label}
          </Radio>
        ))}
      </RadioGroup>
      <LesMer spørsmål={sporsmal} />
    </>
  );
}
