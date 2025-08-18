import { KortTekstSporsmal } from "~/components/sporsmal/sporsmal.types";
import { FormScope, useField } from "@rvf/react-router";
import { TextField } from "@navikt/ds-react";
import { LesMer } from "~/components/sporsmal/LesMer";

interface IProps {
  sporsmal: KortTekstSporsmal;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function KortTekst({ sporsmal, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <>
      <TextField
        {...field.getInputProps()}
        label={sporsmal.label}
        description={sporsmal.description}
        key={sporsmal.id}
        error={field.error()}
      />
      <LesMer spørsmål={sporsmal} />
    </>
  );
}
