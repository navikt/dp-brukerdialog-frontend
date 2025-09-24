import { FormSummary } from "@navikt/ds-react";
import {
  dinSituasjonSpørsmål,
  DinSituasjonSvar,
} from "~/seksjon/din-situasjon/din-situasjon.spørsmål";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { erInformasjonsFelt, SeksjonProps } from "~/utils/oppsummering.utils";

export default function DinSituasjonOppsummering({ seksjonsData, seksjonsUrl }: SeksjonProps) {
  if (!seksjonsData) return <></>;

  const dinSituasjonData: DinSituasjonSvar = JSON.parse(seksjonsData);
  const dinSituasjonEntries = Object.entries(dinSituasjonData);

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
