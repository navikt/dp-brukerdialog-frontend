import { DownloadIcon } from "@navikt/aksel-icons";
import { Button, FormSummary } from "@navikt/ds-react";
import {
  dokumentasjonskravKomponenter,
  velgHvaDuVilGjøre,
} from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";
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

  async function lastnedDokument(filsti?: string, dokumentTittel?: string) {
    if (!filsti) {
      console.log("Mangler filsti tilgjengelig for nedlasting");
      return;
    }

    if (!dokumentTittel) {
      console.log("Mangler dokumenttittel tilgjengelig for nedlasting");
      return;
    }

    const url = "/api/dokumentasjonskrav/lastned";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filsti }),
    });

    if (!response.ok) {
      throw new Response(`Klarte ikke laste ned bundlet dokument ${url}`, {
        status: response.status,
        statusText: response.statusText,
      });
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${dokumentTittel}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  }

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
                  icon={<DownloadIcon fontSize="1.5rem" aria-hidden />}
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
      <FormSummaryFooter seksjonsUrl={`/${søknadId}/dokumentasjon`} redigerbar={true} />
    </FormSummary>
  );
}
