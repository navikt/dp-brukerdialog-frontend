import { FormSummary } from "@navikt/ds-react";
import { dinSituasjonSpørsmål } from "~/seksjon/din-situasjon/din-situasjon.spørsmål";

type DinSituasjonOppsummeringProps = {
  seksjonsData: string;
};
type DinSituasjonType = {
  harDuMottattDagpengerFraNavILøpetAvDeSiste52Ukene: string;
  årsakTilAtDagpengeneBleStanset?: string;
  hvilkenDatoSøkerDuDagpengerFra?: string;
};
export default function DinSituasjonOppsummering({ seksjonsData }: DinSituasjonOppsummeringProps) {
  if (seksjonsData === "") return;

  const dinSituasjonData: DinSituasjonType = JSON.parse(seksjonsData);
  const dataKeys = Object.keys(dinSituasjonData);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Din Situasjon</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!dataKeys.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}

        {Object.keys(dinSituasjonData).map((key) => {
          const spørsmål = dinSituasjonSpørsmål.find((s) => s.id === key);
          if (spørsmål) {
            return (
              <FormSummary.Answer key={key}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                {spørsmål.type === "envalg" && (
                  <FormSummary.Value>
                    {
                      spørsmål.options.find(
                        (s) => s.value === dinSituasjonData[spørsmål.id as keyof DinSituasjonType]
                      )?.label
                    }
                  </FormSummary.Value>
                )}
                {spørsmål.type !== "envalg" && (
                  <FormSummary.Value>
                    {dinSituasjonData[spørsmål.id as keyof DinSituasjonType]}
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
