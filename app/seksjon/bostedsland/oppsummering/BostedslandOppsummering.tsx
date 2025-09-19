import { bostedslandSpørsmål, BostedslandSvar } from "~/seksjon/bostedsland/bostedsland.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";

export default function BostedslandOppsummering({ seksjonsData, seksjonsUrl }: SeksjonProps) {
  if (seksjonsData === "") {
    return <></>;
  }

  const bostedslandSvar: BostedslandSvar = JSON.parse(seksjonsData);
  const entries = Object.entries(bostedslandSvar);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Bostedsland</FormSummary.Heading>
        <FormSummary.EditLink href={seksjonsUrl} />
      </FormSummary.Header>
      <FormSummary.Answers>
        {!entries.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}

        {entries.map(([key, value]) => {
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
    </FormSummary>
  );
}
