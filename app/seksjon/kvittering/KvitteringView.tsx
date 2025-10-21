import {
  Alert,
  BodyLong,
  Button,
  Heading,
  HStack,
  Link,
  ReadMore,
  Tag,
  VStack,
} from "@navikt/ds-react";
import DokumentasjonsBox from "~/seksjon/kvittering/DokumentasjonsBox";

export default function KvitteringView() {
  var listeMedMangledeDokumentasjoner = [
    {
      type: "Arbeidsavtale",
      sendesAv: "deg",
      beskrivelse: "Dokumentasjon på din arbeidsavtale fra din arbeidsgiver.",
      status: "Mangler",
    },
    {
      type: "Dokumentasjon på redusert arbeidsstid",
      sendesAv: "deg",
      beskrivelse: "Dokumentasjon som viser at du har fått redusert arbeidsstid.",
      status: "Mottatt",
    },
    {
      type: "Arbeidsavtale",
      sendesAv: "deg",
      beskrivelse: "Dokumentasjon på din arbeidsavtale fra din arbeidsgiver.",
      status: "Mottatt",
    },
  ];

  var listeMedMangledeDokumentasjonerSomIkkeSkalSendes = [
    {
      type: "Oppsigelsesbrev",
      sendesAv: "Du har sagt at du ikke sender dette",
      beskrivelse: "Dokumentasjon på din arbeidsavtale fra din arbeidsgiver.",
      status: "Ikke sendt",
    },
  ];
  return (
    <div className="innhold">
      <VStack gap="20">
        <VStack gap="6">
          <HStack justify="space-between">
            <VStack>
              <Heading size="medium">Søknad mottatt</Heading>
            </VStack>
            <Tag variant={"warning"} size="xsmall">
              Mangler dokumentasjon
            </Tag>
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
          <h2>Dokumentasjon</h2>
          <BodyLong>Frist for innsendinger er 14 dager etter at du sendte søknaden.</BodyLong>
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
          <Heading size="small">Dokumenter du skal sende inn</Heading>
          {listeMedMangledeDokumentasjoner.map((dokumentasjon, index) => {
            return (
              <DokumentasjonsBox
                type={dokumentasjon.type}
                beskrivelse={dokumentasjon.beskrivelse}
                sendesAv={dokumentasjon.sendesAv}
                status={dokumentasjon.status}
              />
            );
          })}
          <HStack>
            <Button variant="primary">Send inn dokumenter</Button>
          </HStack>

          <Heading size="small">Dokumenter du ikke skal sende</Heading>
          {listeMedMangledeDokumentasjonerSomIkkeSkalSendes.map((dokumentasjon) => {
            return (
              <DokumentasjonsBox
                type={dokumentasjon.type}
                beskrivelse={dokumentasjon.beskrivelse}
                sendesAv={dokumentasjon.sendesAv}
                status={dokumentasjon.status}
              />
            );
          })}
          <HStack>
            <Button variant="primary">Gå til mine dagpenger</Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
