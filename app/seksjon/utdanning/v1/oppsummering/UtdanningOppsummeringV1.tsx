import { utdanningKomponenter } from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";

export default function UtdanningOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const utdanningSvar = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Utdanning</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!utdanningSvar.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}
        {utdanningKomponenter.map((spørsmål) => {
          const svar = utdanningSvar.find((svar) => svar[0] === spørsmål.id);
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
