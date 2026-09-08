import { HStack, Radio, RadioGroup } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { Ref } from "react";
import { DescriptionRender } from "~/components/DescriptionRender";
import { EnvalgSpørsmål } from "../Komponent.types";

interface IProps {
  props: EnvalgSpørsmål;
  formScope?: FormScope<string | Array<string> | undefined>;
  horisontal?: boolean;
  ref: Ref<HTMLFieldSetElement>;
}

export function Envalg({ props, formScope, horisontal, ref }: IProps) {
  const field = useField(formScope!);

  return (
    <RadioGroup
      {...field.getInputProps()}
      ref={ref}
      legend={props.label}
      key={props.id}
      defaultValue={(field.value() as string) ?? undefined}
      description={DescriptionRender(props.description)}
      error={field.error()}
    >
      {horisontal && (
        <HStack gap="space-24">
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
