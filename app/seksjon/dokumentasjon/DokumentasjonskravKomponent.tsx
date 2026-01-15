import { Box, Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useState } from "react";
import { Form } from "react-router";
import { FilOpplasting } from "~/components/FilOpplasting";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { Dokumentasjonskrav } from "./dokumentasjon.types";
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

  const { oppdaterDokumentasjonskrav } = useDokumentasjonskravContext();

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

  const begrunnelseSenderSenere = form.value(hvaErGrunnenTilAtDuSenderDokumentetSenere);
  const begrunnelseSendtTidligere = form.value(nårSendteDuDokumentet);
  const begrunnelseSenderIkke = form.value(hvaErGrunnenTilAtDuIkkeSenderDokumentet);
  const hvaVilDuGjøreSvar = form.value(velgHvaDuVilGjøre);

  useEffect(() => {
    const nåværendeBegrunnelse =
      begrunnelseSenderSenere || begrunnelseSendtTidligere || begrunnelseSenderIkke;

    if (nåværendeBegrunnelse === tidligereBegrunnelse) {
      return;
    }

    const timer = setTimeout(() => {
      if (nåværendeBegrunnelse) {
        setTidligereBegrunnelse(nåværendeBegrunnelse);

        const dokumentasjonskravsvar: Dokumentasjonskrav = {
          ...dokumentasjonskrav,
          svar: hvaVilDuGjøreSvar,
          begrunnelse: nåværendeBegrunnelse,
          filer:
            hvaVilDuGjøreSvar === dokumentkravSvarSendNå ? dokumentasjonskrav.filer : undefined,
        };

        oppdaterDokumentasjonskrav(dokumentasjonskravsvar);
      } else {
        form.validate();
        setTidligereBegrunnelse(undefined);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    begrunnelseSenderSenere,
    begrunnelseSendtTidligere,
    begrunnelseSenderIkke,
    tidligereBegrunnelse,
  ]);

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
