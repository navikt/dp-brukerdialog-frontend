import { DownloadIcon } from "@navikt/aksel-icons";
import { Button, FormSummary } from "@navikt/ds-react";
import dokumentasjonskravKomponenter, {
  velgHvaDuVilGjøre,
} from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";
import { lastnedDokument } from "~/utils/dokument.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";

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
              {dokumentasjonskrav.bundle && (
                <Button
                  variant="tertiary"
                  className="mt-4"
                  size="small"
                  icon={<DownloadIcon />}
                  onClick={() =>
                    lastnedDokument(dokumentasjonskrav.bundle?.filsti, dokumentasjonskrav.tittel)
                  }
                >
                  Last ned opplastet dokument
                </Button>
              )}
            </FormSummary.Answer>
          );
        })}
      </FormSummary.Answers>
      <FormSummaryFooter seksjonsUrl={`/${søknadId}/dokumentasjon`} redigerbar={true} seksjonnavn="Dokumentasjon"/>
    </FormSummary>
  );
}
