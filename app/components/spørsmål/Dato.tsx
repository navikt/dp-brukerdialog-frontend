import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { formatISO } from "date-fns";
import { DatoSpørsmål } from "./spørsmål.types";

interface IProps {
  spørsmål: DatoSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Dato({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: field.value() ? new Date(field.value() as string) : undefined,
    fromDate: spørsmål.fraOgMed || undefined,
    toDate: spørsmål.tilOgMed || undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : undefined);
      field.validate();
    },
  });

  return (
    <DatePicker {...datepickerProps} key={spørsmål.id}>
      <DatePicker.Input
        {...inputProps}
        placeholder="DD.MM.ÅÅÅÅ"
        error={field.error()}
        label={spørsmål.optional ? `${spørsmål.label}  (valgfritt)` : `${spørsmål.label}`}
        description={spørsmål.description}
      />
    </DatePicker>
  );
}
