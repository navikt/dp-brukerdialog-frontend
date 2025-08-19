import { BodyShort, DatePicker, useDatepicker, VStack } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import classNames from "classnames";
import { formatISO } from "date-fns";
import { PeriodeSpørsmål } from "./sporsmal.types";

import styles from "./sporsmal.module.css";

interface IProps {
  sporsmal: PeriodeSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Periode({ sporsmal, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: field.value() ? new Date(field.value() as string) : undefined,
    fromDate: sporsmal.fraOgMed ? new Date(sporsmal.fraOgMed.toString()) : undefined,
    toDate: sporsmal.tilOgMed ? new Date(sporsmal.tilOgMed.toString()) : undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : "");
      field.validate();
    },
  });

  const periodeFraSpørsmal = sporsmal.type === "periodeFra";
  const periodeTilSpørsmal = sporsmal.type === "periodeTil";

  return (
    <VStack gap="4">
      {sporsmal.type === "periodeFra" && (
        <BodyShort weight="semibold">{sporsmal.periodeLabel}</BodyShort>
      )}
      {sporsmal.type === "periodeFra" && sporsmal.description && (
        <BodyShort>{sporsmal.description}</BodyShort>
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
            key={sporsmal.id}
            placeholder="DD.MM.ÅÅÅÅ"
            error={field.error()}
            label={
              periodeTilSpørsmal && sporsmal.optional
                ? `${sporsmal.label} (valgfritt)`
                : sporsmal.label
            }
          />
        </DatePicker>
      </VStack>
    </VStack>
  );
}
