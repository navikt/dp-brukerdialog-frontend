import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, Button, Heading, HStack, List, ReadMore, VStack } from "@navikt/ds-react";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import { dokumentkravSvarSendNå } from "./dokumentasjonskrav.komponenter";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

export function DokumentasjonView() {
  const navigate = useNavigate();
  const { soknadId } = useParams();
  const { dokumentasjonskrav } = useDokumentasjonskravContext();
  const [bundlingFeilet, setBundlingFeilet] = useState(false);

  async function bundleDokumentasjonskrav() {
    const dokumentasjonskravTilBundling = dokumentasjonskrav.filter(
      (dokumentkrav) =>
        dokumentkrav.svar === dokumentkravSvarSendNå &&
        dokumentkrav.filer &&
        dokumentkrav.filer.length > 0
    );

    if (dokumentasjonskravTilBundling.length === 0) {
      console.error("Ingen dokumentasjonskrav å bundle");
      navigate(`/${soknadId}/oppsummering`);
    }

    const bundlePromises = dokumentasjonskravTilBundling.map((dokumentkrav) => {
      const formData = new FormData();
      formData.append("dokumentasjonskravFiler", JSON.stringify(dokumentkrav.filer));

      return fetch(`/api/dokumentasjonskrav/${soknadId}/${dokumentkrav.id}/bundle`, {
        method: "POST",
        body: formData,
      });
    });

    const bundlingResponser = await Promise.all(bundlePromises);

    await Promise.all(
      bundlingResponser.map((response, index) => {
        if (response.ok) {
          console.log(`Bundle opprettet for ${dokumentasjonskravTilBundling[index].id}`);
          return response.json();
        }

        console.error(`Bundle feil for ${dokumentasjonskravTilBundling[index].id}`);
        return null;
      })
    );

    const alleBundlingOk = bundlingResponser.every((response) => response.ok);

    if (alleBundlingOk) {
      setBundlingFeilet(false);
      console.log("Alle bundles behandlet - redirecter til oppsummering");
      navigate(`/${soknadId}/oppsummering`);
    } else {
      console.error("Noen bundles feilet - kan ikke fortsette");
      setBundlingFeilet(true);
    }
  }

  return (
    <div className="innhold">
      <h2>Dokumentasjon</h2>
      <VStack gap="2">
        <BodyLong spacing>
          Du må laste opp dokumentasjon som bekrefter opplysningene i søknaden. Du får raskere svar
          på søknaden din hvis vi har all dokumentasjonen når vi starter behandlingen. Du kan bruke
          filformatene PDF, JPG og PNG.
        </BodyLong>
        <BodyLong>Slik bruker du bilder som dokumentasjon i søknaden:</BodyLong>
        <BodyLong>
          <List as="ol">
            <List.Item>Bruk et kamera med god oppløsning.</List.Item>
            <List.Item>Pass på at det er godt lys.</List.Item>
            <List.Item>
              Legg dokumentet på et bord eller gulv med kontrast til dokumentet.
            </List.Item>
          </List>
        </BodyLong>

        <ReadMore header="Mangler du noen dokumenter?">
          <BodyLong>
            Du kan sende inn det du har nå og ettersende resten innen 14 dager. Hvis du ikke sender
            alle dokumentene innen fristen kan du få avslag på søknaden, fordi Nav mangler viktige
            opplysninger i saken din. Ta kontakt hvis du ikke rekker å ettersende alle dokumentene.
          </BodyLong>
        </ReadMore>

        <ReadMore header="Har du sendt inn dokumentene til Nav tidligere?">
          <BodyLong>
            Hvis du har sendt inn dokumentene sammen med en tidligere søknad om dagpenger, trenger
            du ikke å sende det på nytt.
          </BodyLong>
        </ReadMore>
      </VStack>

      <Heading size="small" level="3" className="mt-8">
        Dokumenter du skal sende inn
      </Heading>
      <VStack gap="4">
        {dokumentasjonskrav.map((dokumentasjonskrav) => (
          <DokumentasjonskravKomponent
            key={dokumentasjonskrav.id}
            dokumentasjonskrav={dokumentasjonskrav}
          />
        ))}
      </VStack>

      {bundlingFeilet && (
        <Alert variant="error">Feil ved lagring av dokumenter. Vennligst prøv igjen.</Alert>
      )}

      <HStack gap="4" className="mt-14">
        <Button
          variant="secondary"
          type="button"
          onClick={() => navigate("../tilleggsopplysninger")}
          icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Forrige steg
        </Button>
        <Button
          variant="primary"
          type="button"
          iconPosition="right"
          icon={<ArrowRightIcon />}
          onClick={bundleDokumentasjonskrav}
        >
          Til oppsummering
        </Button>
      </HStack>
    </div>
  );
}
