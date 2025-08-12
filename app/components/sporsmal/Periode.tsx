import { BodyShort, VStack } from "@navikt/ds-react";
import { FormScope } from "@rvf/react-router";
import { Dato } from "./Dato";
import { PeriodeSporsmal } from "./sporsmal.types";

interface IProps {
  sporsmal: PeriodeSporsmal;
  formScope: FormScope<string | undefined>;
}

export function Periode({ sporsmal, formScope }: IProps) {
  const fomFormScope = formScope.scope("fom" as never);
  const tomFormScope = formScope.scope("tom" as never);

  return (
    <VStack gap="4">
      <BodyShort weight="semibold">{sporsmal.label}</BodyShort>
      <VStack gap="4" className="left-border">
        <Dato sporsmal={sporsmal.fom} formScope={fomFormScope} />
        <Dato sporsmal={sporsmal.tom} formScope={tomFormScope} />
      </VStack>
    </VStack>
  );
}
