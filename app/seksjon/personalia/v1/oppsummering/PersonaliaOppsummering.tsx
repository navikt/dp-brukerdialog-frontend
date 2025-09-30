import { FormSummary } from "@navikt/ds-react";
import { SeksjonProps } from "~/utils/oppsummering.utils";

type PersonaliaType = {
  navn: string;
  personnummer: string;
  folkeregistrertAdresse: string;
  folkeregistrertPostnummer: string;
  folkeregistrertPoststed: string;
};

export default function PersonaliaOppsummering({ seksjonSvarene, seksjonsUrl }: SeksjonProps) {
  const personalia: PersonaliaType = JSON.parse(seksjonSvarene);
  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>Navn</FormSummary.Label>
          <FormSummary.Value>{personalia.navn}</FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>Personnummer</FormSummary.Label>
          <FormSummary.Value>{personalia.personnummer}</FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>Folkeregistrert adresse</FormSummary.Label>
          <FormSummary.Value>
            {personalia.folkeregistrertAdresse} <br />
            {personalia.folkeregistrertPostnummer} {personalia.folkeregistrertPoststed}
          </FormSummary.Value>
        </FormSummary.Answer>
      </FormSummary.Answers>
      <FormSummary.Footer>
        <FormSummary.EditLink href={seksjonsUrl} />
      </FormSummary.Footer>
    </FormSummary>
  );
}
