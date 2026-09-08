import { Heading } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { SøknadIkon } from "~/components/SøknadIkon";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { lagArbeidssøkerFeilmelding, lagArbeidssøkerKomponenter } from "./arbeidssøker.komponenter";
import { Komponent } from "~/components/Komponent";

export function ArbeidssøkerView() {
  const { t } = useTranslation("arbeidssøker");
  const { arbeidssøkerStatus } = useTypedRouteLoaderData("root");
  const arbeidssøkerKomponenter = lagArbeidssøkerKomponenter(t);
  const arbeidssøkerFeilmelding = lagArbeidssøkerFeilmelding(t);

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>{t("side.tittel")}</title>
      <div className="søknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          {t("side.overskrift")}
        </Heading>
      </div>

      <div className="innhold">
        {arbeidssøkerStatus === "FEIL" && (
          <>
            {arbeidssøkerFeilmelding.map((komponent) => {
              return <Komponent key={komponent.id} props={komponent} />;
            })}
          </>
        )}

        {arbeidssøkerKomponenter.map((komponent) => {
          return <Komponent key={komponent.id} props={komponent} />;
        })}
      </div>
    </main>
  );
}
