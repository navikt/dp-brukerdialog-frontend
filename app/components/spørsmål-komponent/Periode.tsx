import { BodyShort, DatePicker, useDatepicker, VStack } from "@navikt/ds-react";
import { FormScope, useField } from "@rvf/react-router";
import classNames from "classnames";
import { formatISO } from "date-fns";
import { useState } from "react";
import { PeriodeSpørsmål } from "../Komponent.types";

import styles from "./Periode.module.css";
import { formaterNorskDatoMedTall } from "~/utils/formatering.utils";

interface IProps {
  props: PeriodeSpørsmål;
  formScope: FormScope<string | Array<string> | undefined>;
  formValues?: Record<string, any>;
}

export function Periode({ props, formScope, formValues }: IProps) {
  const field = useField(formScope);
  const [error, setError] = useState<string | undefined>(undefined);
  const { referanseId, type } = props;

  const referanseVerdi = referanseId && formValues ? formValues[referanseId] : undefined;
  const referanseDato = referanseVerdi ? new Date(referanseVerdi) : undefined;

  const fraOgMed = type === "periodeTil" && referanseDato ? referanseDato : props.fraOgMed;
  const tilOgMed = type === "periodeFra" && referanseDato ? referanseDato : props.tilOgMed;

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: field.value() ? new Date(field.value() as string) : undefined,
    fromDate: fraOgMed ? new Date(fraOgMed.toString()) : undefined,
    toDate: tilOgMed ? new Date(tilOgMed.toString()) : undefined,
    onDateChange: (date) => {
      field.setValue(date ? formatISO(date, { representation: "date" }) : undefined);
    },
    onValidate(val) {
      if (!val.isEmpty && val.isInvalid) {
        setError("Ugyldig dato");
      } else if (!val.isEmpty && val.isAfter) {
        setError(`Valgt dato er etter siste gyldige dato (${formaterNorskDatoMedTall(tilOgMed!)})`);
      } else if (!val.isEmpty && val.isBefore) {
        setError(`Valgt dato er før første gyldige dato (${formaterNorskDatoMedTall(fraOgMed!)})`);
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
        <DatePicker {...datepickerProps} dropdownCaption={true}>
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
