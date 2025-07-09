import { Box, Button, Checkbox, VStack } from "@navikt/ds-react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router";

export default function OpprettSoknad() {
  const navigate = useNavigate();

  async function startSoknad() {
    const response = await fetch("/api/hent-soknadId", {
      method: "GET",
    });

    const soknadId = await response.text();

    return navigate(`/${soknadId}/din-situasjon`);
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <h1>Søknad om dagpenger</h1>
      <p>
        Dagpenger er økonomisk støtte på veien tilbake til arbeid. For å ha rett til dagpenger, må
        du fylle noen krav. Her kan du lese om du har rett til dagpenger.
      </p>
      <h3>Vi trenger riktige opplysninger for å vurdere om du har rett til dagpenger</h3>
      <VStack gap="4">
        <Box padding="4" background="surface-warning-subtle" borderRadius={"medium"}>
          <Checkbox value="enig">Jeg bekrefter at jeg vil svare så riktig som jeg kan</Checkbox>
        </Box>
        <Button iconPosition="right" icon={<ArrowRightIcon aria-hidden />} onClick={startSoknad}>
          Start søknad
        </Button>
      </VStack>
    </main>
  );
}
