import { BodyShort, DatePicker, useDatepicker, VStack } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { Dato } from "./Dato";
import { PeriodeSporsmal } from "./sporsmal.types";
import { formatISO } from "date-fns";

interface IProps {
  sporsmal: PeriodeSporsmal;
  formScope: FormScope<string | undefined>;
}

export function Periode({ sporsmal, formScope }: IProps) {
  const fomField = useField(formScope.scope("fom" as never));
  const tomField = useField(formScope.scope("tom" as never));

  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: undefined,
    toDate: undefined,
    onDateChange: (date) => {
      // fomField.setValue(date ? formatISO(date, { representation: "date" }) : undefined);
      fomField.validate();
    },
  });

  return (
    <VStack gap="4">
      <BodyShort weight="semibold">{sporsmal.label}</BodyShort>
      <VStack gap="4" className="left-border">
        <DatePicker {...datepickerProps}>
          <DatePicker.Input
            {...inputProps}
            name={`${sporsmal.id}.fra`}
            placeholder="DD.MM.ÅÅÅÅ"
            error={fomField.error()}
            label={sporsmal.label}
          />
        </DatePicker>
        {/* <Dato sporsmal={sporsmal.tom} formScope={tomScope} /> */}
      </VStack>
    </VStack>
  );
}
