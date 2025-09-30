import { bostedslandSpørsmål } from "~/seksjon/bostedsland/v1/bostedsland.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";

export default function BostedslandOppsummeringV1({ seksjonSvarene, seksjonsUrl }: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const seksjonSvar = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Bostedsland</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!seksjonSvar.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}

        {seksjonSvar.map(([key, value]) => {
          const spørsmål = bostedslandSpørsmål.find((s) => s.id === key);
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
