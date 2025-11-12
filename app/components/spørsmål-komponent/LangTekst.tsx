import { Textarea } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { LangTekstSpørsmål } from "../Komponent.types";
import parse from "html-react-parser";

interface IProps {
  props: LangTekstSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function LangTekst({ props, formScope }: IProps) {
  const field = useField(formScope);

  return (
    <Textarea
      {...field.getInputProps()}
      label={props.label}
      defaultValue={(field.value() as string) ?? undefined}
      description={parse(props?.description ?? "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      key={props.id}
      maxLength={props.maxLength}
      error={field.error()}
    />
  );
}
