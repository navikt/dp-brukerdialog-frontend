import { utdanningSpørsmål, UtdanningSvar } from "~/seksjon/utdanning/utdanning.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";

export default function UtdanningOppsummering({ seksjonsData }: { seksjonsData: string }) {
  if (seksjonsData === "") return;

  const utdanningData: UtdanningSvar = JSON.parse(seksjonsData);
  const utdanningEntries = Object.entries(utdanningData);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Utdanning</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!utdanningEntries.length && (
          <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>
        )}
        {utdanningSpørsmål.map((spørsmål) => {
          const svaret = utdanningEntries.find((s) => s[0] === spørsmål.id);
          if (svaret) {
            return (
              <FormSummary.Answer key={spørsmål.id}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                <OppsummeringsSvar spørsmål={spørsmål} svar={svaret[1]} />
              </FormSummary.Answer>
            );
          }
        })}
      </FormSummary.Answers>
    </FormSummary>
  );
}
