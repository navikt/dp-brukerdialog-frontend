import { FormApi } from "@rvf/react-router";
import { useEffect } from "react";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";

// Hook for å nullstille skjulte felter
// Sette verdiene til undefined for skjulte felter
export function useNullstillSkjulteFelter<T extends Record<string, any>>(
  form: FormApi<T>,
  spørsmål: KomponentType[]
) {
  useEffect(() => {
    const values = form.value();

    spørsmål.forEach((spørsmål) => {
      const spørsmålId = spørsmål.id as keyof T;
      if (spørsmål.visHvis && !spørsmål.visHvis(values) && values[spørsmålId] !== undefined) {
        form.setValue(spørsmålId as any, undefined as any);
      }
    });
  }, [form.value(), form, spørsmål]);
}
