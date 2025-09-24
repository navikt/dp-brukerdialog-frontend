import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import { FormSummary } from "@navikt/ds-react";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { finnLandnavn } from "~/utils/land.utils";

export default function OppsummeringsSvar({
  spørsmål,
  svar,
}: {
  spørsmål: KomponentType;
  svar: string;
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
    case "land":
      return <FormSummary.Value>{finnLandnavn(svar)}</FormSummary.Value>;
    case "dato":
    case "periodeFra":
    case "periodeTil":
      return <FormSummary.Value>{formaterNorskDato(new Date(svar))}</FormSummary.Value>;
    default:
      return <>Ukjent spørsmålstype</>;
  }
}
