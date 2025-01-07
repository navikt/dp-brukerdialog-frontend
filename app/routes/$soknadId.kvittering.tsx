import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ExternalLink } from "~/components/ExternalLink";
import { getMinsteinntektForeleggingresultat } from "~/models/getMinsteinntektForeleggingresultat.server";
import {typedjson} from "remix-typedjson";

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

  return typedjson({ minsteinntektForeleggingresultat });
}

export default function Kvittering() {
  const { minsteinntektForeleggingresultat } = useLoaderData<typeof loader>();

  const inntektStemmer  = minsteinntektForeleggingresultat.data.bekreftet;


  if (minsteinntektForeleggingresultat.status === "error") {
    return <p>Error</p>;
  }

  function InntektStemmer() {
      return (
          <BodyLong spacing className="mt-8">
              Vi har mottatt oppgaven din om inntektsopplysninger.
              <br />
              <br />
              Vi har fått svaret ditt om at inntekten din stemmer.
              <br />
              <br />
              Du vil få svar på søknaden og beskjed når oppgaven er behandlet hos Nav.
          </BodyLong>
      )
  }

  function InntektIkkeStemmer() {
      return (
          <BodyLong spacing className="mt-8">
              Vi har mottatt oppgaven din om inntektsopplysninger.
              <br/>
              <br/>
              Vi har fått svaret ditt om at inntekten din ikke stemmer. Ta kontakt med arbeidsgiveren din for å rette
              opplysningene om inntekten.
              <br/>
              <br/>

              <Heading size="medium" level={"1"} id="header-icon" spacing className="mt-8">
                  Last opp dokumentasjon
              </Heading>
              Du kan også laste opp dokumentasjon som bekrefter at inntekten din ikke stemmer. Det kan for eksempel være
              lønnslipper eller årsoppgaven fra arbeidsgiver. Det viktigste er at arbeidsgiver retter opplysningen om
              inntekten din.

              <br/>
              <br/>
              Hvis du ikke har dokumentasjon tilgjengelig, kan du sende det senere via mine dagpenger.
          </BodyLong>
      )
  }

  return (
    <div className="brukerdialog">
    <Heading size="large" level={"1"}>
    Svar om inntekt mottatt
    </Heading>

    <BodyShort spacing>Svar på oppgave innsendt 20.05.2024 - 12:35</BodyShort>


    {inntektStemmer && InntektStemmer()}
    {!inntektStemmer && InntektIkkeStemmer()}

    <ExternalLink to="https://arbeid.ansatt.dev.nav.no/arbeid/dagpenger/mine-dagpenger-frontend" asButtonVariant={inntektStemmer ? "primary": "secondary"} className="mt-14">
    Gå til mine dagpenger
    </ExternalLink>

    {!inntektStemmer  && (
        <ExternalLink to="https://arbeid.ansatt.dev.nav.no/dagpenger/dialog/generell-innsending" asButtonVariant="primary" className="mt-14 ml-4">
        Last opp dokumentasjon
        </ExternalLink>
    )}
    </div>
  );
}
