import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import type { MetaFunction } from "@remix-run/node";
import { InntektSkjema } from "~/components/inntekt-skjema/InntektSkjema";
import { Inntekt } from "~/components/inntekt/Inntekt";

export const meta: MetaFunction = () => {
  return [
    { title: "Brukerdialog - Din inntekt" },
    { name: "description", content: "Brukerdialog - Din inntekt" },
  ];
};

export default function Index() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="brukerdialog">
        <Heading size="large" level={"1"} id="header-icon">
          Din inntekt
        </Heading>

        <BodyLong spacing className="mt-4">
          Vi trenger at du sjekker innteksopplysningene vi har hentet om deg.
        </BodyLong>

        <Inntekt />
        <InntektSkjema />
      </div>
    </main>
  );
}
