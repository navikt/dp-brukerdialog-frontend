import { BodyLong, BodyShort, Link, List, ReadMore, VStack } from "@navikt/ds-react";
import { DokumentasjonskravType } from "./DokumentasjonskravKomponent";

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

      case DokumentasjonskravType.ArbeidsforholdArbeidsavtale:
        return (
          <VStack gap="2">
            <BodyShort>
              Du har lagt til et arbeidsforhold. Du må dokumentere arbeidsforholdet ved å sende oss
              arbeidsavtalen.
            </BodyShort>
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
                  skjemaet 
                  <Link href="https://www.nav.no/soknader">
                    "Bekreftelse på sluttårsak/nedsatt arbeidstid" (NAV 04-08.03)
                  </Link>
                   . Du kan også be arbeidsgiveren din bekrefte opplysningene på en annen måte.
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp:
        return (
          <VStack gap="2">
            <BodyShort>Du har krysset av for at du har blitt sagt opp.</BodyShort>
            <ReadMore header="Dette må dokumentasjonen inneholde">
              <VStack gap="2">
                <BodyShort>Du legge ved dokumentasjon som viser</BodyShort>
                <List as="ul">
                  <List.Item>datoen du fikk oppsigelsen</List.Item>
                  <List.Item>årsaken til at du ble sagt opp</List.Item>
                </List>
                <BodyLong>
                  For å dokumentere dette, kan du legge ved oppsigelsen du fikk av arbeidsgiveren
                  din. Hvis oppsigelsen ikke inneholder opplysningene vi trenger, kan du bruke
                  skjemaet 
                  <Link href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf">
                    Bekreftelse på sluttårsak eller nedsatt arbeidstid (04-08.03)
                  </Link>
                  . Arbeidsgiveren din må fylle ut og signere skjemaet. Du kan også be
                  arbeidsgiveren din om å dokumentere opplysningene på en annen måte.
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdJegHarSagtOppSelv:
        return (
          <VStack gap="2">
            <BodyShort>Du har krysset av for at du har sagt opp jobben.</BodyShort>
            <ReadMore header="Dette må dokumentasjonen inneholde">
              <VStack gap="2">
                <BodyShort>Du legge ved dokumentasjon som viser</BodyShort>
                <List as="ul">
                  <List.Item>datoen du ga oppsigelsen til arbeidsgiveren din</List.Item>
                  <List.Item>årsaken til at du sa opp jobben din</List.Item>
                </List>
                <BodyLong>
                  For å dokumentere dette, kan du legge ved oppsigelsen du ga arbeidsgiveren din.
                  Hvis oppsigelsen ikke inneholder opplysningene vi trenger, kan du bruke skjemaet {" "}
                  <Link href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf">
                     Bekreftelse på sluttårsak eller nedsatt arbeidstid (04-08.03)
                  </Link>
                  Arbeidsgiveren din må fylle ut og signere skjemaet. Du kan også be arbeidsgiveren
                  din om å dokumentere opplysningene på en annen måte.
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdAvskjedigelse:
        return (
          <VStack gap="2">
            <BodyShort>Du har krysset av for at du har blitt avskjediget.</BodyShort>
            <ReadMore header="Dette må dokumentasjonen inneholde">
              <VStack gap="2">
                <BodyShort>Du legge ved dokumentasjon som viser</BodyShort>
                <List as="ul">
                  <List.Item>datoen du ble avskjediget</List.Item>
                  <List.Item>årsaken til at du ble avskjediget</List.Item>
                </List>
                <BodyLong>
                  For å dokumentere dette, kan du sende oss avskjedigelsen du har fått fra
                  arbeidsgiver. Hvis avskjedigelsen ikke inneholder opplysningene vi trenger, kan du
                  bruke skjemaet{" "}
                  <Link href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf">
                    Bekreftelse på sluttårsak eller nedsatt arbeidstid (04-08.03)
                  </Link>
                  . Arbeidsgiveren din må fylle ut og signere skjemaet. Du kan også be
                  arbeidsgiveren din om å dokumentere opplysningene på en annen måte.
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdRedusertArbeidstid:
        return (
          <VStack gap="2">
            <BodyShort>Du har krysset av for at arbeidstiden din er redusert.</BodyShort>
            <ReadMore header="Dette må dokumentasjonen inneholde">
              <VStack gap="2">
                <BodyShort>Du legge ved dokumentasjon som viser</BodyShort>
                <List as="ul">
                  <List.Item>datoen arbeidstiden din ble redusert</List.Item>
                  <List.Item>årsaken til at arbeidstiden din ble redusert</List.Item>
                  <List.Item>hvor mye arbeidstiden din ble redusert</List.Item>
                </List>
                <BodyLong>
                  Du må be arbeidsgiver om denne dokumentasjonen. Hvis dokumentene ikke inneholder
                  opplysningene vi trenger, kan du bruke skjemaet 
                  <Link href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf">
                    Bekreftelse på sluttårsak eller nedsatt arbeidstid (04-08.03)
                  </Link>
                  . Arbeidsgiveren din må fylle ut og signere skjemaet.
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter:
        return (
          <VStack gap="2">
            <BodyShort>
              Du har krysset av for at arbeidsgiveren din er konkurs. Du må legge ved brevet du har
              fått fra bostyreren eller konkursforvalteren.
            </BodyShort>
            <ReadMore header="Dette må dokumentasjonen inneholde">
              <VStack gap="2">
                <BodyShort>Du legge ved dokumentasjon som viser</BodyShort>
                <List as="ul">
                  <List.Item>at arbeidsgiveren din er konkurs</List.Item>
                  <List.Item>datoen konkursen er åpnet</List.Item>
                  <List.Item>at boet ikke trer inn i arbeidsavtalen din</List.Item>
                </List>
                <BodyLong>Brevet må være signert av bostyreren eller konkursforvalteren</BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdPermitteringsvarsel:
        return (
          <VStack gap="2">
            <BodyShort>
              Du har krysset av for at du er permittert. Du må legge ved permitteringsvarselet som
              du har fått fra arbeidsgiveren din.
            </BodyShort>
            <ReadMore header="Dette må dokumentasjonen inneholde">
              <VStack gap="2">
                <BodyShort>Permitteringsvarselet må inneholde informasjon om</BodyShort>
                <List as="ul">
                  <List.Item>årsaken til at du ble permittert (permitteringsårsak)</List.Item>
                  <List.Item>hvor mange prosent du er permittert (permitteringsgrad)</List.Item>
                  <List.Item>startdato og eventuell sluttdato for permitteringen</List.Item>
                  <List.Item>datoen du fikk permitteringsvarselet</List.Item>
                  <List.Item>
                    om partene på arbeidsplassen din er enige om permitteringen (JA/NEI)
                  </List.Item>
                </List>
                <BodyShort>Det må komme frem at permitteringen gjelder deg. skjemaet.</BodyShort>
                <BodyLong>
                  Hvis permitteringsvarselet ikke inneholder disse opplysningene kan du bruke
                  skjemaet{" "}
                  <Link href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/4f473293d31eee48921daecc72b1157e2a06542f.pdf">
                    Bekreftelse på arbeidsforhold og permittering (NAV 04-08.04).
                  </Link>
                  Arbeidsgiveren din må fylle ut og signere skjemaet.
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdRotasjon:
        return (
          <BodyLong>
            Du har krysset av for at du jobbet rotasjon. Du må dokumentere hvilken rotasjonsordning
            du har hatt. Den siste rotasjonen må dokumenteres med timeliste eller lignende, som
            viser når du var på jobb og når du hadde avspasering.
          </BodyLong>
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

      case DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid:
        return (
          <BodyLong>
            Du har krysset av for at du kun har mulighet til å ta deltidsjobb. Dette må du
            dokumentere med bekreftelse fra relevant fagpersonell, for eksempel lege. Hvis det er
            fordi den andre forelderen jobber skift, turnus eller utenfor nærområdet må du
            dokumentere dette.
          </BodyLong>
        );

      case DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeleNorge:
        return (
          <BodyLong>
            Du har krysset av for at du ikke kan ta jobb i hele Norge. Dette må du dokumentere med
            bekreftelse fra relevant fagpersonell, for eksempel lege. Hvis det er fordi den andre
            forelderen jobber skift, turnus eller utenfor nærområdet må du dokumentere dette.
          </BodyLong>
        );

      case DokumentasjonskravType.ReellArbeidssøkerIkkeTaAlleTypeYrker:
        return (
          <>
            <BodyLong>
              Du har krysset av for at du ikke har mulighet til å ta arbeid i hele Norge. Dette må
              du dokumentere med bekreftelse fra relevant fagpersonell, for eksempel lege. Hvis det
              er fordi den andre forelderen jobber skift, turnus eller utenfor nærområdet må du
              dokumentere dette.
            </BodyLong>
            <BodyLong>
              Dokumentasjonen må inneholde begrunnelse for at du ikke kan jobbe i hele Norge.
            </BodyLong>
          </>
        );

      case DokumentasjonskravType.AnnenPengestøtteFåLønnEllerAndreØkonomiskeGoder:
        return (
          <BodyLong>
            Du har krysset av for at du får eller kommer til å få en utbetaling eller andre
            økonomiske goder fra arbeidsgiver. Du må sende inn sluttavtale eller annen dokumentasjon
            som beskriver hva du får.
          </BodyLong>
        );

      case DokumentasjonskravType.AnnenPengestøtteFraAndreEøsLand:
        return <BodyLong>Du har krysset av for at du mottar støtte fra andre EØS-land.</BodyLong>;

      case DokumentasjonskravType.AnnenPengestøtteFraNorgePensjonFraAndre:
        return (
          <BodyLong>
            Du har krysset av for at du mottar pensjon fra andre enn Nav. Du må legge ved dokumentasjon på
            hvem som utbetaler pensjonen, og hvilken periode den gjelder for.
          </BodyLong>
        );

      case DokumentasjonskravType.AnnenPengestøtteFraNorgePengestøtteFraGff:
        return (
          <BodyLong>
            Du har krysset av for at du mottar dagpenger under arbeidsløshet eller garantilott fra
            Garantikassen for fiskere (GFF). Du må legge ved dokumentasjon på hvilken periode
            støtten gjelder for.
          </BodyLong>
        );

      default:
        console.error(`Ukjent dokumentasjonskrav type: ${type}`);
        return <p>Ukjent dokumentasjonskrav type.</p>;
    }
  }

  return renderDokumentasjonskravInnhold();
}
