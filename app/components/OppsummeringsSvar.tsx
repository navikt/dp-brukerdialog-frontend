import { FormSummary } from "@navikt/ds-react";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";

interface IProps {
  spørsmål: KomponentType;
  svar?: string;
}

export default function OppsummeringsSvar({ spørsmål, svar }: IProps) {
  if (!svar) {
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
      return <FormSummary.Value>{finnLandnavnMedLocale(svar)}</FormSummary.Value>;
    case "dato":
    case "periodeFra":
    case "periodeTil":
      return <FormSummary.Value>{formaterNorskDato(new Date(svar))}</FormSummary.Value>;
    default:
      return <>Ukjent spørsmålstype</>;
  }
}
