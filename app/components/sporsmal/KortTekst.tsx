import { KortTekstSporsmal } from "~/components/sporsmal/sporsmal.types";
import { FormScope, useField } from "@rvf/react-router";
import { TextField } from "@navikt/ds-react";
import GrunnenTilAtViSpør from "~/components/sporsmal/GrunnenTilAtViSpør";

interface IProps {
  sporsmal: KortTekstSporsmal;
  formScope: FormScope<string | Array<string> | undefined>;
}

export default function KortTekst({ sporsmal, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <>
      <TextField
        {...field.getInputProps()}
        label={sporsmal.label}
        key={sporsmal.id}
        error={field.error()}
      />
      <GrunnenTilAtViSpør spørsmål={sporsmal} />
    </>
  );
}
