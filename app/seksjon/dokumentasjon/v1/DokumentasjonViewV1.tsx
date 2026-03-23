import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { FormScope } from "@rvf/react-router";
import { Komponent } from "~/components/Komponent";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SistOppdatert } from "~/components/SistOppdatert";
import { dokumentasjonKomponenter } from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.komponenter";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/v1/DokumentasjonskravKomponent";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function DokumentasjonViewV1() {
  const seksjonnavn = "Dokumentasjon";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;

  const {
    dokumentasjonskrav,
    lagrer,
    harTekniskFeil,
    setValideringsTeller,
    bundleOgLagreDokumentasjonskrav,
  } = useDokumentasjonskravContext();

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [...lagSeksjonPayload(dokumentasjonKomponenter, {})],
    };

    return JSON.stringify(pdfPayload);
  }

  function lagreSvar() {
    // Todo: lagre pdfgrunnlag i context
    const pdfGrunnlag = genererPdfGrunnlag();

    // Todo: Bygg dokumentasjonskrav komponent som egen type
    // Avklare med backend slik at de klare å bygge pdf riktig
    // Dokumentasjonskrav er sammensatt av flere komponenter,

    // console.log(pdfGrunnlag);
    // dokumentasjonskrav?.map((krav) => {
    //   console.log(krav?.pdfGrunnlag);
    // });
    setValideringsTeller((prev) => prev + 1);
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="6">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>
        {dokumentasjonKomponenter.map((komponent) => {
          return (
            <Komponent
              key={komponent.id}
              props={komponent}
              formScope={{} as unknown as FormScope<string | string[] | undefined>}
            />
          );
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
              onClick={() => lagreSvar()}
              disabled={lagrer}
            >
              Til oppsummering
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
