import { FormApi } from "@rvf/react-router";
import { $RefinementCtx } from "zod/v4/core";
import { KomponentType } from "~/components/Komponent.types";

export function valider(
  komponent: KomponentType,
  svar: string | string[] | undefined,
  synlig: boolean,
  context: $RefinementCtx<any>
) {
  const erInformasjonKomponent =
    komponent.type === "lesMer" ||
    komponent.type === "informasjonskort" ||
    komponent.type === "dokumentasjonskravindikator" ||
    komponent.type === "registeropplysning" ||
    komponent.type === "forklarendeTekst";

  if (erInformasjonKomponent || !synlig) {
    return;
  }

  if ((!svar || svar.length === 0) && !komponent.optional) {
    context.addIssue({
      path: [komponent.id],
      code: "custom",
      message: "Du må svare på dette spørsmålet",
    });
  }

  if (
    svar &&
    (komponent.type === "langTekst" || komponent.type === "kortTekst") &&
    komponent.maksLengde &&
    svar.length > komponent.maksLengde
  ) {
    context.addIssue({
      path: [komponent.id],
      code: "custom",
      message: `Svaret kan ikke være lengre enn ${komponent.maksLengde} tegn`,
    });
  }

  if (svar && komponent.type === "tall") {
    if (Number.isNaN(+(svar as string).replace(",", "."))) {
      context.addIssue({
        path: [komponent.id],
        code: "custom",
        message: "Svaret må være et tall",
      });
    }

    if ((svar as string).startsWith("-")) {
      context.addIssue({
        path: [komponent.id],
        code: "custom",
        message: "Svaret kan ikke være et negativt tall",
      });
    }

    if (
      komponent.maksVerdi &&
      ((svar as string).replace(",", ".") as unknown as number) > komponent.maksVerdi
    ) {
      context.addIssue({
        path: [komponent.id],
        code: "custom",
        message: `Svaret kan ikke være høyere enn ${komponent.maksVerdi}`,
      });
    }
  }
}

export function validerOgSettFørsteUgyldigSpørsmålIdTilFokus<T>(
  form: FormApi<T>,
  økeSubmitTeller: () => void,
  setKomponentIdTilFokus: (id: string | undefined) => void
) {
  form.validate().then((valideringResultat) => {
    const harEnFeil = Object.values(valideringResultat).length > 0;

    if (harEnFeil) {
      const førsteUgyldigeSpørsmålId = Object.keys(valideringResultat).find(
        (key) => valideringResultat[key] !== undefined
      );

      økeSubmitTeller();
      setKomponentIdTilFokus(førsteUgyldigeSpørsmålId);
    }
  });
}
