import { BodyLong, Button, Heading, Radio, RadioGroup, ReadMore, Tag } from "@navikt/ds-react";
import type { MetaFunction } from "@remix-run/node";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
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

        <div className="card">
          <Tag variant="neutral-filled">Hentet fra Skatteetaten</Tag>
          <Heading size="medium" level={"2"}>
            Inntekt
          </Heading>
          <BodyLong spacing>
            Inntekt siste 12 måneder fra 1.januar 2023 til 1.januar 2024 <br />
            <strong>112 972 kroner</strong>
          </BodyLong>
          <BodyLong spacing>
            Inntekt siste 12 måneder fra 1.januar 2023 til 1.januar 2024 <br />
            <strong>112 972 kroner</strong>.
          </BodyLong>

          <hr />

          <ReadMore header="Hvilke inntekter gir rett til dagpenger?">
            Med helsemessige begrensninger mener vi funksjonshemming, sykdom, allergier som hindrer
            deg i arbeidet eller andre årsaker som må tas hensyn til når du skal finne nytt arbeid.
            Du må oppgi hva som gjelder for deg, og dokumentere de helsemessige årsakene du viser
            til.
          </ReadMore>
        </div>

        <div className="card">
          <form>
            <RadioGroup legend="Stemmer den samlede inntekten?">
              <Radio value="true">Ja</Radio>
              <Radio value="false">Nei</Radio>
            </RadioGroup>
          </form>

          <ReadMore header="Hva gjør du hvis inntekten din ikke stemmer?">
            Med helsemessige begrensninger mener vi funksjonshemming, sykdom, allergier som hindrer
            deg i arbeidet eller andre årsaker som må tas hensyn til når du skal finne nytt arbeid.
            Du må oppgi hva som gjelder for deg, og dokumentere de helsemessige årsakene du viser
            til.
          </ReadMore>
        </div>

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
