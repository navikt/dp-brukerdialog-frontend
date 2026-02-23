import { Textarea } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { Ref } from "react";
import { LangTekstSpørsmål } from "../Komponent.types";

interface IProps {
  props: LangTekstSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  ref: Ref<HTMLTextAreaElement>;
}

export function LangTekst({ props, formScope, ref }: IProps) {
  const field = useField(formScope);

  return (
    <Textarea
      {...field.getInputProps()}
      ref={ref}
      label={props.label}
      defaultValue={(field.value() as string) ?? undefined}
      description={parse(props?.description ?? "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      key={props.id}
      maxLength={props.maksLengde}
      error={field.error()}
    />
  );
}
