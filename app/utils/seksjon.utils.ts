import {
  FlervalgSpørsmål,
  KomponentType,
  SpørsmålBase,
} from "~/components/spørsmål/spørsmål.types";
import { formaterDatoSvar } from "./formatering.utils";
import { FLERE_LAND, OFTE_VALGTE_LAND } from "./land.utils";

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
        (svar?.[1] !== undefined && (svar?.[1] !== "" && !(spørsmål as SpørsmålBase).optional)) ||
        (!!spørsmål.visHvis && spørsmål.visHvis(alleSvar)) ||
        (svar === undefined && !spørsmål.visHvis)
      ) {
        return {
          id: spørsmål?.id,
          type: spørsmål?.type,
          label: (spørsmål as SpørsmålBase).optional
            ? `${spørsmål.label} (valgfritt)`
            : `${spørsmål.label}`,
          description: spørsmål?.description,
          options: getOptions(spørsmål),
          svar: formaterDatoSvar(spørsmål, svar?.[1] as string),
        };
      }
    })
    .filter((item) => item !== undefined);
}

type Option = { value: string; label: string };

function getOptions(spørsmål: KomponentType): Option[] {
  if (spørsmål.type == "land") {
    return OFTE_VALGTE_LAND.concat(FLERE_LAND).map((land) => ({
      value: land.value,
      label: land.label,
    }));
  } else {
    return (spørsmål as any)?.options;
  }
}
