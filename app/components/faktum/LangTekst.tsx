import { Textarea } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { LangTekstSporsmal } from "../seksjon/seksjon.types";

interface IProps {
  sporsmal: LangTekstSporsmal;
  formScope: FormScope<string>;
}

export function LangTekst({ sporsmal, formScope }: IProps) {
  const field = useField(formScope);

  return (
    <Textarea
      {...field.getInputProps()}
      label={sporsmal.label}
      key={sporsmal.id}
      maxLength={sporsmal.maxLength}
      error={field.error()}
    />
  );
}
