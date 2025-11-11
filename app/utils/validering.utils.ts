import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import { $RefinementCtx } from "zod/v4/core";

export function valider(
  spørsmål: KomponentType,
  svar: string | string[] | undefined,
  synlig: boolean,
  context: $RefinementCtx<any>
) {
  const erInformasjonKomponent =
    spørsmål.type === "lesMer" ||
    spørsmål.type === "varselmelding" ||
    spørsmål.type === "dokumentasjonskravindikator" ||
    spørsmål.type === "registeropplysning" ||
    spørsmål.type === "forklarendeTekst";

  if (erInformasjonKomponent) {
    return;
  }

  if (synlig && !svar && !erInformasjonKomponent && !spørsmål.optional) {
    context.addIssue({
      path: [spørsmål.id],
      code: "custom",
      message: "Du må svare på dette spørsmålet",
    });
  }

  if (svar && spørsmål.type === "tall") {
    if (Number.isNaN(+(svar as string).replace(",", "."))) {
      context.addIssue({
        path: [spørsmål.id],
        code: "custom",
        message: "Svaret må være et tall",
      });
    }

    if ((svar as string).startsWith("-")) {
      context.addIssue({
        path: [spørsmål.id],
        code: "custom",
        message: "Tallet kan ikke være negativt",
      });
    }
  }
}
