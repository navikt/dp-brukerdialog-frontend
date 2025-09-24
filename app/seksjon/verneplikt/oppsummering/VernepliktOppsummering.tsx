import { vernepliktSpørsmål, VernepliktSvar } from "~/seksjon/verneplikt/verneplikt.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { OppsummeringProps } from "~/seksjon/oppsummering/OppsummeringView";

export function VernepliktOppsummering({ seksjonsData, seksjonsUrl }: OppsummeringProps) {
  if (!seksjonsData) return <></>;

  const vernepliktData: VernepliktSvar = JSON.parse(seksjonsData);
  if (vernepliktData["avtjent-verneplikt"] === undefined) return;

  const spørsmål = vernepliktSpørsmål.find((s) => (s.id = "avtjent-verneplikt"));
  if (!spørsmål) return;

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Verneplikt</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
          <OppsummeringsSvar spørsmål={spørsmål} svar={vernepliktData["avtjent-verneplikt"]} />
        </FormSummary.Answer>
      </FormSummary.Answers>
      <FormSummary.Footer>
        <FormSummary.EditLink href={seksjonsUrl} />
      </FormSummary.Footer>
    </FormSummary>
  );
}
