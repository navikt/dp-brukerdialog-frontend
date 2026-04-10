import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { FormScope } from "@rvf/react-router";
import { renderToStaticMarkup } from "react-dom/server";
import { Komponent } from "~/components/Komponent";
import { ForklarendeTekst, HeadingTekst, KomponentType } from "~/components/Komponent.types";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SistOppdatert } from "~/components/SistOppdatert";
import {
  dokumentasjonKomponenter,
  dokumentasjonskravKomponenter,
} from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.komponenter";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/v1/DokumentasjonskravKomponent";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { Dokumentasjonskrav } from "../dokumentasjon.types";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import { DokumentasjonskravInnhold } from "./DokumentasjonskravInnhold";

export function DokumentasjonViewV1() {
  const seksjonnavn = "Dokumentasjon";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;

  const {
    dokumentasjonskrav,
    lagrer,
    harTekniskFeil,
    setValideringsTeller,
    setPdfGrunnlag,
    bundleOgLagreDokumentasjonskrav,
  } = useDokumentasjonskravContext();

  function lagreSvar() {
    const seksjonsBeskrivelsePdfGrunnlag = lagSeksjonPayload(dokumentasjonKomponenter, {});
    const dokumentasjonskravPdfGrunnlag = dokumentasjonskrav
      .map((krav) => {
        return genererPdfGrunnlag(krav);
      })
      .flat();

    const pdfGrunnlag = {
      navn: seksjonnavn,
      spørsmål: [...seksjonsBeskrivelsePdfGrunnlag, ...dokumentasjonskravPdfGrunnlag],
    };

    setPdfGrunnlag(JSON.stringify(pdfGrunnlag));
    setValideringsTeller((prev) => prev + 1);
  }

  function genererPdfGrunnlag(dokumentasjonskrav: Dokumentasjonskrav): KomponentType[] {
    const heading: HeadingTekst = {
      id: "tittel",
      type: "headingTekst",
      nivå: "3",
      størrelse: "small",
      label: dokumentasjonskrav.tittel,
    };

    const beskrivelse: ForklarendeTekst = {
      id: "beskrivelse",
      type: "forklarendeTekst",
      description: renderToStaticMarkup(
        <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
      ),
    };

    const skjemaSvar = lagSeksjonPayload(
      dokumentasjonskravKomponenter,
      dokumentasjonskrav.skjemaSvar
    );

    const filer: KomponentType[] =
      dokumentasjonskrav.filer?.map((fil) => {
        return {
          id: fil.id,
          type: "forklarendeTekst",
          description: fil.filnavn,
        };
      }) || [];

    return [heading, beskrivelse, ...skjemaSvar, ...filer];
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
