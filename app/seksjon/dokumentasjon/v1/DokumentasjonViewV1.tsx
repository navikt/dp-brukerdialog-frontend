import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { FormScope } from "@rvf/react-router";
import { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useTranslation } from "react-i18next";
import { Komponent } from "~/components/Komponent";
import { ForklarendeTekst, HeadingTekst, KomponentType } from "~/components/Komponent.types";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SistOppdatert } from "~/components/SistOppdatert";
import {
  lagDokumentasjonKomponenter,
  lagDokumentasjonskravKomponenter,
} from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.komponenter";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/v1/DokumentasjonskravKomponent";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { Dokumentasjonskrav } from "../dokumentasjon.types";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import { DokumentasjonskravInnhold } from "./DokumentasjonskravInnhold";

export function DokumentasjonViewV1() {
  const { t } = useTranslation("dokumentasjon");

  const dokumentasjonKomponenter = useMemo(() => lagDokumentasjonKomponenter(t), [t]);

  const dokumentasjonskravKomponenter = useMemo(() => lagDokumentasjonskravKomponenter(t), [t]);

  const {
    dokumentasjonskrav,
    lagrer,
    harTekniskFeil,
    setValideringsTeller,
    setPdfGrunnlag,
    bundleOgLagreDokumentasjonskrav,
  } = useDokumentasjonskravContext();

  function lagreSvar() {
    setValideringsTeller((prev) => prev + 1);

    const seksjonsBeskrivelsePdfGrunnlag = lagSeksjonPayload(dokumentasjonKomponenter, {});
    const dokumentasjonskravPdfGrunnlag = dokumentasjonskrav
      .map((krav) => {
        return genererPdfGrunnlag(krav);
      })
      .flat();

    const pdfGrunnlag = {
      navn: t("side.overskrift"),
      spørsmål: [...seksjonsBeskrivelsePdfGrunnlag, ...dokumentasjonskravPdfGrunnlag],
    };

    setPdfGrunnlag(JSON.stringify(pdfGrunnlag));
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
      dokumentasjonskrav.skjemaSvar ?? {}
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
      <title>{t("side.tittel")}</title>
      <VStack gap="space-24">
        <Heading size="medium" level="2">
          {t("side.overskrift")}
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
            tittel={t("tekniskFeil.tittel")}
            beskrivelse={t("tekniskFeil.beskrivelse")}
          />
        )}

        <VStack className="seksjon-navigasjon" gap="space-16">
          <SistOppdatert />
          <HStack gap="space-16">
            <Button
              variant="secondary"
              type="button"
              icon={<ArrowLeftIcon aria-hidden />}
              disabled={lagrer}
              onClick={() => bundleOgLagreDokumentasjonskrav(Seksjonshandling.tilbakenavigering)}
            >
              {t("navigasjon.forrigeSteg")}
            </Button>
            <Button
              variant="primary"
              type="button"
              iconPosition="right"
              icon={<ArrowRightIcon aria-hidden />}
              onClick={() => lagreSvar()}
              disabled={lagrer}
            >
              {t("navigasjon.tilOppsummering")}
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
