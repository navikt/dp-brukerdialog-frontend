import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ExternalLink } from "~/components/ExternalLink";
import { getMinsteinntektForeleggingresultat } from "~/models/getMinsteinntektForeleggingresultat.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Brukerdialog - Din inntekt kvittering" },
    { name: "description", content: "Brukerdialog - Din inntekt kvittering" },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.soknadId, "SøknadId mangler");

  const minsteinntektForeleggingresultat = await getMinsteinntektForeleggingresultat(
    request,
    params.soknadId
  );

  return { minsteinntektForeleggingresultat };
}

export default function Kvittering() {
  const { minsteinntektForeleggingresultat } = useLoaderData<typeof loader>();

  if (minsteinntektForeleggingresultat.status === "error") {
    return <p>Error</p>;
  }

  const inntektIkkeStemmer = !minsteinntektForeleggingresultat.data.bekreftet ? "ikke" : "";

  return (
    <div className="brukerdialog">
      <Heading size="large" level={"1"}>
        Kvittering
      </Heading>

      <Heading size="medium" level={"2"} className="mt-4">
        Oppgave mottatt
      </Heading>

      <BodyShort spacing> Søknad innsendt 30.05.2024 - 12:56 </BodyShort>

      <BodyLong spacing>
        Vi har mottatt oppgaven din om inntektsopplysninger.
        <br />
        <br />
        Du svarte at inntekten din {inntektIkkeStemmer} stemmer.
        <br />
        <br />
        Du vil få svar på søknaden og beskjed når oppgaven er behandlet hos Nav.
      </BodyLong>

      <ExternalLink to="ettersending" asButtonVariant="primary">
        Send dokumentasjon
      </ExternalLink>
    </div>
  );
}
