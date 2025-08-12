import { BodyShort, VStack } from "@navikt/ds-react";
import { FormScope } from "@rvf/react-router";
import { Dato } from "./Dato";
import { PeriodeSporsmal } from "./sporsmal.types";

interface IProps {
  sporsmal: PeriodeSporsmal;
  formScope: FormScope<any>;
}

export function Periode({ sporsmal, formScope }: IProps) {
  return (
    <VStack gap="4">
      <BodyShort weight="semibold">{sporsmal.label}</BodyShort>
      <VStack gap="4" className="left-border">
        <Dato sporsmal={sporsmal.fom} formScope={formScope.scope(sporsmal.fom.id)} />
        <Dato sporsmal={sporsmal.tom} formScope={formScope.scope(sporsmal.tom.id)} />
      </VStack>
    </VStack>
  );
}
