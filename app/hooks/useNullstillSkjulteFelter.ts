import { FormApi } from "@rvf/react-router";
import { useEffect } from "react";
import { KomponentType } from "~/components/Komponent.types";

// Hook for å nullstille skjulte felter
// Sette verdiene til undefined for skjulte felter
export function useNullstillSkjulteFelter<T extends Record<string, any>>(
  form: FormApi<T>,
  komponenter: KomponentType[]
) {
  const formValues = form.transient.value();

  useEffect(() => {
    komponenter.forEach((komponent) => {
      const erInformasjonKomponent =
        komponent.type === "lesMer" ||
        komponent.type === "varselmelding" ||
        komponent.type === "dokumentasjonskravindikator" ||
        komponent.type === "registeropplysning" ||
        komponent.type === "forklarendeTekst";

      if (!erInformasjonKomponent && komponent.visHvis && !komponent.visHvis(formValues)) {
        //@ts-ignore
        form.setValue(komponent.id, undefined);
      }
    });
  }, [formValues]);
}
