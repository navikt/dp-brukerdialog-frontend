import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { formatISO } from "date-fns";
import { DatoSporsmal } from "./sporsmal.types";
import { FormScope, useField } from "@rvf/react-router";
import GrunnenTilAtViSpør from "~/components/sporsmal/GrunnenTilAtViSpør";

interface IProps {
  sporsmal: DatoSporsmal;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Dato({ sporsmal, formScope }: Readonly<IProps>) {
  const field = useField(formScope);

  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: sporsmal.fom || undefined,
    toDate: sporsmal.tom || undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : "");
      field.validate();
    },
  });

  return (
    <>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          {...inputProps}
          key={sporsmal.id}
          placeholder="DD.MM.ÅÅÅÅ"
          error={field.error()}
          label={sporsmal.label}
          description={sporsmal.description}
        />
      </DatePicker>
      <GrunnenTilAtViSpør spørsmål={sporsmal} />
    </>
  );
}
