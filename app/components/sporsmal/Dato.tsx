import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { formatISO } from "date-fns";
import { DatoSporsmal } from "./sporsmal.types";

interface IProps {
  sporsmal: DatoSporsmal;
  formScope: FormScope<string | undefined>;
}

export function Dato({ sporsmal, formScope }: IProps) {
  const field = useField(formScope);

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: field.value() ? new Date(field.value() as string) : undefined,
    fromDate: sporsmal.fraOgMed || undefined,
    toDate: sporsmal.tilOgMed || undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : undefined);
      field.validate();
    },
  });

  return (
    <DatePicker {...datepickerProps} key={sporsmal.id}>
      <DatePicker.Input
        {...inputProps}
        placeholder="DD.MM.ÅÅÅÅ"
        error={field.error()}
        label={sporsmal.optional ? `${sporsmal.label}  (valgfritt)` : `${sporsmal.label}`}
      />
    </DatePicker>
  );
}
