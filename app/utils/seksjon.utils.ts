import { FlervalgSpørsmål, KomponentType, SpørsmålBase } from "~/components/Komponent.types";
import { formaterDatoSvar } from "./formatering.utils";
import { EØS_LAND, FLERE_LAND, OFTE_VALGTE_LAND } from "./land.utils";

export function finnOptionLabel(alleSpørsmål: KomponentType[], spørsmålId: string, svar: string) {
  return (
    (alleSpørsmål.find((spørsmål) => spørsmål.id === spørsmålId) as FlervalgSpørsmål)?.options.find(
      (s) => s.value === svar
    )?.label || "Ukjent spørsmål eller option"
  );
}

export function lagSeksjonPayload(alleSpørsmål: KomponentType[], alleSvar: any): KomponentType[] {
  const svar = alleSvar ?? {};

  return alleSpørsmål
    .map((spørsmål) => {
      const entry = Object.entries(svar).find(([key]) => {
        return key === spørsmål.id;
      });

      if (
        (entry?.[1] !== undefined && entry?.[1] !== "" && !(spørsmål as SpørsmålBase).optional) ||
        (!!spørsmål.visHvis && spørsmål.visHvis(alleSvar)) ||
        (entry === undefined && !spørsmål.visHvis)
      ) {
        return {
          id: spørsmål?.id,
          type: spørsmål?.type,
          label: getLabel(spørsmål),
          description: spørsmål?.description,
          options: getOptions(spørsmål),
          svar: formaterDatoSvar(spørsmål, entry?.[1] as string),
        } as KomponentType;
      }
    })
    .filter((item) => item !== undefined);
}

type Option = { value: string; label: string };

function getLabel(spørsmål: KomponentType): string | undefined {
  return spørsmål?.label && (spørsmål as SpørsmålBase).optional
    ? `${spørsmål.label} (valgfritt)`
    : spørsmål.label;
}

function getOptions(spørsmål: KomponentType): Option[] {
  if (spørsmål.type === "land") {
    if (spørsmål.erEøsLand) {
      return EØS_LAND.map((land) => ({
        value: land.value,
        label: land.label,
      }));
    } else {
      return OFTE_VALGTE_LAND.concat(FLERE_LAND).map((land) => ({
        value: land.value,
        label: land.label,
      }));
    }
  } else {
    return (spørsmål as any)?.options;
  }
}
