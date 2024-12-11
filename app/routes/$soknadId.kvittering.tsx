import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { MetaFunction } from "@remix-run/node";
import { ExternalLink } from "~/components/ExternalLink";

export const meta: MetaFunction = () => {
  return [
    { title: "Brukerdialog - Din inntekt kvittering" },
    { name: "description", content: "Brukerdialog - Din inntekt kvittering" },
  ];
};

export default function DinInntektIndex() {
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
        Du svarte at inntekten din ikke stemmer.
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
