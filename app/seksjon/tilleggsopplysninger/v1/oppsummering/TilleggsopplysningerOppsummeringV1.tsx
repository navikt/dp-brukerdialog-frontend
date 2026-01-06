import { tilleggsopplysningerKomponenter } from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.komponenter";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";

export default function TilleggsopplysningerOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const tilleggsopplysningerSvar = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Tilleggsopplysninger</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!tilleggsopplysningerSvar.length && (
          <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>
        )}
        {tilleggsopplysningerKomponenter.map((spørsmål) => {
          const svar = tilleggsopplysningerSvar.find((svar) => svar[0] === spørsmål.id);
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
      <FormSummaryFooter seksjonsUrl={seksjonsUrl} redigerbar={redigerbar} seksjonnavn="Tilleggsopplysninger"/>
    </FormSummary>
  );
}
