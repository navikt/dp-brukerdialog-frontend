import { FormSummary } from "@navikt/ds-react";
import { dinSituasjonSpørsmål } from "~/seksjon/din-situasjon/v1/din-situasjon.spørsmål";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";

export default function DinSituasjonOppsummeringV1({ seksjonSvarene, seksjonsUrl }: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const dinSituasjonEntries = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Din Situasjon</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!dinSituasjonEntries.length && (
          <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>
        )}

        {dinSituasjonEntries.map(([key, value]) => {
          const spørsmål = dinSituasjonSpørsmål.find((s) => s.id === key);

          if (spørsmål && !erInformasjonsFelt(spørsmål)) {
            return (
              <FormSummary.Answer key={key}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                <OppsummeringsSvar spørsmål={spørsmål} svar={value} />
              </FormSummary.Answer>
            );
          }
        })}
      </FormSummary.Answers>
      <FormSummary.Footer>
        <FormSummary.EditLink href={seksjonsUrl} />
      </FormSummary.Footer>
    </FormSummary>
  );
}
