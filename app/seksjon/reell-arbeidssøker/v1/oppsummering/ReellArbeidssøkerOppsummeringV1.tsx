import { reellArbeidssøkerKomponenter } from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.komponenter";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";

export default function ReellArbeidssøkerOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const reellArbeidssøkerSvar = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Reell arbeidssøker</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!reellArbeidssøkerSvar.length && (
          <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>
        )}

        {reellArbeidssøkerKomponenter.map((spørsmål) => {
          const svar = reellArbeidssøkerSvar.find((svar) => svar[0] === spørsmål.id);
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
