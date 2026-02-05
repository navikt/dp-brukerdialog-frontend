import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, ErrorMessage, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { z } from "zod";
import { Komponent } from "~/components/Komponent";
import {
  dokumentasjonKomponenter,
  DokumentasjonSvar,
} from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
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

  const form = useForm({
    schema: z.object({}),
    defaultValues: {},
  });

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack>
        <VStack gap="4">
          <Heading size="medium" level="2">
            {seksjonnavn}
          </Heading>
          <VStack gap="2">
            {dokumentasjonKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formScope={form.scope(komponent.id as keyof DokumentasjonSvar)}
                />
              );
            })}
            {dokumentasjonskrav.map((dokumentasjonskrav) => (
              <DokumentasjonskravKomponent
                key={dokumentasjonskrav.id}
                dokumentasjonskrav={dokumentasjonskrav}
              />
            ))}
          </VStack>
        </VStack>
      </VStack>

      {!lagrer && harTekniskFeil && (
        <ErrorMessage className="mt-4">
          Det har oppstått en teknisk feil. Vi klarte ikke å sende inn dokumentasjonen. Prøv nytt.
        </ErrorMessage>
      )}

      <HStack gap="4" className="mt-14">
        <Button
          variant="secondary"
          type="button"
          icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
          disabled={lagrer}
          onClick={() => bundleOgLagreDokumentasjonskrav(true)}
        >
          Forrige steg
        </Button>
        <Button
          variant="primary"
          type="button"
          iconPosition="right"
          icon={<ArrowRightIcon />}
          onClick={() => setValideringsTeller((prev) => prev + 1)}
          disabled={lagrer}
        >
          Til oppsummering
        </Button>
      </HStack>
    </div>
  );
}
