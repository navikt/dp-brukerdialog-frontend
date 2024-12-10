import { BodyLong, Button, Heading, Radio, RadioGroup, ReadMore, Tag } from "@navikt/ds-react";
import type { MetaFunction } from "@remix-run/node";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { Inntekt } from "~/components/inntekt/Inntekt";
import { InntektSkjema } from "~/components/inntekt-skjema/InntektSkjema";

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

        <div className="button-container">
          <Button variant="secondary" icon={<ArrowLeftIcon />}>
            Tilbake
          </Button>
          <Button variant="primary" icon={<ArrowRightIcon />}>
            Neste
          </Button>
        </div>
      </div>
    </main>
  );
}
