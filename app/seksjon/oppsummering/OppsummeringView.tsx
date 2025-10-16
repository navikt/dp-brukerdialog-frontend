import { Alert, BodyLong, Button, HStack, VStack } from "@navikt/ds-react";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.oppsummering";
import { stegerISøknaden } from "~/routes/$soknadId";
import OppsummeringSeksjon from "~/seksjon/oppsummering/OppsummeringSeksjon";

export default function OppsummeringView() {
  const loaderData = useLoaderData<typeof loader>();
  if (!loaderData) {
    return null;
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
          </BodyLong>
          <BodyLong>
            Når du har sendt inn søknaden kommer du til en kvitteringsside med informasjon om veien
            videre. Der kan du også ettersende dokumentasjon som mangler.
          </BodyLong>
          <h2>Dine svar</h2>
          {stegerISøknaden.map((seksjon) => {
            const seksjonsData = loaderData.find((s) => s.seksjonId === seksjon.path);
            if (!seksjonsData) return null;
            return (
              <OppsummeringSeksjon
                seksjonsId={seksjon.path}
                seksjonsUrl={seksjonsData.seksjonsUrl}
                seksjonsData={seksjonsData.data}
              />
            );
          })}
          <HStack justify="end">
            <form method="POST">
              <Button>Send søknad</Button>
            </form>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
