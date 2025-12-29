import { BodyLong, BodyShort, Box, ErrorMessage, Link, ReadMore, VStack } from "@navikt/ds-react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.ettersending";
import { Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";
import { DokumentkravFil, FilOpplasting } from "../dokumentasjon/FilOpplasting";
import { useDokumentasjonskravContext } from "../dokumentasjon/dokumentasjonskrav.context";
import { dokumentkravSvarSenderSenere } from "../dokumentasjon/dokumentasjonskrav.komponenter";

export function EttersendingView() {
  const loaderData = useLoaderData<typeof loader>();
  const dokumentasjonskrav = loaderData?.dokumentasjonskrav || [];
  const [visHarValideringsfeilFeilmelding, setVisHarValideringsfeilFeilmelding] = useState(false);
  const [visIngenFilerErLastetOppFeilmelding, setVisIngenFilerErLastetOppFeilmelding] =
    useState(false);

  const { setDokumentasjonskravIdSomSkalLagres } = useDokumentasjonskravContext();
  const [antallFilerMedValideringsfeil, setAntallFilerMedValideringsfeil] = useState(0);
  const [dokumentkravFiler, setDokumentkravFiler] = useState<DokumentkravFil[]>(
    dokumentasjonskrav.filer ?? []
  );

  const [ingenFilerErLastetOppForDokumentkravet, setIngenFilerErLastetOppForDokumentkravet] =
    useState(false);

  const dokumentasjonSomSkalSendesAvDeg = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  return (
    <div className="innhold">
      <h2>Ettersending</h2>

      <VStack gap="4">
        <BodyShort weight="semibold">
          Frist for innsendinger er 14 dager etter at du sendte søknaden.
        </BodyShort>
        <BodyLong>
          Vi trenger dokumentasjonen for å vurdere om du har rett til dagpenger. Du er ansvarlig for
          at dokumentasjonen sendes til oss. Hvis du ikke sender alle dokumentene innen fristen kan
          du få avslag på søknaden, fordi NAV mangler viktige opplysninger i saken din. Ta kontakt
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
        {dokumentasjonSomSkalSendesAvDeg.map((dokumentasjonskrav: Dokumentasjonskrav) => (
          <Box.New padding="space-16" background="sunken" borderRadius="large">
            <FilOpplasting
              dokumentasjonskrav={dokumentasjonskrav}
              dokumentkravFiler={dokumentkravFiler}
              setDokumentkravFiler={setDokumentkravFiler}
              setDokumentasjonskravIdSomSkalLagres={setDokumentasjonskravIdSomSkalLagres}
              setAntallFilerMedFeil={setAntallFilerMedValideringsfeil}
              setIngenFilerErLastetOppForDokumentkravet={setIngenFilerErLastetOppForDokumentkravet}
            />
            {visHarValideringsfeilFeilmelding && (
              <VStack gap="4" className="mt-8">
                <ErrorMessage>
                  Du må rette feilen{antallFilerMedValideringsfeil > 1 ? "e" : ""} over før
                  dokumentasjon kan sendes inn.
                </ErrorMessage>
              </VStack>
            )}
            {visIngenFilerErLastetOppFeilmelding && (
              <VStack gap="4" className="mt-8">
                <ErrorMessage>
                  Du må laste opp minst en fil før dokumentasjonen kan sendes inn.
                </ErrorMessage>
              </VStack>
            )}
          </Box.New>
        ))}
      </VStack>
    </div>
  );
}
