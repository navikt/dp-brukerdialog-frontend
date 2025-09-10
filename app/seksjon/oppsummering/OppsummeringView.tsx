import { Alert, BodyLong, VStack } from "@navikt/ds-react";
import DinSituasjonOppsummering from "~/seksjon/din-situasjon/oppsummering/DinSituasjonOppsummering";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.oppsummering";

export default function OppsummeringView() {
  const loaderData = useLoaderData<typeof loader>();

  if (loaderData === undefined) {
    return <></>;
  }
  console.log("typeof loaderData", Array.isArray(loaderData));
  console.log("loaderData", loaderData);
  let dinSituasjonOppsumeringData = loaderData.find(
    (seksjon) => seksjon.seksjonId === "din-situasjon"
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
        </VStack>
      </VStack>
    </div>
  );
}
