import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading, HStack, List, ReadMore, VStack } from "@navikt/ds-react";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.dokumentasjon";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

export function DokumentasjonView() {
  const loaderData = useLoaderData<typeof loader>();

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
        {loaderData.map((seksjon) =>
          seksjon?.dokumentasjonskrav?.map((dokumentasjonskrav) => (
            <DokumentasjonskravKomponent
              key={dokumentasjonskrav.id}
              dokumentasjonskrav={dokumentasjonskrav}
              seksjon={seksjon}
            />
          ))
        )}
      </VStack>

      <HStack gap="4" className="mt-14">
        <Button
          variant="secondary"
          type="button"
          icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Forrige steg
        </Button>
        <Button variant="primary" type="submit" iconPosition="right" icon={<ArrowRightIcon />}>
          Neste steg
        </Button>
      </HStack>
    </div>
  );
}
