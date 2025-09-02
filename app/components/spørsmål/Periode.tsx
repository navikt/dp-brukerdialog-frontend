import { BodyShort, DatePicker, useDatepicker, VStack } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import classNames from "classnames";
import { formatISO } from "date-fns";
import { useState } from "react";
import { PeriodeSpørsmål } from "./spørsmål.types";

import styles from "./spørsmål.module.css";

interface IProps {
  spørsmål: PeriodeSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Periode({ spørsmål, formScope }: Readonly<IProps>) {
  const field = useField(formScope);
  const [error, setError] = useState<string | undefined>(undefined);

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: field.value() ? new Date(field.value() as string) : undefined,
    fromDate: spørsmål.fraOgMed ? new Date(spørsmål.fraOgMed.toString()) : undefined,
    toDate: spørsmål.tilOgMed ? new Date(spørsmål.tilOgMed.toString()) : undefined,
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

  const periodeFraSpørsmal = spørsmål.type === "periodeFra";
  const periodeTilSpørsmal = spørsmål.type === "periodeTil";

  return (
    <VStack gap="4">
      {spørsmål.type === "periodeFra" && (
        <BodyShort weight="semibold">{spørsmål.periodeLabel}</BodyShort>
      )}
      {spørsmål.type === "periodeFra" && spørsmål.description && (
        <BodyShort>{spørsmål.description}</BodyShort>
      )}
      <VStack
        className={classNames(styles.periodeVenstreBorder, {
          [styles.periodeVenstreBorderfra]: periodeFraSpørsmal,
          [styles.periodeVenstreBordertil]: periodeTilSpørsmal,
        })}
      >
        <DatePicker {...datepickerProps}>
          <DatePicker.Input
            {...inputProps}
            key={spørsmål.id}
            placeholder="DD.MM.ÅÅÅÅ"
            error={error || field.error()}
            label={
              periodeTilSpørsmal && spørsmål.optional
                ? `${spørsmål.label} (valgfritt)`
                : spørsmål.label
            }
          />
        </DatePicker>
      </VStack>
    </VStack>
  );
}
