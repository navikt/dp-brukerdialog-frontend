import {
  tilleggsopplysningerSpørsmål,
  TilleggsopplysningerSvar,
} from "~/seksjon/tilleggsopplysninger/tilleggsopplysninger.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";

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
          const entry = tilleggOpplysningerEntries.find((entry) => entry[0] === spørsmål.id);
          if (entry) {
            const svar = entry[1];
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
