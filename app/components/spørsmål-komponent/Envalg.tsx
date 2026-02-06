import { HStack, Radio, RadioGroup } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import parse from "html-react-parser";
import { EnvalgSpørsmål } from "../Komponent.types";
import { useEffect, useRef } from "react";

interface IProps {
  props: EnvalgSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  horisontal?: boolean;
}

export function Envalg({ props, formScope, horisontal }: IProps) {
  const field = useField(formScope);
  const ref = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    if (field.error()) {
      console.log("🎯 Setting focus on RadioGroup", field.error());
      ref.current?.focus();
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      // Debug styling
      if (ref.current) {
        ref.current.style.backgroundColor = "yellow";
        ref.current.style.outline = "3px solid red";
      }
    } else {
      // Remove debug styling
      if (ref.current) {
        ref.current.style.backgroundColor = "";
        ref.current.style.outline = "";
      }
    }
  }, [field.error()]);

  return (
    <RadioGroup
      {...field.getInputProps()}
      legend={props.label}
      ref={ref}
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
