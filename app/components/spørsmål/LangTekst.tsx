import { Textarea } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { LangTekstSpørsmål } from "./spørsmål.types";

interface IProps {
  spørsmål: LangTekstSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function LangTekst({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <Textarea
      {...field.getInputProps()}
      label={spørsmål.label}
      description={spørsmål.description}
      key={spørsmål.id}
      maxLength={spørsmål.maxLength}
      error={field.error()}
    />
  );
}
