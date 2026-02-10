import DinSituasjonOppsummeringV1 from "~/seksjon/din-situasjon/v1/oppsummering/DinSituasjonOppsummeringV1";
import PersonaliaOppsummeringV1 from "~/seksjon/personalia/v1/oppsummering/PersonaliaOppsummeringV1";
import ArbeidsforholdOppsummeringV1 from "~/seksjon/arbeidsforhold/v1/oppsummering/ArbeidsforholdOppsummeringV1";
import AnnenPengestøtteOppsummeringV1 from "~/seksjon/annen-pengestøtte/v1/oppsummering/AnnenPengestøtteOppsummeringV1";
import EgenNæringOppsummeringV1 from "~/seksjon/egen-næring/v1/oppsummering/EgenNæringOppsummeringV1";
import VernepliktOppsummeringV1 from "~/seksjon/verneplikt/v1/oppsummering/VernepliktOppsummeringV1";
import UtdanningOppsummeringV1 from "~/seksjon/utdanning/v1/oppsummering/UtdanningOppsummeringV1";
import BarnetilleggOppsummeringV1 from "~/seksjon/barnetillegg/v1/oppsummering/BarnetilleggOppsummeringV1";
import ReellArbeidssøkerOppsummeringV1 from "~/seksjon/reell-arbeidssøker/v1/oppsummering/ReellArbeidssøkerOppsummeringV1";
import TilleggsopplysningerOppsummeringV1 from "~/seksjon/tilleggsopplysninger/v1/oppsummering/TilleggsopplysningerOppsummeringV1";

export type OppsummeringSeksjonsData = {
  seksjonId: string;
  versjon: number;
  seksjonsvar?: any;
};

type OppsummeringProps = {
  seksjonsId: string;
  seksjonsUrl: string;
  seksjonsData: OppsummeringSeksjonsData;
  redigerbar?: boolean;
};

export default function Oppsummering({
  seksjonsId,
  seksjonsUrl,
  seksjonsData,
  redigerbar = true,
}: OppsummeringProps) {
  switch (seksjonsId) {
    case "din-situasjon":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <DinSituasjonOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <DinSituasjonOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }
    case "personalia":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <PersonaliaOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <PersonaliaOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }
    case "arbeidsforhold":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <ArbeidsforholdOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <ArbeidsforholdOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }

    case "annen-pengestotte":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <AnnenPengestøtteOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <AnnenPengestøtteOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }
    case "egen-naring":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <EgenNæringOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <EgenNæringOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }
    case "verneplikt":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <VernepliktOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <VernepliktOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }

    case "utdanning":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <UtdanningOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <UtdanningOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }

    case "barnetillegg":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <BarnetilleggOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <BarnetilleggOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }

    case "reell-arbeidssoker":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <ReellArbeidssøkerOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
        default:
          return (
            <ReellArbeidssøkerOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }

    case "tilleggsopplysninger":
      switch (seksjonsData.versjon) {
        case 1:
          return (
            <TilleggsopplysningerOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );

        default:
          return (
            <TilleggsopplysningerOppsummeringV1
              seksjonSvarene={seksjonsData.seksjonsvar}
              seksjonsUrl={seksjonsUrl}
              redigerbar={redigerbar}
            />
          );
      }

    // Dokumentasjon
    default:
      console.error(`Ukjent seksjon for: ${seksjonsUrl}`);
      return null;
  }
}
