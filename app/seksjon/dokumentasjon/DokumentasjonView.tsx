import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { FormScope } from "@rvf/react-router";
import { Komponent } from "~/components/Komponent";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SistOppdatert } from "~/components/SistOppdatert";
import { SøknadFooter } from "~/components/SøknadFooter";
import { dokumentasjonKomponenter } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";

export function DokumentasjonView() {
  const seksjonnavn = "Dokumentasjon";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;

  const {
    dokumentasjonskrav,
    lagrer,
    harTekniskFeil,
    setValideringsTeller,
    bundleOgLagreDokumentasjonskrav,
  } = useDokumentasjonskravContext();

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="6">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>
        {dokumentasjonKomponenter.map((komponent) => {
          return <Komponent key={komponent.id} props={komponent} />;
        })}

        {dokumentasjonskrav.map((dokumentasjonskrav) => (
          <DokumentasjonskravKomponent
            key={dokumentasjonskrav.id}
            dokumentasjonskrav={dokumentasjonskrav}
          />
        ))}

        {!lagrer && harTekniskFeil && (
          <SeksjonTekniskFeil
            tittel="Det har oppstått en teknisk feil"
            beskrivelse="Vi klarte ikke å sende inn dokumentasjonen. Prøv nytt"
          />
        )}

        <VStack className="seksjon-navigasjon" gap="4">
          <SistOppdatert />
          <HStack gap="4">
            <Button
              variant="secondary"
              type="button"
              icon={<ArrowLeftIcon aria-hidden />}
              disabled={lagrer}
              onClick={() => bundleOgLagreDokumentasjonskrav(Seksjonshandling.tilbakenavigering)}
            >
              Forrige steg
            </Button>
            <Button
              variant="primary"
              type="button"
              iconPosition="right"
              icon={<ArrowRightIcon aria-hidden />}
              onClick={() => setValideringsTeller((prev) => prev + 1)}
              disabled={lagrer}
            >
              Til oppsummering
            </Button>
          </HStack>
        </VStack>

        <SøknadFooter
          onFortsettSenere={() => bundleOgLagreDokumentasjonskrav(Seksjonshandling.fortsettSenere)}
        />
      </VStack>
    </div>
  );
}
