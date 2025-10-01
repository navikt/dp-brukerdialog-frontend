import DinSituasjonOppsummeringV1 from "~/seksjon/din-situasjon/v1/oppsummering/DinSituasjonOppsummeringV1";
import PersonaliaOppsummering from "~/seksjon/personalia/v1/oppsummering/PersonaliaOppsummering";
import BostedslandOppsummeringV1 from "~/seksjon/bostedsland/v1/oppsummering/BostedslandOppsummeringV1";
import ArbeidsforholdOppsummeringV1 from "~/seksjon/arbeidsforhold/v1/oppsummering/ArbeidsforholdOppsummeringV1";
import AnnenPengestøtteOppsummeringV1 from "~/seksjon/annen-pengestøtte/v1/oppsummering/AnnenPengestøtteOppsummeringV1";
import EgenNæringOppsummeringV1 from "~/seksjon/egen-næring/v1/oppsummering/EgenNæringOppsummeringV1";
import VernepliktOppsummeringV1 from "~/seksjon/verneplikt/v1/oppsummering/VernepliktOppsummeringV1";
import UtdanningOppsummeringV1 from "~/seksjon/utdanning/v1/oppsummering/UtdanningOppsummeringV1";
import BarnetilleggOppsummeringV1 from "~/seksjon/barnetillegg/v1/oppsummering/BarnetilleggOppsummeringV1";
import ReellArbeidssøkerOppsummeringV1 from "~/seksjon/reell-arbeidssøker/v1/oppsummering/ReellArbeidssøkerOppsummeringV1";
import TilleggsopplysningerOppsummeringV1 from "~/seksjon/tilleggsopplysninger/v1/oppsummering/TilleggsopplysningerOppsummeringV1";

type RenderSeksjonProps = {
  seksjonsId: string;
  seksjonsUrl: string;
  seksjonsData: string;
};

export default function OppsummeringSeksjon({
  seksjonsId,
  seksjonsUrl,
  seksjonsData,
}: RenderSeksjonProps) {
  const seksjonSvarene = JSON.parse(seksjonsData);

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
            <TilleggsopplysningerOppsummeringV1
              seksjonSvarene={seksjonSvarene.seksjon}
              seksjonsUrl={seksjonsUrl}
            />
          );

        default:
          return (
            <TilleggsopplysningerOppsummeringV1
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
