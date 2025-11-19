import { BodyLong, BodyShort, List, ReadMore, VStack } from "@navikt/ds-react";
import { DokumentasjonskravType } from "./DokumentasjonskravKomponent";
import { ca } from "date-fns/locale";

interface IProps {
  type: DokumentasjonskravType;
}

export function DokumentasjonskravInnhold({ type }: IProps) {
  function renderDokumentasjonskravInnhold() {
    switch (type) {
      case DokumentasjonskravType.Barn:
        return (
          <BodyLong>
            Du må dokumentere at du har barn under 18 år. Dette kan du gjøre ved å legge til
            fødselsattest eller bostedsbevis for barnet.
          </BodyLong>
        );

      case DokumentasjonskravType.Arbeidsforhold:
        return (
          <ReadMore header="Dette må dokumentasjonen inneholde">
            <VStack gap="2">
              <BodyShort>Arbeidsavtalen må inneholde</BodyShort>
              <List as="ul">
                <List.Item>datoen du startet i jobben din</List.Item>
                <List.Item>stillingsprosent eller avtalt arbeidstid</List.Item>
                <List.Item>sluttdato, hvis du har en midlertidig arbeidsavtale</List.Item>
              </List>
              <BodyLong>
                Arbeidsavtalen må inneholde datoen du startet i jobben din stillingsprosent eller
                avtalt arbeidstid avt endt oppsigelsestid sluttdato, hvis du har en midlertidig
                arbeidsavtale Hvis du ikke har arbeidsavtalen din, kan arbeidsgiveren din fylle ut
                skjemaet  "Bekreftelse på sluttårsak/nedsatt arbeidstid" (NAV 04-08.03). Du kan også
                be arbeidsgiveren din bekrefte opplysningene på en annen måte.
              </BodyLong>
            </VStack>
          </ReadMore>
        );

      case DokumentasjonskravType.Tjenestebevis:
        return (
          <BodyLong>
            Du har krysset av for at du har avtjent verneplikt i minst tre av de siste tolv
            månedene. Du må sende inn tjenestebevis fra forsvaret der start- og sluttdato for
            tjenesteperioden kommer tydelig frem.
          </BodyLong>
        );

      case DokumentasjonskravType.Utdanning:
        return (
          <BodyLong>
            Du har krysset av for at du har avsluttet utdanning eller opplæring i løpet av de siste
            seks månedene. Du må dokumentere sluttdatoen for utdanningen eller opplæringen du har
            gjennomført. Du kan for eksempel sende oss et vitnemål eller en attest fra studiestedet
            ditt.
          </BodyLong>
        );

      default:
        console.error(`Ukjent dokumentasjonskrav type: ${type}`);
        return <p>Ukjent dokumentasjonskrav type.</p>;
    }
  }

  return renderDokumentasjonskravInnhold();
}
