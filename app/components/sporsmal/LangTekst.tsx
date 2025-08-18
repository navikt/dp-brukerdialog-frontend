import { Textarea } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { LangTekstSporsmal } from "./sporsmal.types";
import { LesMer } from "~/components/sporsmal/LesMer";

interface IProps {
  sporsmal: LangTekstSporsmal;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function LangTekst({ sporsmal, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  return (
    <>
      <Textarea
        {...field.getInputProps()}
        label={sporsmal.label}
        description={sporsmal.description}
        key={sporsmal.id}
        maxLength={sporsmal.maxLength}
        error={field.error()}
      />
      <LesMer spørsmål={sporsmal} />
    </>
  );
}
