import { vernepliktSpørsmål, VernepliktSvar } from "~/seksjon/verneplikt/v1/verneplikt.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { SeksjonProps } from "~/utils/oppsummering.utils";

export default function VernepliktOppsummeringV1({ seksjonSvarene, seksjonsUrl }: SeksjonProps) {
  if (!seksjonSvarene) return <></>;

  const vernepliktData: VernepliktSvar = seksjonSvarene as VernepliktSvar;
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
