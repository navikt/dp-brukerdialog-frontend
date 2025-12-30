import { Box, ErrorMessage, Heading, HStack, Tag, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { useDokumentasjonskravContext } from "../dokumentasjon/dokumentasjonskrav.context";
import dokumentasjonskravKomponenter, {
  DokumentasjonskravSvar,
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSenderSenere,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
  hvaErGrunnenTilAtDuIkkeSenderDokumentet,
  hvaErGrunnenTilAtDuSenderDokumentetSenere,
  nårSendteDuDokumentet,
  velgHvaDuVilGjøre,
} from "../dokumentasjon/dokumentasjonskrav.komponenter";
import { dokumentasjonskravSchema } from "../dokumentasjon/dokumentasjonskrav.schema";
import { DokumentkravFil, FilOpplasting } from "../dokumentasjon/FilOpplasting";
import { Bundle, Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";

interface DokumentasjonskravProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function EttersendingDokumentOpplasting({ dokumentasjonskrav }: DokumentasjonskravProps) {
  const { soknadId } = useParams();
  const [dokumentkravFiler, setDokumentkravFiler] = useState<DokumentkravFil[]>(
    dokumentasjonskrav.filer ?? []
  );
  const [antallFilerMedValideringsfeil, setAntallFilerMedValideringsfeil] = useState(0);
  const [visHarValideringsfeilFeilmelding, setVisHarValideringsfeilFeilmelding] = useState(false);
  const [ingenFilerErLastetOppForDokumentkravet, setIngenFilerErLastetOppForDokumentkravet] =
    useState(false);
  const [visIngenFilerErLastetOppFeilmelding, setVisIngenFilerErLastetOppFeilmelding] =
    useState(false);

  const {
    dokumentasjonskrav: alleDokumentasjonskrav,
    setHarTekniskFeil,
    setHarValideringsfeil,
    setIngenFilerErLastetOpp,
    oppdaterDokumentasjonskrav,
    dokumentasjonskravIdSomSkalLagres,
    setDokumentasjonskravIdSomSkalLagres,
  } = useDokumentasjonskravContext();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: dokumentasjonskravSchema,
    defaultValues: {
      [velgHvaDuVilGjøre]: dokumentasjonskrav.svar,
      [hvaErGrunnenTilAtDuSenderDokumentetSenere]:
        dokumentasjonskrav.svar === dokumentkravSvarSenderSenere
          ? dokumentasjonskrav.begrunnelse
          : undefined,
      [nårSendteDuDokumentet]:
        dokumentasjonskrav.svar === dokumentkravSvarSendtTidligere
          ? dokumentasjonskrav.begrunnelse
          : undefined,
      [hvaErGrunnenTilAtDuIkkeSenderDokumentet]:
        dokumentasjonskrav.svar === dokumentkravSvarSenderIkke
          ? dokumentasjonskrav.begrunnelse
          : undefined,
    },
    onInvalidSubmit() {
      setHarValideringsfeil(true);
      setDokumentasjonskravIdSomSkalLagres(null);
    },
    handleSubmit: async (dokumentasjonskravskjema) => {
      setHarTekniskFeil(false);
      let bundle: Bundle | null = null;

      if (
        dokumentasjonskravskjema[velgHvaDuVilGjøre] === dokumentkravSvarSendNå &&
        dokumentkravFiler.length > 0
      ) {
        bundle = await bundleFiler();
      }

      const begrunnelse =
        dokumentasjonskravskjema[nårSendteDuDokumentet] ||
        dokumentasjonskravskjema[hvaErGrunnenTilAtDuIkkeSenderDokumentet] ||
        dokumentasjonskravskjema[hvaErGrunnenTilAtDuSenderDokumentetSenere] ||
        undefined;

      const dokumentasjonskravsvar = {
        ...dokumentasjonskrav,
        svar: dokumentasjonskravskjema[velgHvaDuVilGjøre],
        begrunnelse: begrunnelse,
        filer:
          dokumentasjonskravskjema[velgHvaDuVilGjøre] === dokumentkravSvarSendNå &&
          dokumentkravFiler.length > 0
            ? dokumentkravFiler
            : null,
        bundle: bundle,
      };

      await lagreDokumentasjonskravsvar(dokumentasjonskravsvar);
    },
  });

  useEffect(() => {
    if (dokumentasjonskravIdSomSkalLagres === dokumentasjonskrav.id) {
      if (
        form.value(velgHvaDuVilGjøre) === dokumentkravSvarSendNå &&
        antallFilerMedValideringsfeil > 0
      ) {
        setDokumentasjonskravIdSomSkalLagres(null);
        setHarValideringsfeil(true);
        setVisHarValideringsfeilFeilmelding(true);
      } else if (
        form.value(velgHvaDuVilGjøre) === dokumentkravSvarSendNå &&
        ingenFilerErLastetOppForDokumentkravet
      ) {
        setDokumentasjonskravIdSomSkalLagres(null);
        setIngenFilerErLastetOpp(true);
        setVisIngenFilerErLastetOppFeilmelding(true);
      } else {
        form.submit();
      }
    }
  }, [dokumentasjonskravIdSomSkalLagres, dokumentasjonskrav.id]);

  useEffect(() => {
    if (antallFilerMedValideringsfeil === 0) {
      setHarValideringsfeil(false);
      setVisHarValideringsfeilFeilmelding(false);
    }
  }, [antallFilerMedValideringsfeil]);

  useEffect(() => {
    if (!ingenFilerErLastetOppForDokumentkravet) {
      setIngenFilerErLastetOpp(false);
      setVisIngenFilerErLastetOppFeilmelding(false);
    }
  }, [ingenFilerErLastetOppForDokumentkravet]);

  useEffect(() => {
    if (form.value(velgHvaDuVilGjøre) !== dokumentkravSvarSendNå) {
      setDokumentkravFiler([]);
    }
  }, [form]);

  useNullstillSkjulteFelter<DokumentasjonskravSvar>(form, dokumentasjonskravKomponenter);

  async function bundleFiler(): Promise<Bundle | null> {
    try {
      const formData = new FormData();
      formData.append("dokumentasjonskravFiler", JSON.stringify(dokumentkravFiler));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.id}/bundle-filer`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        return await response.json();
      }

      setHarTekniskFeil(true);
      return null;
    } catch (error) {
      console.error("Feil ved bundling av filer:", error);
      setHarTekniskFeil(true);
      return null;
    }
  }

  async function lagreDokumentasjonskravsvar(oppdatertDokumentasjonskrav: Dokumentasjonskrav) {
    try {
      const oppdatertDokumentasjonskravListe = alleDokumentasjonskrav
        .filter(
          (etDokumentasjonskrav) =>
            etDokumentasjonskrav.seksjonId === oppdatertDokumentasjonskrav.seksjonId
        )
        .map((etDokumentasjonskrav) =>
          etDokumentasjonskrav.id === oppdatertDokumentasjonskrav.id
            ? oppdatertDokumentasjonskrav
            : etDokumentasjonskrav
        );

      const formData = new FormData();
      formData.append("dokumentasjonskrav", JSON.stringify(oppdatertDokumentasjonskravListe));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.seksjonId}/${oppdatertDokumentasjonskrav.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        oppdaterDokumentasjonskrav(oppdatertDokumentasjonskrav);
        setDokumentasjonskravIdSomSkalLagres(null);
      } else {
        console.error("Feil ved lagring av dokumentasjonskrav:", oppdatertDokumentasjonskrav.id);
        setHarTekniskFeil(true);
        setDokumentasjonskravIdSomSkalLagres(null);
      }
    } catch (error) {
      console.error("Feil ved lagring av dokumentasjonskrav:", error);
      setHarTekniskFeil(true);
      setDokumentasjonskravIdSomSkalLagres(null);
    }
  }

  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large" className="mt-4">
      <VStack gap="8">
        <Form {...form.getFormProps()}>
          <FilOpplasting
            dokumentasjonskrav={dokumentasjonskrav}
            dokumentkravFiler={dokumentkravFiler}
            setDokumentkravFiler={setDokumentkravFiler}
            setDokumentasjonskravIdSomSkalLagres={setDokumentasjonskravIdSomSkalLagres}
            setAntallFilerMedFeil={setAntallFilerMedValideringsfeil}
            setIngenFilerErLastetOppForDokumentkravet={setIngenFilerErLastetOppForDokumentkravet}
            erEttersending={true}
          />
          {visHarValideringsfeilFeilmelding && (
            <VStack gap="4" className="mt-8">
              <ErrorMessage>
                Du må rette feilen{antallFilerMedValideringsfeil > 1 ? "e" : ""} over før
                dokumentasjon kan sendes inn.
              </ErrorMessage>
            </VStack>
          )}
          {visIngenFilerErLastetOppFeilmelding && (
            <VStack gap="4" className="mt-8">
              <ErrorMessage>
                Du må laste opp minst en fil før dokumentasjonen kan sendes inn.
              </ErrorMessage>
            </VStack>
          )}
        </Form>
      </VStack>
    </Box.New>
  );
}
