import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { formatISO } from "date-fns";
import { DatoSpørsmål } from "./spørsmål.types";
import { useState } from "react";

interface IProps {
  spørsmål: DatoSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Dato({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);
  const [error, setError] = useState<string | undefined>(field.error() ?? undefined);

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: field.value() ? new Date(field.value() as string) : undefined,
    fromDate: spørsmål.fraOgMed || undefined,
    toDate: spørsmål.tilOgMed || undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : undefined);
    },
    onValidate(val) {
      if (val.isInvalid) {
        setError("Ugyldig dato");
      } else {
        setError(undefined);
      }
    },
  });

  return (
    <DatePicker {...datepickerProps} key={spørsmål.id}>
      <DatePicker.Input
        {...inputProps}
        placeholder="DD.MM.ÅÅÅÅ"
        error={error}
        label={spørsmål.optional ? `${spørsmål.label}  (valgfritt)` : `${spørsmål.label}`}
        description={spørsmål.description}
      />
    </DatePicker>
  );
}
