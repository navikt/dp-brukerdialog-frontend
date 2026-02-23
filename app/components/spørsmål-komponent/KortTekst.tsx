import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { KortTekstSpørsmål } from "~/components/Komponent.types";
import parse from "html-react-parser";

interface IProps {
  props: KortTekstSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  ref: React.Ref<HTMLInputElement>;
}

export function KortTekst({ props, formScope, ref }: IProps) {
  const field = useField(formScope);

  return (
    <TextField
      {...field.getInputProps()}
      ref={ref}
      tabIndex={-1}
      label={props.label}
      defaultValue={(field.value() as string) ?? undefined}
      description={parse(props?.description ?? "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      key={props.id}
      error={field.error()}
    />
  );
}
