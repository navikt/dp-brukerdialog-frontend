import { TextField } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { KortTekstSpørsmål } from "~/components/Komponent.types";
import { DescriptionRender } from "~/components/DescriptionRender";

interface IProps {
  props: KortTekstSpørsmål;
  formScope?: FormScope<string | Array<string> | undefined>;
  ref: React.Ref<HTMLInputElement>;
}

export function KortTekst({ props, formScope, ref }: IProps) {
  const field = useField(formScope!);

  return (
    <TextField
      {...field.getInputProps()}
      ref={ref}
      label={props.label}
      defaultValue={(field.value() as string) ?? undefined}
      description={DescriptionRender(props.description)}
      key={props.id}
      error={field.error()}
      autoComplete="off"
    />
  );
}
