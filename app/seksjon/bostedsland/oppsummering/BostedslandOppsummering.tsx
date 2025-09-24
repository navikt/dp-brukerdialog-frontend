import { bostedslandSpørsmål, BostedslandSvar } from "~/seksjon/bostedsland/bostedsland.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { OppsummeringProps } from "~/seksjon/oppsummering/OppsummeringView";

export function BostedslandOppsummering({ seksjonsData, seksjonsUrl }: OppsummeringProps) {
  if (!seksjonsData) return null;

  const bostedslandSvar: BostedslandSvar = JSON.parse(seksjonsData);
  const seksjonSvar = Object.entries(bostedslandSvar);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Bostedsland</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!seksjonSvar.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}

        {seksjonSvar.map(([key, value]) => {
          const spørsmål = bostedslandSpørsmål.find((s) => s.id === key);
          if (spørsmål) {
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
