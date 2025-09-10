import { bostedslandSpørsmål, BostedslandSvar } from "~/seksjon/bostedsland/bostedsland.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import { findLandeNavn } from "~/constants";

export default function BostedslandOppsummering({ seksjonsData }: { seksjonsData: string }) {
  if (seksjonsData === "") {
    return <></>;
  }

  const bostedslandSvar: BostedslandSvar = JSON.parse(seksjonsData);
  const entries = Object.entries(bostedslandSvar);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Bostedsland</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!entries.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}

        {entries.map(([key, value]) => {
          const spørsmål = bostedslandSpørsmål.find((s) => s.id === key);
          if (spørsmål) {
            return (
              <FormSummary.Answer key={key}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                {spørsmål.type === "envalg" && (
                  <FormSummary.Value>
                    {spørsmål.options.find((s) => s.value === value)?.label}
                  </FormSummary.Value>
                )}
                {spørsmål.type === "land" && (
                  <FormSummary.Value>{findLandeNavn(value)}</FormSummary.Value>
                )}
              </FormSummary.Answer>
            );
          }
        })}
      </FormSummary.Answers>
    </FormSummary>
  );
}
