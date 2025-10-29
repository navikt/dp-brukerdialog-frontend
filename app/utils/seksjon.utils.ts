import { FlervalgSpørsmål, KomponentType } from "~/components/spørsmål/spørsmål.types";

export function finnOptionLabel(alleSpørsmål: KomponentType[], spørsmålId: string, svar: string) {
  return (
    (alleSpørsmål.find((spørsmål) => spørsmål.id === spørsmålId) as FlervalgSpørsmål)?.options.find(
      (s) => s.value === svar
    )?.label || "Ukjent spørsmål eller option"
  );
}

export function lagSeksjonPayload(alleSpørsmål: KomponentType[], alleSvar: any) {
  return alleSpørsmål
    .map((spørsmål) => {
      const svar = Object.entries(alleSvar).find(([key]) => {
        return key === spørsmål.id;
      });

      if (
        svar?.[1] !== undefined ||
        (!!spørsmål.visHvis && spørsmål.visHvis(alleSvar)) ||
        (svar === undefined && !spørsmål.visHvis)
      ) {
        return {
          id: spørsmål?.id,
          type: spørsmål?.type,
          label: spørsmål?.label,
          description: spørsmål?.description,
          options: (spørsmål as any)?.options,
          svar: svar?.[1],
        };
      }
    })
    .filter((item) => item !== undefined);
}
