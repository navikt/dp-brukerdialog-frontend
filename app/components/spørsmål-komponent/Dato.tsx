import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { formatISO } from "date-fns";
import { Ref, useState } from "react";
import { formaterNorskDatoMedTall } from "~/utils/formatering.utils";
import { DatoSpørsmål } from "../Komponent.types";

interface IProps {
  props: DatoSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  ref: Ref<HTMLInputElement>;
}

export function Dato({ props, formScope, ref }: IProps) {
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
      } else if (!val.isEmpty && val.isAfter) {
        setError(
          `Valgt dato er etter siste gyldige dato (${formaterNorskDatoMedTall(props.tilOgMed!)})`
        );
      } else if (!val.isEmpty && val.isBefore) {
        setError(
          `Valgt dato er før første gyldige dato (${formaterNorskDatoMedTall(props.fraOgMed!)})`
        );
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
        ref={ref}
        placeholder="DD.MM.ÅÅÅÅ"
        error={error || field.error()}
        label={props.optional ? `${props.label} (valgfritt)` : `${props.label}`}
        description={props.description}
      />
    </DatePicker>
  );
}
