import { Box, Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useState } from "react";
import { Form } from "react-router";
import { FilOpplasting } from "~/components/FilOpplasting";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { Dokumentasjonskrav, DokumentasjonskravFeilType } from "./dokumentasjon.types";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
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
} from "./dokumentasjonskrav.komponenter";
import { dokumentasjonskravSchema } from "./dokumentasjonskrav.schema";
import { DokumentasjonskravInnhold } from "./DokumentasjonskravInnhold";

interface DokumentasjonskravProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonskravKomponent({ dokumentasjonskrav }: DokumentasjonskravProps) {
  const [tidligereBegrunnelse, setTidligereBegrunnelse] = useState<string | undefined>(
    dokumentasjonskrav.begrunnelse
  );

  const { oppdaterEtDokumentasjonskrav, valideringsTeller } = useDokumentasjonskravContext();

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
  });

  useEffect(() => {
    if (valideringsTeller > 0) {
      form.validate();
    }
  }, [valideringsTeller, form]);

  const begrunnelseSenderSenere = form.value(hvaErGrunnenTilAtDuSenderDokumentetSenere);
  const begrunnelseSendtTidligere = form.value(nårSendteDuDokumentet);
  const begrunnelseSenderIkke = form.value(hvaErGrunnenTilAtDuIkkeSenderDokumentet);
  const hvaVilDuGjøreSvar = form.value(velgHvaDuVilGjøre);

  useEffect(() => {
    const nåværendeBegrunnelse =
      begrunnelseSenderSenere || begrunnelseSendtTidligere || begrunnelseSenderIkke;

    if (
      nåværendeBegrunnelse === tidligereBegrunnelse &&
      hvaVilDuGjøreSvar === dokumentasjonskrav.svar
    ) {
      return;
    }

    const dokumentasjonskravsvar: Dokumentasjonskrav = {
      ...dokumentasjonskrav,
      svar: hvaVilDuGjøreSvar,
      begrunnelse: nåværendeBegrunnelse,
      filer: hvaVilDuGjøreSvar === dokumentkravSvarSendNå ? dokumentasjonskrav.filer : undefined,
      feil: undefined,
    };

    if (hvaVilDuGjøreSvar !== dokumentasjonskrav.svar) {
      oppdaterEtDokumentasjonskrav(dokumentasjonskravsvar);
      setTidligereBegrunnelse(nåværendeBegrunnelse);
      return;
    }

    const timer = setTimeout(() => {
      if (nåværendeBegrunnelse) {
        setTidligereBegrunnelse(nåværendeBegrunnelse);
      } else {
        form.validate();
        setTidligereBegrunnelse(undefined);
      }

      oppdaterEtDokumentasjonskrav(dokumentasjonskravsvar);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    begrunnelseSenderSenere,
    begrunnelseSendtTidligere,
    begrunnelseSenderIkke,
    tidligereBegrunnelse,
    hvaVilDuGjøreSvar,
  ]);

  useEffect(() => {
    if (!form.formState.isValid) {
      oppdaterEtDokumentasjonskrav({
        ...dokumentasjonskrav,
        feil: DokumentasjonskravFeilType.VALIDERINGSFEIL,
      });
    }

    if (valideringsTeller > 0 && hvaVilDuGjøreSvar === dokumentkravSvarSendNå)
      if (!dokumentasjonskrav.filer || dokumentasjonskrav.filer.length === 0) {
        oppdaterEtDokumentasjonskrav({
          ...dokumentasjonskrav,
          feil: DokumentasjonskravFeilType.MANGLER_FILER,
        });
      }
  }, [form, valideringsTeller]);

  useNullstillSkjulteFelter<DokumentasjonskravSvar>(form, dokumentasjonskravKomponenter);

  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large" className="mt-4">
      <VStack gap="4">
        <Form {...form.getFormProps()}>
          <VStack gap="4">
            <Heading size="small" level="3">
              {dokumentasjonskrav.tittel || "Dokumentasjon"}
            </Heading>

            {dokumentasjonskrav.type && (
              <DokumentasjonskravInnhold type={dokumentasjonskrav.type} />
            )}

            {dokumentasjonskravKomponenter.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={spørsmål.id}
                  props={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof DokumentasjonskravSvar)}
                />
              );
            })}
          </VStack>
        </Form>

        {form.value(velgHvaDuVilGjøre) === dokumentkravSvarSendNå && (
          <FilOpplasting dokumentasjonskrav={dokumentasjonskrav} />
        )}
      </VStack>
    </Box.New>
  );
}
