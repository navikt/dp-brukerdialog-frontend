import {
  tilleggsopplysningerSpørsmål,
  TilleggsopplysningerSvar,
} from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { SeksjonProps, erInformasjonsFelt } from "~/utils/oppsummering.utils";

export default function TilleggOpplysningerOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
}: SeksjonProps) {
  if (!seksjonSvarene) return <></>;

  const tilleggOpplysningerData: TilleggsopplysningerSvar =
    seksjonSvarene as TilleggsopplysningerSvar;
  const tilleggOpplysningerEntries = Object.entries(tilleggOpplysningerData);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Tilleggsopplysninger</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {tilleggsopplysningerSpørsmål.map((spørsmål) => {
          if (erInformasjonsFelt(spørsmål)) return null;
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
