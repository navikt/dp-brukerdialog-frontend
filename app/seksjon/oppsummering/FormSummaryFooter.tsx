import { FormSummary } from "@navikt/ds-react";

export default function FormSummaryFooter({
  seksjonsUrl,
  redigerbar,
}: {
  seksjonsUrl: string;
  redigerbar: boolean;
}) {
  if (!redigerbar) return null;
  return (
    <FormSummary.Footer>
      <FormSummary.EditLink href={seksjonsUrl} />
    </FormSummary.Footer>
  );
}
