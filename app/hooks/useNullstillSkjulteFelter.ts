import { FormApi } from "@rvf/react-router";
import { useEffect } from "react";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";

// Hook for å nullstille skjulte felter
// Sette verdiene til undefined for skjulte felter
export function useNullstillSkjulteFelter<T extends Record<string, any>>(
  form: FormApi<T>,
  spørsmål: KomponentType[]
) {
  const formValues = form.value();

  useEffect(() => {
    spørsmål.forEach((spørsmål) => {
      if (spørsmål.visHvis && !spørsmål.visHvis(formValues)) {
        //@ts-ignore
        form.setValue(spørsmål.id, undefined);
      }
    });
  }, [formValues]);
}
