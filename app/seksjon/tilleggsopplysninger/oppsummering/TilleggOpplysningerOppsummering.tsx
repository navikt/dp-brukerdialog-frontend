import {
  tilleggsopplysningerSpørsmål,
  TilleggsopplysningerSvar,
} from "~/seksjon/tilleggsopplysninger/tilleggsopplysninger.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import {
  SeksjonProps,
  skalSkjuleSpørsmålBasertPåType,
} from "~/seksjon/oppsummering/OppsummeringUtils";

export default function TilleggOpplysningerOppsummering({
  seksjonsData,
  seksjonsUrl,
}: SeksjonProps) {
  if (!seksjonsData) return <></>;

  const tilleggOpplysningerData: TilleggsopplysningerSvar = JSON.parse(seksjonsData);
  const tilleggOpplysningerEntries = Object.entries(tilleggOpplysningerData);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Tilleggsopplysninger</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {tilleggsopplysningerSpørsmål.map((spørsmål) => {
          if (skalSkjuleSpørsmålBasertPåType(spørsmål)) return <></>;
          const finnSvaret = tilleggOpplysningerEntries.find((entry) => entry[0] === spørsmål.id);
          if (finnSvaret) {
            const svar = finnSvaret[1];
            return (
              <FormSummary.Answer key={spørsmål.id}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                <OppsummeringsSvar spørsmål={spørsmål} svar={svar} />
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
