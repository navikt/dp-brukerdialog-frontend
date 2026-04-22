import { Box, Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useState } from "react";
import { Form } from "react-router";
import { FilOpplasting } from "~/components/FilOpplasting";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { Dokumentasjonskrav, DokumentasjonskravFeilType } from "../dokumentasjon.types";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import {
  dokumentasjonskravKomponenter,
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
  const { oppdaterEtDokumentasjonskrav, valideringsTeller } = useDokumentasjonskravContext();
  const [tidligereBegrunnelse, setTidligereBegrunnelse] = useState<string | undefined>(
    dokumentasjonskrav.begrunnelse
  );

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: dokumentasjonskravSchema,
    defaultValues: hentFormDefaultValue(),
  });

  useNullstillSkjulteFelter<DokumentasjonskravSvar>(form, dokumentasjonskravKomponenter);

  useEffect(() => {
    if (valideringsTeller > 0) {
      form.validate();
    }
  }, [valideringsTeller, form]);

  const svar = form.value(velgHvaDuVilGjøre);
  const begrunnelse =
    form.value(hvaErGrunnenTilAtDuSenderDokumentetSenere) ||
    form.value(hvaErGrunnenTilAtDuIkkeSenderDokumentet) ||
    form.value(nårSendteDuDokumentet);

  useEffect(() => {
    if (begrunnelse === tidligereBegrunnelse && svar === dokumentasjonskrav.svar) {
      return;
    }

    const dokumentasjonskravsvar: Dokumentasjonskrav = {
      ...dokumentasjonskrav,
      svar: svar,
      begrunnelse: begrunnelse,
      filer: svar === dokumentkravSvarSendNå ? dokumentasjonskrav.filer : undefined,
      feil: undefined,
      skjemaSvar: form.transient.value(),
    };

    if (svar !== dokumentasjonskrav.svar) {
      oppdaterEtDokumentasjonskrav(dokumentasjonskravsvar);
      setTidligereBegrunnelse(begrunnelse);
      return;
    }

    const timer = setTimeout(() => {
      if (begrunnelse) {
        setTidligereBegrunnelse(begrunnelse);
      } else {
        form.validate();
        setTidligereBegrunnelse(undefined);
      }

      oppdaterEtDokumentasjonskrav(dokumentasjonskravsvar);
    }, 1000);

    return () => clearTimeout(timer);
  }, [begrunnelse, tidligereBegrunnelse, svar, form]);

  useEffect(() => {
    if (!form.formState.isValid) {
      oppdaterEtDokumentasjonskrav({
        ...dokumentasjonskrav,
        feil: DokumentasjonskravFeilType.VALIDERINGSFEIL,
      });
    }

    if (valideringsTeller > 0 && svar === dokumentkravSvarSendNå)
      if (!dokumentasjonskrav.filer || dokumentasjonskrav.filer.length === 0) {
        oppdaterEtDokumentasjonskrav({
          ...dokumentasjonskrav,
          feil: DokumentasjonskravFeilType.MANGLER_FILER,
        });
      }
  }, [form, valideringsTeller]);

  function hentFormDefaultValue() {
    return {
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
    };
  }

  return (
    <Box padding="space-16" background="sunken" borderRadius="12">
      <VStack gap="space-24">
        <Form {...form.getFormProps()}>
          <VStack gap="space-16">
            <Heading size="small" level="3">
              {dokumentasjonskrav.tittel}
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
    </Box>
  );
}
