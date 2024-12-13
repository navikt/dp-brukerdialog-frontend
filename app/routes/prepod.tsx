import { BodyLong, Heading } from "@navikt/ds-react";
import { ExternalLink } from "~/components/ExternalLink";
import { JulIllustrasjon } from "~/components/illustrasjon/julIllustrasjon";

export default function Error() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="brukerdialog">
        <div className="preprod">
          <JulIllustrasjon aria-hidden="true" />
          <Heading level="1" size="large" spacing className="mt-8">
            Oi, du var tidlig ute!
          </Heading>
          <BodyLong spacing className="text-center">
            Vi bygger fortsatt på siden vår, så det er ikke så mye å se her enda.
            <br />
            Kom gjerne tilbake!
          </BodyLong>
          <ExternalLink
            to="https://www.nav.no/arbeid/dagpenger/mine-dagpenger"
            asButtonVariant="primary"
          >
            Gå til Mine dagpenger
          </ExternalLink>
        </div>
      </div>
    </main>
  );
}
