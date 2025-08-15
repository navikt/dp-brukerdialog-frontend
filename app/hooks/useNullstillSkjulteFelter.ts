import { FormApi } from "@rvf/react-router";
import { useEffect } from "react";
import { Sporsmal } from "~/components/sporsmal/sporsmal.types";

// Hook for å nullstille skjulte felter
// Sette verdiene til undefined for skjulte felter
export function useNullstillSkjulteFelter<T extends Record<string, any>>(
  form: FormApi<T>,
  sporsmal: Sporsmal[]
) {
  useEffect(() => {
    const values = form.value();

    sporsmal.forEach((sporsmal) => {
      const sporsmalId = sporsmal.id as keyof T;
      if (sporsmal.visHvis && !sporsmal.visHvis(values) && values[sporsmalId] !== undefined) {
        form.setValue(sporsmalId as any, undefined as any);
      }
    });
  }, [form.value(), form, sporsmal]);
}
