import {
  Alert,
  BodyLong,
  BodyShort,
  Button,
  ExpansionCard,
  Heading,
  HStack,
  Link,
  ReadMore,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { useLoaderData, useParams } from "react-router";
import { stegISøknaden } from "~/routes/$soknadId";
import { loader } from "~/routes/$soknadId.kvittering";
import DokumentasjonSomIkkeSkalSendes from "~/seksjon/kvittering/DokumentasjonSomIkkeSkalSendes";
import Oppsummering from "~/seksjon/oppsummering/Oppsummering";
import { Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";
import {
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSenderSenere,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
} from "../dokumentasjon/dokumentasjonskrav.komponenter";
import DokumentasjonSomSkalSendesAvDeg from "./DokumentasjonSomSkalSendesAvDeg";
import DokumentasjonskravSomErSendtAvDeg from "~/seksjon/kvittering/DokumentasjonSomErSendtAvDeg";

export default function KvitteringView() {
  const { soknadId } = useParams();
  const loaderData = useLoaderData<typeof loader>();
  const dokumentasjonskrav = loaderData?.dokumentasjonskrav || [];

  const dokumentasjonSomErSendtAvDeg = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSendNå
  );

  const dokumentasjonSomSkalSendesAvDeg = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  const dokumentasjonSomIkkeSkalSendes = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSenderIkke || krav.svar === dokumentkravSvarSendtTidligere
  );

  return (
    <div className="innhold">
      <VStack gap="20">
        <VStack gap="6">
          <HStack justify="space-between">
            <VStack>
              <Heading size="medium">Søknad mottatt</Heading>
            </VStack>
            {dokumentasjonSomSkalSendesAvDeg.length > 0 && (
              <Tag variant={"warning"} size="xsmall">
                Mangler dokumentasjon
              </Tag>
            )}
          </HStack>

          <BodyLong>
            Vi har fått søknaden din. Du vil få beskjed når svaret er klart. Se hvor lang tid
            <Link href="https://www.nav.no/saksbehandlingstider#dagpenger">
              saksbehandlingstiden
            </Link>{" "}
            for dagpenger er nå. Hvis vi trenger flere dokumenter, vil du få beskjed om dette.
            Saksbehandlingstiden kan da bli lengre enn det som er oppgitt.
          </BodyLong>
          <Alert variant="warning" fullWidth>
            Du er ikke registrert som arbeidssøker, og du risikerer å få avslag på søknaden din. Du
            må være registrert som arbeidssøker for å ha rett til dagpenger.{" "}
            <Link href="https://arbeidssokerregistrering.nav.no/" className={""}>
              Registrer deg som arbeidssøker
            </Link>
          </Alert>
          <Heading size="medium">Dokumentasjon</Heading>
          <BodyShort size="small">
            Frist for innsendinger er 14 dager etter at du sendte søknaden.
          </BodyShort>
          <BodyLong>
            Vi trenger dokumentasjonen for å vurdere om du har rett til dagpenger. Du er ansvarlig
            for at dokumentasjonen sendes til oss. Hvis du ikke sender alle dokumentene innen
            fristen kan du få avslag på søknaden, fordi NAV mangler viktige opplysninger i saken
            din. Ta kontakt hvis du ikke rekker å ettersende alle dokumentene.
          </BodyLong>
          <ReadMore header={"Har du fått brev om manglende opplysninger?"}>
            Hvis du har fått brev om manglende opplysninger vil det stå i brevet hva som skal sendes
            inn og frist for å sende inn. Brev du har fått ligger i{" "}
            <Link href="https://www.nav.no/arbeid/dagpenger/mine-dagpenger#dokumentliste">
              dokumentlisten på Mine dagpenger
            </Link>
            . Når du har dokumentene klare kan du{" "}
            <Link href="https://www.nav.no/dagpenger/dialog/generell-innsending/">
              sende dem inn her
            </Link>
            .
          </ReadMore>
          {dokumentasjonSomErSendtAvDeg.length > 0 && (
            <>
              <Heading size="small" className="mt-4">
                Dokumenter du har sendt
              </Heading>
              {dokumentasjonSomErSendtAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonskravSomErSendtAvDeg key={krav.id} dokummentasjonskrav={krav} />
              ))}
            </>
          )}

          {dokumentasjonSomSkalSendesAvDeg.length > 0 && (
            <>
              <Heading size="small" className="mt-4">
                Dokumenter du skal sende
              </Heading>
              {dokumentasjonSomSkalSendesAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonSomSkalSendesAvDeg key={krav.id} dokummentasjonskrav={krav} />
              ))}
              <HStack>
                <Button variant="primary">Send inn dokumenter (fungerer ikke enda)</Button>
              </HStack>
            </>
          )}

          {dokumentasjonSomIkkeSkalSendes.length > 0 && (
            <>
              <Heading size="small">Dokumenter du ikke skal sende</Heading>
              {dokumentasjonSomIkkeSkalSendes.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonSomIkkeSkalSendes key={krav.id} dokummentasjonskrav={krav} />
              ))}
            </>
          )}

          <ExpansionCard aria-label="Dine svar">
            <ExpansionCard.Header>
              <ExpansionCard.Title>Dine svar</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
              <VStack gap="6">
                {stegISøknaden.map((seksjon) => {
                  const seksjonsData = loaderData?.seksjoner?.find(
                    (s: any) => s.seksjonId === seksjon.path
                  );
                  if (!seksjonsData) return null;
                  return (
                    <Oppsummering
                      key={seksjonsData.seksjonId}
                      seksjonsId={seksjon.path}
                      seksjonsUrl={`/${soknadId}/${seksjonsData.seksjonId}`}
                      seksjonsData={seksjonsData.data}
                      redigerbar={false}
                    />
                  );
                })}
              </VStack>
            </ExpansionCard.Content>
          </ExpansionCard>
          <HStack>
            <Button variant="primary">Gå til mine dagpenger</Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
