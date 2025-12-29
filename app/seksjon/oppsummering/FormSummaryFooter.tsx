import { FormSummary } from "@navikt/ds-react";

export default function FormSummaryFooter({
  seksjonnavn,
  seksjonsUrl,
  redigerbar,
}: {
  seksjonnavn: string;
  seksjonsUrl: string;
  redigerbar: boolean;
}) {
  if (!redigerbar) return null;
  return (
    <FormSummary.Footer>
      <FormSummary.EditLink href={seksjonsUrl} aria-label={`Endre dine svar om ${seksjonnavn}`} />
    </FormSummary.Footer>
  );
}
