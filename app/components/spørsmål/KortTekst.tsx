import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { KortTekstSpørsmål } from "~/components/spørsmål/spørsmål.types";
import parse from "html-react-parser";

interface IProps {
  spørsmål: KortTekstSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function KortTekst({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <TextField
      {...field.getInputProps()}
      label={spørsmål.label}
      defaultValue={(field.value() as string) ?? undefined}
      description={parse(spørsmål?.description ?? "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      key={spørsmål.id}
      error={field.error()}
    />
  );
}
