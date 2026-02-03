import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  ErrorMessage,
  Heading,
  HStack,
  ReadMore,
  VStack,
} from "@navikt/ds-react";
import { useNavigate } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { EttersendingFilOpplasting } from "~/components/EttersendingFilOpplasting";
import { getEnv } from "~/utils/env.utils";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import {
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
} from "../dokumentasjon/dokumentasjonskrav.komponenter";
import DokumentasjonskravSomErSendtAvDeg from "../kvittering/DokumentasjonSomErSendtAvDeg";
import DokumentasjonSomIkkeSkalSendes from "../kvittering/DokumentasjonSomIkkeSkalSendes";
import { useEttersendinger } from "./ettersending.context";

const seksjonnavn = "Ettersending";
const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;

export function EttersendingView() {
  const navigate = useNavigate();
  const {
    ettersendinger,
    lagrer,
    validerOgLagreEttersendinger,
    harTekniskFeil,
    dokumentasjonskraver,
    valideringStartet,
  } = useEttersendinger();

  const dokumentasjonSomErSendtAvDeg: Dokumentasjonskrav[] = dokumentasjonskraver.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSendNå
  );

  const dokumentasjonSomIkkeSkalSendes: Dokumentasjonskrav[] = dokumentasjonskraver.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSenderIkke || krav.svar === dokumentkravSvarSendtTidligere
  );

  const minstEnEttersendingHarMinstEnFil = ettersendinger.some(
    (krav: Dokumentasjonskrav) => krav.filer && krav.filer.length > 0
  );

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="8">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>

        <VStack gap="4">
          <BodyShort weight="semibold">
            Frist for innsendinger er 14 dager etter at du sendte søknaden.
          </BodyShort>
          <BodyLong>
            Vi trenger dokumentasjonen for å vurdere om du har rett til dagpenger. Du er ansvarlig
            for at dokumentasjonen sendes til oss. Hvis du ikke sender alle dokumentene innen
            fristen kan du få avslag på søknaden, fordi Nav mangler viktige opplysninger i saken
            din. Ta kontakt hvis du ikke rekker å ettersende alle dokumentene.
          </BodyLong>

          <ReadMore header="Har du fått brev om manglende opplysninger?">
            <BodyLong>
              Hvis du har fått brev om manglende opplysninger vil det stå i brevet hva som skal
              sendes inn og frist for å sende inn. Brev du har fått ligger i{" "}
              <EksterneLenke
                href="https://www.nav.no/arbeid/dagpenger/mine-dagpenger#dokumentliste"
                tekst="dokumentlisten på Mine dagpenger"
              />
              . Når du har dokumentene klare kan du{" "}
              <EksterneLenke
                href="https://www.nav.no/dagpenger/dialog/generell-innsending/"
                tekst="sende dem inn her"
              />{" "}
              Dette kan forlenge tiden det tar å behandle søknaden din.
            </BodyLong>
          </ReadMore>

          {ettersendinger.map((dokumentasjonskrav: Dokumentasjonskrav) => (
            <Box.New
              key={dokumentasjonskrav.id}
              padding="space-16"
              background="sunken"
              borderRadius="large"
            >
              <EttersendingFilOpplasting dokumentasjonskrav={dokumentasjonskrav} />
            </Box.New>
          ))}

          {!lagrer && harTekniskFeil && (
            <ErrorMessage>
              Det har oppstått en teknisk feil. Vi klarte ikke å sende inn dokumentasjonen. Prøv
              nytt.
            </ErrorMessage>
          )}

          {valideringStartet && !minstEnEttersendingHarMinstEnFil && (
            <ErrorMessage>
              Du må laste opp minst en fil før dokumentasjonen kan sendes inn.
            </ErrorMessage>
          )}
        </VStack>

        <HStack gap="4">
          <Button type="button" loading={lagrer} onClick={() => validerOgLagreEttersendinger()}>
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

        <VStack gap="4">
          {dokumentasjonSomErSendtAvDeg.length > 0 && (
            <VStack gap="4">
              <Heading size="small">Dokumenter du har sendt inn</Heading>
              {dokumentasjonSomErSendtAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonskravSomErSendtAvDeg key={krav.id} dokumentasjonskrav={krav} />
              ))}
            </VStack>
          )}

          {dokumentasjonSomIkkeSkalSendes.length > 0 && (
            <VStack gap="4">
              <Heading size="small">Dokumenter du ikke skal sende inn</Heading>
              {dokumentasjonSomIkkeSkalSendes.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonSomIkkeSkalSendes key={krav.id} dokummentasjonskrav={krav} />
              ))}
            </VStack>
          )}
        </VStack>

        <VStack gap="4">
          <Heading size="small" level="3">
            Andre dokumenter
          </Heading>
          <BodyLong>
            Du kan sende inn andre dokumenter hvis du mener det er relevant i saken din. Dette er
            helt valgfritt.
          </BodyLong>
          <EksterneLenke
            href={getEnv("GENERELL_INNSENDING_URL")}
            tekst="Jeg vil sende inn andre dokumenter"
          />
        </VStack>
      </VStack>
    </div>
  );
}
