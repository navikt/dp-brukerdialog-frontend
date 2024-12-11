import { PlantIcon } from "@navikt/aksel-icons";
import { BodyLong, ExpansionCard, Heading, HStack } from "@navikt/ds-react";
import type { MetaFunction } from "@remix-run/node";
import { InntektSkjema } from "~/components/inntekt-skjema/InntektSkjema";
import { Inntekt } from "~/components/inntekt/Inntekt";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";

export const meta: MetaFunction = () => {
  return [{ title: "Brukerdialog" }, { name: "description", content: "Brukerdialog" }];
};

export default function Index() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="brukerdialog">
        <SoknadHeader />

        <Heading size="large" level={"2"}>
          Om inntekt
        </Heading>

        <BodyLong spacing>
          Vi trenger at du sjekker innteksopplysningene vi har hentet om deg.
        </BodyLong>

        <Inntekt />
        <InntektSkjema />
      </div>
    </main>
  );
}
