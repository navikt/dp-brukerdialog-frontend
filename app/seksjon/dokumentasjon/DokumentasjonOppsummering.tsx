import { FormSummary } from "@navikt/ds-react";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";
import { finnOptionLabel } from "~/utils/seksjon.utils";
import {
  dokumentasjonskravKomponenter,
  velgHvaDuVilGjøre,
} from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

interface IProps {
  søknadId: string | undefined;
  dokumentasjonskrav: string[];
}

export default function DokumentasjonOppsummering({
  søknadId,
  dokumentasjonskrav,
}: Readonly<IProps>) {
  if (!dokumentasjonskrav || !søknadId) return null;

  const alleDokumentasjonskrav = dokumentasjonskrav.flatMap((alleDokumentasjonskravForSeksjon) => {
    return JSON.parse(alleDokumentasjonskravForSeksjon) as Dokumentasjonskrav;
  });

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Dokumentasjon</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {alleDokumentasjonskrav.map((dokumentasjonskrav) => {
          return (
            <FormSummary.Answer key={dokumentasjonskrav.id}>
              <FormSummary.Label>{dokumentasjonskrav.tittel}</FormSummary.Label>
              <FormSummary.Value>
                {(dokumentasjonskrav.svar &&
                  finnOptionLabel(
                    dokumentasjonskravKomponenter,
                    velgHvaDuVilGjøre,
                    dokumentasjonskrav.svar
                  )) + ":"}
              </FormSummary.Value>
              {dokumentasjonskrav.begrunnelse && (
                <FormSummary.Value>{dokumentasjonskrav.begrunnelse}</FormSummary.Value>
              )}
              {dokumentasjonskrav.bundle &&
                "Se opplastet dokument << TODO dette skal være en link så bruker får lastet ned dokumentet"}
            </FormSummary.Answer>
          );
        })}
      </FormSummary.Answers>
      <FormSummaryFooter seksjonsUrl={`/${søknadId}/dokumentasjon`} redigerbar={true} />
    </FormSummary>
  );
}
