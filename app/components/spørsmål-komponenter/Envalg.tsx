import { HStack, Radio, RadioGroup } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { EnvalgSpørsmål } from "../Komponent.types";

interface IProps {
  props: EnvalgSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  horisontal?: boolean;
}

export function Envalg({ props, formScope, horisontal }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <RadioGroup
      {...field.getInputProps()}
      legend={props.label}
      key={props.id}
      defaultValue={(field.value() as string) ?? undefined}
      description={parse(props?.description ?? "", { trim: true })} // TODO: Få denne til å parse react-komponenter?
      error={field.error()}
    >
      {horisontal && (
        <HStack gap="6">
          {props.options?.map((opt) => (
            <Radio key={opt.value} value={opt.value}>
              {opt.label}
            </Radio>
          ))}
        </HStack>
      )}
      {!horisontal &&
        props.options?.map((opt) => (
          <Radio key={opt.value} value={opt.value}>
            {opt.label}
          </Radio>
        ))}
    </RadioGroup>
  );
}
