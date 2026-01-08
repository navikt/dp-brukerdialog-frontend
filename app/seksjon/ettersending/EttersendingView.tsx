import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  ErrorMessage,
  Heading,
  HStack,
  Link,
  ReadMore,
  VStack,
} from "@navikt/ds-react";
import { useNavigate } from "react-router";
import { EttersendingFilOpplasting } from "~/components/EttersendingFilOpplasting";
import { Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";
import { useEttersendingContext } from "./ettersending.context";

const seksjonnavn = "Ettersending";
const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;

export function EttersendingView() {
  const navigate = useNavigate();
  const { ettersending, lagrer, validerEttersending, harTekniskFeil } = useEttersendingContext();

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <Heading size="medium" level="2">
        {seksjonnavn}
      </Heading>

      <VStack gap="4">
        <BodyShort weight="semibold">
          Frist for innsendinger er 14 dager etter at du sendte søknaden.
        </BodyShort>
        <BodyLong>
          Vi trenger dokumentasjonen for å vurdere om du har rett til dagpenger. Du er ansvarlig for
          at dokumentasjonen sendes til oss. Hvis du ikke sender alle dokumentene innen fristen kan
          du få avslag på søknaden, fordi Nav mangler viktige opplysninger i saken din. Ta kontakt
          hvis du ikke rekker å ettersende alle dokumentene.
        </BodyLong>

        <ReadMore header="Har du fått brev om manglende opplysninger?">
          <BodyLong>
            Hvis du har fått brev om manglende opplysninger vil det stå i brevet hva som skal sendes
            inn og frist for å sende inn. Brev du har fått ligger i{" "}
            <Link href="https://www.nav.no/arbeid/dagpenger/mine-dagpenger#dokumentliste">
              dokumentlisten på Mine dagpenger
            </Link>
            . Når du har dokumentene klare kan du{" "}
            <Link href="https://www.nav.no/dagpenger/dialog/generell-innsending/">
              sende dem inn her.
            </Link>
            Dette kan forlenge tiden det tar å behandle søknaden din.
          </BodyLong>
        </ReadMore>
      </VStack>

      <VStack gap="4" className="mt-8">
        {ettersending.map((dokumentasjonskrav: Dokumentasjonskrav) => (
          <Box.New
            key={dokumentasjonskrav.id}
            padding="space-16"
            background="sunken"
            borderRadius="large"
            className="mt-4"
          >
            <VStack gap="8">
              <EttersendingFilOpplasting dokumentasjonskrav={dokumentasjonskrav} />
            </VStack>
          </Box.New>
        ))}
      </VStack>

      {!lagrer && harTekniskFeil && (
        <ErrorMessage className="mt-4">
          Det har oppstått en teknisk feil. Vi klarte ikke å sende inn dokumentasjonen. Prøv nytt.
        </ErrorMessage>
      )}

      <HStack gap="4" className="mt-14">
        <Button type="button" loading={lagrer} onClick={() => validerEttersending()}>
          Send inn dokumenter
        </Button>
        <Button
          variant="secondary"
          type="button"
          iconPosition="right"
          disabled={lagrer}
          onClick={() => {
            navigate(`../kvittering`);
          }}
        >
          Avbryt
        </Button>
      </HStack>
    </div>
  );
}
