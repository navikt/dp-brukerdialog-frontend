import { Alert, BodyLong, Button, Heading, ReadMore, VStack } from "@navikt/ds-react";
import DokumentasjonsBox from "~/seksjon/kvittering/DokumentasjonsBox";

export default function KvitteringView() {
  var listeMedMangledeDokumentasjoner = [
    {
      type: "Arbeidsavtale",
      sendesAv: "deg",
      beskrivelse: "Dokumentasjon på din arbeidsavtale fra din arbeidsgiver.",
    },
    {
      type: "Dokumentasjon på redusert arbeidsstid",
      sendesAv: "deg",
      beskrivelse: "Dokumentasjon som viser at du har fått redusert arbeidsstid.",
    },
    {
      type: "Arbeidsavtale",
      sendesAv: "deg",
      beskrivelse: "Dokumentasjon på din arbeidsavtale fra din arbeidsgiver.",
    },
  ];

  var listeMedMangledeDokumentasjonerSomIkkeSkalSendes = [
    {
      type: "Oppsigelsesbrev",
      sendesAv: "Du har sagt at du ikke sender dette",
      beskrivelse: "Dokumentasjon på din arbeidsavtale fra din arbeidsgiver.",
    },
  ];
  return (
    <div className="innhold">
      <VStack gap="20">
        <VStack gap="6">
          <h2>Søknad mottatt</h2>
          <BodyLong>
            Vi har fått søknaden din. Du vil få beskjed når svaret er klart. Se hvor lang tid
            saksbehandlingstiden for dagpenger er nå. Hvis vi trenger flere dokumenter, vil du få
            beskjed om dette. Saksbehandlingstiden kan da bli lengre enn det som er oppgitt.
          </BodyLong>
          <Alert variant="warning" fullWidth>
            Du er ikke registrert som arbeidssøker, og du risikerer å få avslag på søknaden din. Du
            må være registrert som arbeidssøker for å ha rett til dagpenger. Registrer deg som
            arbeidssøker
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
            Du mangler opplysninger i søknaden din. Du finner en oversikt over hvilke opplysninger
            du mangler i brevet du har fått fra oss. Du kan sende inn opplysningene via
            dokumentasjonsoversikten på nav.no eller via posten.
          </ReadMore>
          {listeMedMangledeDokumentasjoner.map((dokumentasjon, index) => {
            return (
              <DokumentasjonsBox
                type={dokumentasjon.type}
                beskrivelse={dokumentasjon.beskrivelse}
                sendesAv={dokumentasjon.sendesAv}
              />
            );
          })}
          <Button variant="primary">Send inn dokumenter</Button>

          <Heading size="small">Dokumenter du ikke skal sende</Heading>
          {listeMedMangledeDokumentasjonerSomIkkeSkalSendes.map((dokumentasjon) => {
            return (
              <DokumentasjonsBox
                type={dokumentasjon.type}
                beskrivelse={dokumentasjon.beskrivelse}
                sendesAv={dokumentasjon.sendesAv}
              />
            );
          })}
          <Button variant="primary">Gå til mine dagpenger</Button>
        </VStack>
      </VStack>
    </div>
  );
}
