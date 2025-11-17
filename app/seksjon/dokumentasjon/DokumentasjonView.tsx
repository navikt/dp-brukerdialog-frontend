import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, Button, Heading, HStack, List, ReadMore, VStack } from "@navikt/ds-react";
import { useNavigate } from "react-router";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import { useEffect, useState } from "react";

const NESTE_SEKSJON_ID = "oppsummering";
const FORRIGE_SEKSJON_ID = "tilleggsopplysninger";

export function DokumentasjonView() {
  const navigate = useNavigate();
  const { dokumentasjonskrav } = useDokumentasjonskravContext();
  const [harUbesvartDokumentasjonskrav, setHarUbesvartDokumentasjonskrav] = useState(false);
  const [harForsøktÅGåVidere, setHarForsøktÅGåVidere] = useState(false);

  useEffect(() => {
    const alleBesvart = dokumentasjonskrav.every((krav) => krav.svar !== undefined);

    if (alleBesvart && harUbesvartDokumentasjonskrav) {
      setHarUbesvartDokumentasjonskrav(false);
    }
  }, [dokumentasjonskrav, harUbesvartDokumentasjonskrav]);

  function ValiderDokumentasjonskrav() {
    const alleBesvart = dokumentasjonskrav.every((krav) => krav.svar !== undefined);
    setHarForsøktÅGåVidere(true);

    if (alleBesvart) {
      navigate(`../${NESTE_SEKSJON_ID}`);
    } else {
      setHarUbesvartDokumentasjonskrav(true);
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

      {harUbesvartDokumentasjonskrav && harForsøktÅGåVidere && (
        <Alert variant="error" className="mt-8">
          Du må svare på alle dokumentasjonskravene før du kan gå videre til oppsummeringen.
        </Alert>
      )}

      <HStack gap="4" className="mt-14">
        <Button
          variant="secondary"
          type="button"
          onClick={() => navigate(`../${FORRIGE_SEKSJON_ID}`)}
          icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Forrige steg
        </Button>
        <Button
          variant="primary"
          type="button"
          iconPosition="right"
          icon={<ArrowRightIcon />}
          onClick={ValiderDokumentasjonskrav}
        >
          Til oppsummering
        </Button>
      </HStack>
    </div>
  );
}
