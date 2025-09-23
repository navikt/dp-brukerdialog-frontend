import { Alert, BodyLong, VStack } from "@navikt/ds-react";
import DinSituasjonOppsummering from "~/seksjon/din-situasjon/oppsummering/DinSituasjonOppsummering";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.oppsummering";
import BostedslandOppsummering from "~/seksjon/bostedsland/oppsummering/BostedslandOppsummering";
import BarnetilleggOppsummering from "~/seksjon/barnetillegg/oppsummering/BarnetilleggOppsummering";
import VernepliktOppsummering from "~/seksjon/verneplikt/oppsummering/VernepliktOppsummering";
import UtdanningOppsummering from "~/seksjon/utdanning/oppsummering/UtdanningOppsummering";
import ReellArbeidssøkerOppsummering from "~/seksjon/reell-arbeidssøker/oppsummering/ReellArbeidssøkerOppsummering";
import TilleggOpplysningerOppsummering from "~/seksjon/tilleggsopplysninger/oppsummering/TilleggOpplysningerOppsummering";
import PersonaliaOppsummering from "~/seksjon/personalia/oppsummering/PersonaliaOppsummering";
import EgenNæringOppsummering from "~/seksjon/egen-næring/oppsummering/EgenNæringOppsummering";
import AnnenPengestøtteOppsummering from "~/seksjon/annen-pengestøtte/oppsummering/AnnenPengestøtteOppsummering";
import { stegerISøknaden } from "~/routes/$soknadId";
import ArbeidsforholdOppsummering from "~/seksjon/arbeidsforhold/oppsummering/ArbeidsforholdOppsummering";

export default function OppsummeringView() {
  const loaderData = useLoaderData<typeof loader>();

  if (!loaderData) {
    return <></>;
  }

  function renderOppsummeringsSeksjon(
    seksjonsId: string,
    seksjonsUrl: string,
    seksjonsData: string
  ) {
    if (!seksjonsData) return <></>;
    switch (seksjonsId) {
      case "din-situasjon":
        return <DinSituasjonOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "personalia":
        return <PersonaliaOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "bostedsland":
        return <BostedslandOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "arbeidsforhold":
        return <ArbeidsforholdOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "annen-pengestotte":
        return (
          <AnnenPengestøtteOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />
        );
      case "egen-naring":
        return <EgenNæringOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "verneplikt":
        return <VernepliktOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "utdanning":
        return <UtdanningOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "barnetillegg":
        return <BarnetilleggOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />;
      case "reell-arbeidsoker":
        return (
          <ReellArbeidssøkerOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />
        );
      case "tilleggsopplysninger":
        return (
          <TilleggOpplysningerOppsummering seksjonsData={seksjonsData} seksjonsUrl={seksjonsUrl} />
        );
      // Dokumentasjon
      default:
        return <></>;
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
            if (!seksjonsData) return <></>;
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
