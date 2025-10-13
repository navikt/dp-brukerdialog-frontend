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
      if (spørsmål.visHvis && !spørsmål.visHvis(values)) {
        // @ts-ignore
        form.setValue(spørsmål.id, undefined);
      }
    });
  }, [form.value(), form, spørsmål]);
}
