import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { formatISO } from "date-fns";
import { DatoSporsmal } from "./sporsmal.types";
import { FormScope, useField } from "@rvf/react-router";

interface IProps {
  sporsmal: DatoSporsmal;
  formScope: FormScope<string | undefined>;
}

export function Dato({ sporsmal, formScope }: IProps) {
  const field = useField(formScope);

  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: sporsmal.fom || undefined,
    toDate: sporsmal.tom || undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : undefined);
      field.validate();
    },
  });

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input
        {...inputProps}
        name={`${sporsmal.id}.fra`}
        placeholder="DD.MM.ÅÅÅÅ"
        error={field.error()}
        label={sporsmal.optional ? `${sporsmal.label}  (valgfritt)` : `${sporsmal.label}`}
      />
    </DatePicker>
  );
}
