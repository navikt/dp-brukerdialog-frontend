import { Box, Heading, VStack } from "@navikt/ds-react";
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
  skjemakode: string;
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
  ArbeidsforholdArbeidsavtale = "ArbeidsforholdArbeidsavtale",
  ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp = "ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp",
  ArbeidsforholdJegHarSagtOppSelv = "ArbeidsforholdJegHarSagtOppSelv",
  ArbeidsforholdAvskjedigelse = "ArbeidsforholdAvskjedigelse",
  ArbeidsforholdRedusertArbeidstid = "ArbeidsforholdRedusertArbeidstid",
  ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter = "ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter",
  ArbeidsforholdPermitteringsvarsel = "ArbeidsforholdPermitteringsvarsel",
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
  const [dokumentkravFiler, setDokumentkravFiler] = useState<DokumentkravFil[]>(
    dokumentasjonskrav.filer ?? []
  );

  const {
    dokumentasjonskrav: alleDokumentasjonskrav,
    setHarTekniskFeil,
    setHarValideringsFeil,
    oppdaterDokumentasjonskrav,
    dokumentasjonskravIdTilÅLagre,
    setDokumentasjonskravIdTilÅLagre,
  } = useDokumentasjonskravContext();

  useEffect(() => {
    if (dokumentasjonskravIdTilÅLagre === dokumentasjonskrav.id) {
      form.submit();
    }
  }, [dokumentasjonskravIdTilÅLagre, dokumentasjonskrav.id]);

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
      setHarValideringsFeil(true);
    },
    handleSubmit: async (dokumentasjonskravskjema) => {
      setHarTekniskFeil(false);
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

  async function lagreDokumentasjonskravsvar(krav: Dokumentasjonskrav) {
    try {
      const oppdatertDokumentasjonskravListe = alleDokumentasjonskrav.map((k) =>
        k.id === krav.id ? krav : k
      );

      const formData = new FormData();
      formData.append("dokumentasjonskrav", JSON.stringify(oppdatertDokumentasjonskravListe));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.seksjonId}/${krav.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        oppdaterDokumentasjonskrav(krav);
        setDokumentasjonskravIdTilÅLagre(null);
      } else {
        console.error("API-kall feilet:", response.status, "for", krav.id);
        setHarTekniskFeil(true);
        setDokumentasjonskravIdTilÅLagre(null);
      }
    } catch (error) {
      console.error("Feil ved lagring av dokumentasjonskrav:", error);
      setHarTekniskFeil(true);
      setDokumentasjonskravIdTilÅLagre(null);
    }
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
        </Form>
      </VStack>
    </Box>
  );
}
