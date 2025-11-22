import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Box, Button, Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
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
import { DokumentkravFil, FilOpplasting } from "./FilOpplasting";

export type Dokumentasjonskrav = {
  id: string;
  spørsmålId: string;
  tittel?: string;
  seksjonId: string;
  type: DokumentasjonskravType;
  svar?: GyldigDokumentkravSvar;
  begrunnelse?: string;
  filer?: DokumentkravFil[] | null;
};

export type Bundle = {
  filnavn: string;
  urn: string;
  filsti: string;
  storrelse: number;
  tidspunkt: string;
};

export enum DokumentasjonskravType {
  Barn = "Barn",
  Arbeidsforhold = "Arbeidsforhold",
  Tjenestebevis = "Tjenestebevis",
  Utdanning = "Utdanning",
  ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid = "ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid",
  ReellArbeidssøkerKanIkkeJobbeHeleNorge = "ReellArbeidssøkerKanIkkeJobbeHeleNorge",
  ReellArbeidssøkerIkkeTaAlleTypeYrker = "ReellArbeidssøkerIkkeTaAlleTypeYrker",
  AnnenPengestøtteFraAndreEøsLand = "AnnenPengestøtteFraAndreEøsLand",
  AnnenPengestøtteFraNorge = "AnnenPengestøtteFraNorge",
  AnnenPengestøtteFåLønnEllerAndreØkonomiskeGoder = "AnnenPengestøtteFåLønnEllerAndreØkonomiskeGoder",
}

export type GyldigDokumentkravSvar =
  | typeof dokumentkravSvarSendNå
  | typeof dokumentkravSvarSenderSenere
  | typeof dokumentkravSvarSendtTidligere
  | typeof dokumentkravSvarSenderIkke;

interface DokumentasjonskravProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonskravKomponent({ dokumentasjonskrav }: DokumentasjonskravProps) {
  const { soknadId } = useParams();
  const [lagrer, setLagrer] = useState(false);
  const [dokumentkravFiler, setDokumentkravFiler] = useState<DokumentkravFil[]>(
    dokumentasjonskrav.filer ?? []
  );

  const { dokumentasjonskrav: alleDokumentasjonskrav, setDokumentasjonskrav } =
    useDokumentasjonskravContext();

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
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onSubmit",
    },
    handleSubmit: async (dokumentasjonskravskjema) => {
      let bundle: Bundle | null = null;

      if (dokumentasjonskravskjema[velgHvaDuVilGjøre] === dokumentkravSvarSendNå) {
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
          dokumentasjonskravskjema[velgHvaDuVilGjøre] === dokumentkravSvarSendNå
            ? dokumentkravFiler
            : null,
        bundle: bundle,
      };

      await lagreDokumentasjonskravsvar(dokumentasjonskravsvar);
    },
  });

  useEffect(() => {
    if (form.value(velgHvaDuVilGjøre) !== dokumentkravSvarSendNå) {
      setDokumentkravFiler([]);
    }
  }, [form]);

  useNullstillSkjulteFelter<DokumentasjonskravSvar>(form, dokumentasjonskravKomponenter);

  async function bundleFiler(): Promise<Bundle | null> {
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

    return null;
  }

  async function lagreDokumentasjonskravsvar(svar: Dokumentasjonskrav) {
    const oppdatertDokumentasjonskrav = alleDokumentasjonskrav.map((krav: Dokumentasjonskrav) =>
      krav.id === svar.id ? svar : krav
    );

    const formData = new FormData();
    formData.append("oppdatertDokumentasjonskrav", JSON.stringify(oppdatertDokumentasjonskrav));

    setLagrer(true);
    const response = await fetch(
      `/api/lagre-dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.seksjonId}/`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response.ok) {
      setDokumentasjonskrav(oppdatertDokumentasjonskrav);
    }

    if (!response.ok) {
      console.error("Noe gikk galt ved lagring av dokumentasjonskrav");
    }

    setLagrer(false);
  }

  return (
    <Box padding="space-16" background="surface-subtle" borderRadius="large" className="mt-4">
      <VStack gap="8">
        <Form {...form.getFormProps()}>
          <VStack gap="6">
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

          {form.value(velgHvaDuVilGjøre) === dokumentkravSvarSendNå && (
            <FilOpplasting
              dokumentasjonskrav={dokumentasjonskrav}
              dokumentkravFiler={dokumentkravFiler}
              setDokumentkravFiler={setDokumentkravFiler}
            />
          )}

          <Button
            type="submit"
            variant="secondary"
            icon={<FloppydiskIcon aria-hidden />}
            iconPosition="right"
            className="mt-8"
            loading={lagrer}
          >
            Lagre
          </Button>
        </Form>
      </VStack>
    </Box>
  );
}
