import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DokumentasjonskravKomponent } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import {
  dokumentasjonKomponenter,
  DokumentasjonSvar,
} from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { Komponent } from "~/components/Komponent";
import { useForm } from "@rvf/react-router";
import { z } from "zod";

const NESTE_SEKSJON_ID = "oppsummering";
const FORRIGE_SEKSJON_ID = "tilleggsopplysninger";

export function DokumentasjonView() {
  const seksjonnavn = "Dokumentasjon";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const navigate = useNavigate();
  const {
    dokumentasjonskrav,
    harTekniskFeil,
    harValideringsfeil,
    ingenFilerErLastetOpp,
    dokumentasjonskravIdSomSkalLagres,
    setDokumentasjonskravIdSomSkalLagres,
  } = useDokumentasjonskravContext();

  const [lagrerOgNavigererTilForrigeSeksjon, setLagrerOgNavigererTilForrigeSeksjon] =
    useState(false);
  const [lagrerOgNavigererTilNesteSeksjon, setLagrerOgNavigererTilNesteSeksjon] = useState(false);
  const [index, setIndex] = useState(0);

  async function lagreDokumentasjonskraveneOgNavigerTilForrigeSeksjon() {
    setLagrerOgNavigererTilForrigeSeksjon(true);
    lagreDokumentasjonskravene();
  }

  async function lagreDokumentasjonskraveneOgNavigerTilNesteSeksjon() {
    setLagrerOgNavigererTilNesteSeksjon(true);
    lagreDokumentasjonskravene();
  }

  const lagreDokumentasjonskravene = () => {
    setIndex(0);
    if (dokumentasjonskrav.length > 0) {
      setDokumentasjonskravIdSomSkalLagres(dokumentasjonskrav[0].id);
    }
  };

  useEffect(() => {
    if (
      (!lagrerOgNavigererTilNesteSeksjon && !lagrerOgNavigererTilForrigeSeksjon) ||
      dokumentasjonskravIdSomSkalLagres !== null
    ) {
      return;
    }

    const nesteIndex = index + 1;

    if (nesteIndex < dokumentasjonskrav.length) {
      setIndex(nesteIndex);
      setDokumentasjonskravIdSomSkalLagres(dokumentasjonskrav[nesteIndex].id);
    } else {
      const alleDokumentasjonskravBesvart = dokumentasjonskrav.every(
        (krav) => krav.svar !== undefined
      );

      if (
        alleDokumentasjonskravBesvart &&
        !harTekniskFeil &&
        !harValideringsfeil &&
        !ingenFilerErLastetOpp
      ) {
        if (lagrerOgNavigererTilForrigeSeksjon) {
          navigate(`../${FORRIGE_SEKSJON_ID}`);
        } else {
          navigate(`../${NESTE_SEKSJON_ID}`);
        }
      }
      setLagrerOgNavigererTilForrigeSeksjon(false);
      setLagrerOgNavigererTilNesteSeksjon(false);
    }
  }, [
    dokumentasjonskravIdSomSkalLagres,
    lagrerOgNavigererTilForrigeSeksjon,
    lagrerOgNavigererTilNesteSeksjon,
    index,
    dokumentasjonskrav,
    harTekniskFeil,
    harValideringsfeil,
    ingenFilerErLastetOpp,
  ]);

  const form = useForm({
    schema: z.object({}),
    defaultValues: {},
  });

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="20">
        <VStack gap="6">
          <Heading size="medium" level="2">
            {seksjonnavn}
          </Heading>
          <VStack gap="8">
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

      {harTekniskFeil && (
        <Alert variant="error" className="mt-8">
          Teknisk feil har oppstått. Vennligst prøv på nytt.
        </Alert>
      )}

      <HStack gap="4" className="mt-14">
        <Button
          variant="secondary"
          type="button"
          loading={lagrerOgNavigererTilForrigeSeksjon}
          icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={lagreDokumentasjonskraveneOgNavigerTilForrigeSeksjon}
          disabled={lagrerOgNavigererTilForrigeSeksjon || lagrerOgNavigererTilNesteSeksjon}
        >
          Forrige steg
        </Button>
        <Button
          variant="primary"
          type="button"
          iconPosition="right"
          loading={lagrerOgNavigererTilNesteSeksjon}
          icon={<ArrowRightIcon />}
          onClick={lagreDokumentasjonskraveneOgNavigerTilNesteSeksjon}
          disabled={lagrerOgNavigererTilForrigeSeksjon || lagrerOgNavigererTilNesteSeksjon}
        >
          Til oppsummering
        </Button>
      </HStack>
    </div>
  );
}
