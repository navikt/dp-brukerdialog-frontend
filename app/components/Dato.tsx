import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { formatISO } from "date-fns";
import { DatoSpørsmål } from "./Komponent.types";
import { useState } from "react";

interface IProps {
  props: DatoSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Dato({ props, formScope }: Readonly<IProps>) {
  const field = useField(formScope);
  const [error, setError] = useState<string | undefined>(undefined);

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: field.value() ? new Date(field.value() as string) : undefined,
    fromDate: props.fraOgMed ?? undefined,
    toDate: props.tilOgMed ?? undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : undefined);
    },
    onValidate(val) {
      if (!val.isEmpty && val.isInvalid) {
        setError("Ugyldig dato");
      } else {
        field.clearError();
        setError(undefined);
      }
    },
  });

  return (
    <DatePicker {...datepickerProps} key={props.id}>
      <DatePicker.Input
        {...inputProps}
        placeholder="DD.MM.ÅÅÅÅ"
        error={error || field.error()}
        label={props.optional ? `${props.label} (valgfritt)` : `${props.label}`}
        description={props.description}
      />
    </DatePicker>
  );
}
