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
    const opprinneligeVerdier = form.value();
    const oppdaterteVerdier = { ...opprinneligeVerdier };

    spørsmål.forEach((spørsmål) => {
      const spørsmålId = spørsmål.id as keyof T;
      if (
        spørsmål.visHvis &&
        !spørsmål.visHvis(opprinneligeVerdier) &&
        opprinneligeVerdier[spørsmålId] !== undefined
      ) {
        oppdaterteVerdier[spørsmålId] = undefined as any;
      }
    });

    if (JSON.stringify(oppdaterteVerdier) !== JSON.stringify(opprinneligeVerdier)) {
      form.resetForm(oppdaterteVerdier as any);
    }
  }, [form.value(), form, spørsmål]);
}
