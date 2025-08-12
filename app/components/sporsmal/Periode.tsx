import { BodyShort, DatePicker, useDatepicker, VStack } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import { formatISO } from "date-fns";
import { PeriodeSporsmal } from "./sporsmal.types";

interface IProps {
  sporsmal: PeriodeSporsmal;
  formScope: FormScope<string | undefined>;
}

export function Periode({ sporsmal, formScope }: IProps) {
  const field = useField(formScope);

  const { datepickerProps: fraDatepickerProps, inputProps: fraInputProps } = useDatepicker({
    fromDate: sporsmal.fra?.fom || undefined,
    toDate: sporsmal.fra?.tom || undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : "");
      field.validate();
    },
  });

  const { datepickerProps: tilDatepickerProps, inputProps: tilInputProps } = useDatepicker({
    fromDate: sporsmal.til?.fom || undefined,
    toDate: sporsmal.til?.tom || undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : "");
      field.validate();
    },
  });

  return (
    <VStack gap="4">
      <BodyShort weight="semibold">{sporsmal.label}</BodyShort>
      <VStack gap="4" className="left-border">
        <DatePicker {...fraDatepickerProps}>
          <DatePicker.Input
            {...fraInputProps}
            placeholder="DD.MM.ÅÅÅÅ"
            error={field.error()}
            label="Fra dato"
          />
        </DatePicker>
        <DatePicker {...tilDatepickerProps}>
          <DatePicker.Input
            {...tilInputProps}
            placeholder="DD.MM.ÅÅÅÅ"
            error={field.error()}
            label={`Til dato ${sporsmal.til?.optional ? "(valgfri)" : ""}`}
          />
        </DatePicker>
      </VStack>
    </VStack>
  );
}
