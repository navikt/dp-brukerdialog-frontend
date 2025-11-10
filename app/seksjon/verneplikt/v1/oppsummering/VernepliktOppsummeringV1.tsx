import { vernepliktKomponenter } from "~/seksjon/verneplikt/v1/verneplikt.komponenter";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";

import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";

export default function VernepliktOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const vernepliktSvar = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Verneplikt</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!vernepliktSvar.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}
        {vernepliktKomponenter.map((spørsmål) => {
          const svar = vernepliktSvar.find((svar) => svar[0] === spørsmål.id);
          if (svar && !erInformasjonsFelt(spørsmål)) {
            return (
              <FormSummary.Answer key={spørsmål.id}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                <OppsummeringsSvar spørsmål={spørsmål} svar={svar[1]} />
              </FormSummary.Answer>
            );
          }
        })}
      </FormSummary.Answers>
      <FormSummaryFooter seksjonsUrl={seksjonsUrl} redigerbar={redigerbar} />
    </FormSummary>
  );
}
