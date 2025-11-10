import { Textarea } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { LangTekstSpørsmål } from "./spørsmål.types";
import parse from "html-react-parser";

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
      defaultValue={(field.value() as string) ?? undefined}
      description={parse(spørsmål?.description ?? "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      key={spørsmål.id}
      maxLength={spørsmål.maxLength}
      error={field.error()}
    />
  );
}
