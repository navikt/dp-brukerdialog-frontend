import { FormSummary } from "@navikt/ds-react";
import {
  dinSituasjonSpørsmål,
  DinSituasjonSvar,
} from "~/seksjon/din-situasjon/din-situasjon.spørsmål";

type DinSituasjonOppsummeringProps = {
  seksjonsData: string;
};
export default function DinSituasjonOppsummering({ seksjonsData }: DinSituasjonOppsummeringProps) {
  if (seksjonsData === "") return;

  const dinSituasjonData: DinSituasjonSvar = JSON.parse(seksjonsData);
  const dinSituasjonKeys = Object.keys(dinSituasjonData);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Din Situasjon</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!dinSituasjonKeys.length && (
          <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>
        )}

        {dinSituasjonKeys.map((key) => {
          const spørsmål = dinSituasjonSpørsmål.find((s) => s.id === key);
          if (spørsmål) {
            return (
              <FormSummary.Answer key={key}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                {spørsmål.type === "envalg" && (
                  <FormSummary.Value>
                    {
                      spørsmål.options.find(
                        (s) => s.value === dinSituasjonData[spørsmål.id as keyof DinSituasjonSvar]
                      )?.label
                    }
                  </FormSummary.Value>
                )}
                {spørsmål.type !== "envalg" && (
                  <FormSummary.Value>
                    {dinSituasjonData[spørsmål.id as keyof DinSituasjonSvar]}
                  </FormSummary.Value>
                )}{" "}
              </FormSummary.Answer>
            );
          }
        })}
      </FormSummary.Answers>
    </FormSummary>
  );
}
