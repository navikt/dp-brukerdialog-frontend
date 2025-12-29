import { KomponentType } from "~/components/Komponent.types";
import { $RefinementCtx } from "zod/v4/core";

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

  if (!svar && !komponent.optional) {
    context.addIssue({
      path: [komponent.id],
      code: "custom",
      message: "Du må svare på dette spørsmålet",
    });
  }

  if (svar && komponent.type === "langTekst" && komponent.maxLength && svar.length > komponent.maxLength) {
    context.addIssue({
      path: [komponent.id],
      code: "custom",
      message: "Svaret er for langt",
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
        message: "Tallet kan ikke være negativt",
      });
    }
  }
}
