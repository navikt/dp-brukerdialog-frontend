import { ExclamationmarkTriangleIcon, InformationSquareIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Button,
  ExpansionCard,
  Heading,
  HStack,
  InfoCard,
  LocalAlert,
  ReadMore,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { useEffect } from "react";
import { Link, useLoaderData, useParams, useSearchParams } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { stegISøknaden } from "~/routes/$soknadId";
import { loader } from "~/routes/$soknadId.kvittering";
import DokumentasjonskravSomErSendtAvDeg from "~/seksjon/kvittering/DokumentasjonSomErSendtAvDeg";
import DokumentasjonSomIkkeSkalSendes from "~/seksjon/kvittering/DokumentasjonSomIkkeSkalSendes";
import Oppsummering from "~/seksjon/oppsummering/Oppsummering";
import { getEnv } from "~/utils/env.utils";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import {
  dokumentkravEttersendt,
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSenderSenere,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
} from "../dokumentasjon/dokumentasjonskrav.komponenter";
import DokumentasjonSomSkalSendesAvDeg from "./DokumentasjonSomSkalSendesAvDeg";

export default function KvitteringView() {
  const { soknadId } = useParams();
  const [searchParams] = useSearchParams();
  const seksjonnavn = "Søknad mottatt";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const loaderData = useLoaderData<typeof loader>();
  const dokumentasjonskrav = loaderData?.dokumentasjonskrav || [];

  useEffect(() => {
    if (searchParams.get("reload") === "true") {
      window.location.replace(`/${soknadId}/kvittering`);
    }
  }, [searchParams, soknadId]);

  const dokumentasjonSomErSendtAvDeg: Dokumentasjonskrav[] = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSendNå || krav.svar === dokumentkravEttersendt
  );

  const dokumentasjonSomSkalSendesAvDeg: Dokumentasjonskrav[] = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  const dokumentasjonSomIkkeSkalSendes: Dokumentasjonskrav[] = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSenderIkke || krav.svar === dokumentkravSvarSendtTidligere
  );

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="8">
        <VStack gap="8">
          <HStack justify="space-between">
            <VStack>
              <Heading size="medium">{seksjonnavn}</Heading>
            </VStack>
            {dokumentasjonSomSkalSendesAvDeg.length > 0 && (
              <Tag variant={"warning"} size="xsmall">
                Mangler dokumentasjon
              </Tag>
            )}
          </HStack>

          {dokumentasjonSomSkalSendesAvDeg.length > 0 && (
            <BodyLong>
              Vi har fått søknaden din, men vi mangler dokumenter for å kunne behandle søknaden. Når
              du har sendt alle dokumentene vil vi behandle søknaden, og du vil få beskjed når
              svaret er klart. Se hvor lang tid{" "}
              <EksterneLenke
                href="https://www.nav.no/saksbehandlingstider#dagpenger"
                tekst="saksbehandlingstiden"
              />{" "}
              for dagpenger er nå. Hvis vi trenger flere dokumenter, vil du få beskjed om dette.
              Saksbehandlingstiden kan da bli lengre enn det som er oppgitt.
            </BodyLong>
          )}
          {dokumentasjonSomSkalSendesAvDeg.length === 0 && (
            <BodyLong>
              Vi har fått søknaden din. Du vil få beskjed når svaret er klart. Se hvor lang tid{" "}
              <EksterneLenke
                href="https://www.nav.no/saksbehandlingstider#dagpenger"
                tekst="saksbehandlingstiden"
              />{" "}
              for dagpenger er nå. Hvis vi trenger flere dokumenter, vil du få beskjed om dette.
              Saksbehandlingstiden kan da bli lengre enn det som er oppgitt.
            </BodyLong>
          )}
          {loaderData.erRegistrertArbeidssøker === true && (
            <InfoCard data-color="info">
              <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                <InfoCard.Title>Du er registrert som arbeidssøker</InfoCard.Title>
              </InfoCard.Header>
              <InfoCard.Content>
                <BodyLong>
                  For å ha rett til dagpenger, må du være registrert som arbeidssøker. Du er
                  allerede registrert som arbeidssøker.
                </BodyLong>
              </InfoCard.Content>
            </InfoCard>
          )}
          {loaderData.erRegistrertArbeidssøker === false && (
            <InfoCard data-color="warning">
              <InfoCard.Header icon={<ExclamationmarkTriangleIcon aria-hidden />}>
                <InfoCard.Title>Du er ikke registrert som arbeidssøker</InfoCard.Title>
              </InfoCard.Header>
              <InfoCard.Content>
                <BodyLong>
                  Du er ikke registrert som arbeidssøker, og du risikerer å få avslag på søknaden
                  din. Du må være registrert som arbeidssøker for å ha rett til dagpenger.{" "}
                  <EksterneLenke
                    href="https://arbeidssokerregistrering.nav.no/"
                    tekst="Registrer deg som arbeidssøker"
                  />
                  .
                </BodyLong>
              </InfoCard.Content>
            </InfoCard>
          )}
          {loaderData.erRegistrertArbeidssøker === "ERROR" && (
            <LocalAlert status="error">
              <LocalAlert.Header>
                <LocalAlert.Title>Oppslag mot Arbedidssøkerregistreret feilet</LocalAlert.Title>
              </LocalAlert.Header>
              <LocalAlert.Content>
                <BodyShort spacing>
                  For å ha rett på dagpenger må du være registrert som arbeidssøker. Vi prøvde å
                  sjekke om du er registrert som arbeidssøker automatisk, men det klarte vi
                  dessverre ikke.
                </BodyShort>
                <BodyShort>
                  Hvis du er usikker på om du er registrert som arbeidssøker, må du{" "}
                  <EksterneLenke
                    href="https://arbeidssokerregistrering.nav.no/"
                    tekst="egistrere deg som arbeidssøker"
                  />
                </BodyShort>
              </LocalAlert.Content>
            </LocalAlert>
          )}

          <VStack gap="4">
            <Heading size="medium">Dokumentasjon</Heading>
            <InfoCard data-color="info">
              <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                <InfoCard.Title>Sende inn dokumentasjon</InfoCard.Title>
              </InfoCard.Header>
              <InfoCard.Content>
                <BodyLong spacing={true} weight="semibold">
                  Frist for ettersending av dokumentasjon er 14 dager etter at du sendte søknaden
                </BodyLong>
                <BodyLong>
                  Vi trenger dokumentasjonen for å vurdere om du har rett til dagpenger. Du er
                  ansvarlig for at dokumentasjonen sendes til oss. Hvis du ikke sender alle
                  dokumentene innen fristen kan du få avslag på søknaden, fordi Nav mangler viktige
                  opplysninger i saken din. Ta kontakt hvis du ikke rekker å ettersende alle
                  dokumentene.
                </BodyLong>
              </InfoCard.Content>
            </InfoCard>

            <ReadMore header="Har du fått brev om manglende opplysninger?">
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
              />
              .
            </ReadMore>
          </VStack>

          {dokumentasjonSomErSendtAvDeg.length > 0 && (
            <VStack gap="4">
              <Heading size="small">Dokumenter du har sendt inn</Heading>
              {dokumentasjonSomErSendtAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonskravSomErSendtAvDeg key={krav.id} dokumentasjonskrav={krav} />
              ))}
            </VStack>
          )}

          {dokumentasjonSomSkalSendesAvDeg.length > 0 && (
            <VStack gap="4">
              <Heading size="small">Dokumenter du skal sende inn</Heading>
              {dokumentasjonSomSkalSendesAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonSomSkalSendesAvDeg key={krav.id} dokumentasjonskrav={krav} />
              ))}
              <HStack>
                <Link to={`/${soknadId}/ettersending`}>
                  <Button variant="primary">Send inn dokumenter</Button>
                </Link>
              </HStack>
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

          <VStack gap="4">
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
              <Button
                variant="primary"
                onClick={() => {
                  window.location.href = getEnv("DP_MINE_DAGPENGER_URL");
                }}
              >
                Gå til mine dagpenger
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </div>
  );
}
