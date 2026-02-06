import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, ErrorMessage, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { z } from "zod";
import { Komponent } from "~/components/Komponent";
import { SistOppdatert } from "~/components/SistOppdatert";
import {
  dokumentasjonKomponenter,
  DokumentasjonSvar,
} from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import { useParams } from "react-router";
import invariant from "tiny-invariant";
import { SøknadFooter } from "~/components/SøknadFooter";

export function DokumentasjonView() {
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

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
      <VStack gap="6">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>
        <VStack gap="6">
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

        {!lagrer && harTekniskFeil && (
          <ErrorMessage>
            Det har oppstått en teknisk feil. Vi klarte ikke å sende inn dokumentasjonen. Prøv nytt.
          </ErrorMessage>
        )}

        <VStack className="seksjon-navigasjon" gap="4">
          <SistOppdatert />
          <HStack gap="4">
            <Button
              variant="secondary"
              type="button"
              icon={<ArrowLeftIcon aria-hidden />}
              disabled={lagrer}
              onClick={() => bundleOgLagreDokumentasjonskrav(true)}
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
          søknadId={soknadId}
          onFortsettSenere={() => bundleOgLagreDokumentasjonskrav(true)}
        />
      </VStack>
    </div>
  );
}
