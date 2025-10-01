import { FormSummary } from "@navikt/ds-react";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";

export default function OppsummeringsSvar({
  spørsmål,
  svar,
}: {
  spørsmål: KomponentType;
  svar: string | string[];
}) {
  if (svar === "" || svar === undefined || !spørsmål) {
    return <FormSummary.Value>Ubesvart</FormSummary.Value>;
  }

  switch (spørsmål.type) {
    case "kortTekst":
      return <FormSummary.Value>{svar}</FormSummary.Value>;
    case "langTekst":
      return <FormSummary.Value>{svar}</FormSummary.Value>;
    case "envalg":
      return (
        <FormSummary.Value>
          {spørsmål.options.find((s) => s.value === svar)?.label}
        </FormSummary.Value>
      );
    case "flervalg":
      return (
        <FormSummary.Value>
          {(svar as string[])
            .map(
              (etSvar) => spørsmål.options.find((etSpørsmål) => etSpørsmål.value === etSvar)?.label
            )
            .join(", ")}
        </FormSummary.Value>
      );
    case "land":
      return <FormSummary.Value>{finnLandnavnMedLocale(svar as string)}</FormSummary.Value>;
    case "dato":
      return (
        <FormSummary.Value>dato {formaterNorskDato(new Date(svar as string))}</FormSummary.Value>
      );
    case "periodeFra":
      return <FormSummary.Value>{formaterNorskDato(new Date(svar as string))}</FormSummary.Value>;
    case "periodeTil":
      return <FormSummary.Value>{formaterNorskDato(new Date(svar as string))}</FormSummary.Value>;
    case "tall":
      return <FormSummary.Value>{svar}</FormSummary.Value>;
    default:
      return <>Ukjent spørsmålstype</>;
  }
}
