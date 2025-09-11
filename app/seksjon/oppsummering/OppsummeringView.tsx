import { Alert, BodyLong, VStack } from "@navikt/ds-react";
import DinSituasjonOppsummering from "~/seksjon/din-situasjon/oppsummering/DinSituasjonOppsummering";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.oppsummering";
import BostedslandOppsummering from "~/seksjon/bostedsland/oppsummering/BostedslandOppsummering";
import BarnetilleggOppsummering from "~/seksjon/barnetillegg/oppsummering/BarnetilleggOppsummering";
import VernepliktOppsummering from "~/seksjon/verneplikt/oppsummering/VernepliktOppsummering";

export default function OppsummeringView() {
  const loaderData = useLoaderData<typeof loader>();

  if (loaderData === undefined) {
    return <></>;
  }
  console.log("typeof loaderData", Array.isArray(loaderData));
  console.log("loaderData", loaderData);
  const dinSituasjonOppsumeringData = loaderData.find(
    (seksjon) => seksjon.seksjonId === "din-situasjon"
  );
  const bostedslandOppsummeringData = loaderData.find(
    (seksjon) => seksjon.seksjonId === "bostedsland"
  );

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
          <DinSituasjonOppsummering
            seksjonsData={dinSituasjonOppsumeringData ? dinSituasjonOppsumeringData.data : ""}
          />
          <BostedslandOppsummering
            seksjonsData={bostedslandOppsummeringData ? bostedslandOppsummeringData.data : ""}
          />
          <VernepliktOppsummering
            seksjonsData={
              loaderData.find((seksjon) => seksjon.seksjonId === "verneplikt")?.data || ""
            }
          />
          <BarnetilleggOppsummering
            seksjonsData={
              loaderData.find((seksjon) => seksjon.seksjonId === "barnetillegg")?.data || ""
            }
          />
        </VStack>
      </VStack>
    </div>
  );
}
