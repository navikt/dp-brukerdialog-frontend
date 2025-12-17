import { BodyShort, DatePicker, useDatepicker, VStack } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import classNames from "classnames";
import { formatISO } from "date-fns";
import { useState } from "react";
import { PeriodeSpørsmål } from "../Komponent.types";

import styles from "./Periode.module.css";

interface IProps {
  props: PeriodeSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Periode({ props, formScope }: IProps) {
  const field = useField(formScope);
  const [error, setError] = useState<string | undefined>(undefined);

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: field.value() ? new Date(field.value() as string) : undefined,
    fromDate: props.fraOgMed ? new Date(props.fraOgMed.toString()) : undefined,
    toDate: props.tilOgMed ? new Date(props.tilOgMed.toString()) : undefined,
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

  const periodeFraSpørsmal = props.type === "periodeFra";
  const periodeTilSpørsmal = props.type === "periodeTil";

  return (
    <VStack gap="4">
      {props.type === "periodeFra" && <BodyShort weight="semibold">{props.periodeLabel}</BodyShort>}
      <VStack
        className={classNames(styles.periodeVenstreBorder, {
          [styles.periodeVenstreBorderfra]: periodeFraSpørsmal,
          [styles.periodeVenstreBordertil]: periodeTilSpørsmal,
        })}
      >
        <DatePicker {...datepickerProps}>
          <DatePicker.Input
            {...inputProps}
            key={props.id}
            placeholder="DD.MM.ÅÅÅÅ"
            error={error || field.error()}
            label={
              periodeTilSpørsmal && props.optional ? `${props.label} (valgfritt)` : props.label
            }
            description={props.description}
          />
        </DatePicker>
      </VStack>
    </VStack>
  );
}
