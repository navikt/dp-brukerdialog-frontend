import { Alert, BodyLong, VStack } from "@navikt/ds-react";
import DinSituasjonOppsummeringV1 from "~/seksjon/din-situasjon/v1/oppsummering/DinSituasjonOppsummeringV1";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.oppsummering";
import BostedslandOppsummeringV1 from "~/seksjon/bostedsland/v1/oppsummering/BostedslandOppsummeringV1";
import BarnetilleggOppsummeringV1 from "~/seksjon/barnetillegg/v1/oppsummering/BarnetilleggOppsummeringV1";
import VernepliktOppsummeringV1 from "~/seksjon/verneplikt/v1/oppsummering/VernepliktOppsummeringV1";
import UtdanningOppsummeringV1 from "~/seksjon/utdanning/v1/oppsummering/UtdanningOppsummeringV1";
import ReellArbeidssøkerOppsummeringV1 from "~/seksjon/reell-arbeidssøker/v1/oppsummering/ReellArbeidssøkerOppsummeringV1";
import TilleggOpplysningerOppsummeringV1 from "~/seksjon/tilleggsopplysninger/v1/oppsummering/TilleggOpplysningerOppsummeringV1";
import PersonaliaOppsummering from "~/seksjon/personalia/v1/oppsummering/PersonaliaOppsummering";
import EgenNæringOppsummeringV1 from "~/seksjon/egen-næring/v1/oppsummering/EgenNæringOppsummeringV1";
import AnnenPengestøtteOppsummeringV1 from "~/seksjon/annen-pengestøtte/v1/oppsummering/AnnenPengestøtteOppsummeringV1";
import { stegerISøknaden } from "~/routes/$soknadId";
import ArbeidsforholdOppsummeringV1 from "~/seksjon/arbeidsforhold/oppsummering/ArbeidsforholdOppsummeringV1";
import { JSX } from "react";

export default function OppsummeringView() {
  const loaderData = useLoaderData<typeof loader>();
  if (!loaderData) {
    return null;
  }

  function renderOppsummeringsSeksjon(
    seksjonsId: string,
    seksjonsUrl: string,
    seksjonsData: string
  ) {
    const seksjonSvarene = JSON.parse(seksjonsData);

    function printVersjonsFeilmelding(seksjonsId: string, versjon: number) {
      console.error(
        `Ukjent versjon for seksjon ${seksjonsId}. Mottatt versjon: ${versjon}. 
        Prøver å vise nyeste versjon av oppsummeringsmodulen for seksjonen.`
      );
    }

    switch (seksjonsId) {
      case "din-situasjon":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <DinSituasjonOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <DinSituasjonOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }
      case "personalia":
        return <PersonaliaOppsummering seksjonSvarene={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "bostedsland":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <BostedslandOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <BostedslandOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }
      case "arbeidsforhold":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <ArbeidsforholdOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <ArbeidsforholdOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }

      case "annen-pengestotte":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <AnnenPengestøtteOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <AnnenPengestøtteOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }
      case "egen-naring":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <EgenNæringOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <EgenNæringOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }
      case "verneplikt":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <VernepliktOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <VernepliktOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }

      case "utdanning":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <UtdanningOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <UtdanningOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }

      case "barnetillegg":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <BarnetilleggOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <BarnetilleggOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }

      case "reell-arbeidssoker":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <ReellArbeidssøkerOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <ReellArbeidssøkerOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }

      case "tilleggsopplysninger":
        switch (seksjonSvarene.versjon) {
          case 1:
            return (
              <TilleggOpplysningerOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );

          default:
            printVersjonsFeilmelding(seksjonsId, seksjonSvarene.versjon);
            return (
              <TilleggOpplysningerOppsummeringV1
                seksjonSvarene={seksjonSvarene.seksjon}
                seksjonsUrl={seksjonsUrl}
              />
            );
        }

      // Dokumentasjon
      default:
        console.error(`Ukjent seksjon for: ${seksjonsUrl}`);
        return null;
    }
  }

  return (
    <div className="innhold">
      <VStack gap="20">
        <VStack gap="6">
          <Alert variant="warning" fullWidth>
            Husk å trykke på "Send søknad" nederst på siden før du avslutter
          </Alert>
          <BodyLong>
            Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre
            opplysningene.
            <br />
            <br />
            Når du har sendt inn søknaden kommer du til en kvitteringsside med informasjon om veien
            videre. Der kan du også ettersende dokumentasjon som mangler.
          </BodyLong>
          <h2>Dine svar</h2>
          {stegerISøknaden.map((seksjon) => {
            const seksjonsData = loaderData.find((s) => s.seksjonId === seksjon.path);
            if (!seksjonsData) return null;
            return renderOppsummeringsSeksjon(
              seksjon.path,
              seksjonsData.seksjonsUrl,
              seksjonsData.data
            );
          })}
        </VStack>
      </VStack>
    </div>
  );
}
