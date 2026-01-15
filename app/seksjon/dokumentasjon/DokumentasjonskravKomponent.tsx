import { Box, ErrorMessage, Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { useDokumentasjonskravContext } from "./dokumentasjonskrav.context";
import dokumentasjonskravKomponenter, {
  DokumentasjonskravSvar,
  dokumentkravEttersendt,
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
import { DokumentkravFil, FilOpplasting } from "~/components/FilOpplasting";

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
  bundle?: Bundle | null;
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
  ArbeidsforholdRotasjon = "ArbeidsforholdRotasjon",
  Tjenestebevis = "Tjenestebevis",
  Utdanning = "Utdanning",
  ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid = "ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid",
  ReellArbeidssøkerKanIkkeJobbeHeleNorge = "ReellArbeidssøkerKanIkkeJobbeHeleNorge",
  ReellArbeidssøkerKanIkkeTaAlleTyperArbeid = "ReellArbeidssøkerKanIkkeTaAlleTyperArbeid",
  AnnenPengestøtteFraAndreEøsLand = "AnnenPengestøtteFraAndreEøsLand",
  AnnenPengestøtteFraNorgePensjonFraAndre = "AnnenPengestøtteFraNorgePensjonFraAndre",
  AnnenPengestøtteFraNorgePengestøtteFraGff = "AnnenPengestøtteFraNorgePengestøtteFraGff",
  AndreUtbetalingerEllerGoderFraTidligereArbeidsgiver = "AndreUtbetalingerEllerGoderFraTidligereArbeidsgiver",
}

export type GyldigDokumentkravSvar =
  | typeof dokumentkravSvarSendNå
  | typeof dokumentkravSvarSenderSenere
  | typeof dokumentkravSvarSendtTidligere
  | typeof dokumentkravSvarSenderIkke
  | typeof dokumentkravEttersendt;

interface DokumentasjonskravProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonskravKomponent({ dokumentasjonskrav }: DokumentasjonskravProps) {
  const [dokumentkravFiler, setDokumentkravFiler] = useState<DokumentkravFil[]>(
    dokumentasjonskrav.filer ?? []
  );

  const [tidligereBegrunnelse, setTidligereBegrunnelse] = useState<string | undefined>(
    dokumentasjonskrav.begrunnelse
  );

  const { oppdaterDokumentasjonskrav, setDokumentasjonskravIdSomSkalLagres } =
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
  });

  // Hook for å mellomlagre begrunnelse med debounce
  useEffect(() => {
    const nåværendeBegrunnelse =
      form.value(hvaErGrunnenTilAtDuSenderDokumentetSenere) ||
      form.value(nårSendteDuDokumentet) ||
      form.value(hvaErGrunnenTilAtDuIkkeSenderDokumentet);

    // Sjekk om begrunnelsen faktisk har endret seg fra forrige verdi
    if (nåværendeBegrunnelse === tidligereBegrunnelse) {
      return;
    }

    // Sett opp en debounce timer
    const timer = setTimeout(() => {
      if (nåværendeBegrunnelse) {
        // Mellomlagre context
        setTidligereBegrunnelse(nåværendeBegrunnelse);
        console.log("Bruker er trolig ferdig med å skrive");

        // Her må vi sjekke om hvis bruker har lastet opp filer,
        // Hvis ja, må vi setter lastOppNå med filer, fjern dermed begrunnelse
        // Tidligere logikk ser ut som til å være greit // se dokumentasjonskravsvar linje 139

        const dokumentasjonskravsvar: Dokumentasjonskrav = {
          ...dokumentasjonskrav,
          svar: form.value(velgHvaDuVilGjøre),
          begrunnelse: nåværendeBegrunnelse,
        };

        oppdaterDokumentasjonskrav(dokumentasjonskravsvar);
      } else {
        form.validate();
        setTidligereBegrunnelse(undefined);
      }
    }, 1000); // Venter 1 sekund etter siste endring

    return () => clearTimeout(timer);
  }, [
    form.value(hvaErGrunnenTilAtDuSenderDokumentetSenere),
    form.value(nårSendteDuDokumentet),
    form.value(hvaErGrunnenTilAtDuIkkeSenderDokumentet),
    tidligereBegrunnelse,
  ]);

  useNullstillSkjulteFelter<DokumentasjonskravSvar>(form, dokumentasjonskravKomponenter);

  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large" className="mt-4">
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
            />
          )}
        </Form>
      </VStack>
    </Box.New>
  );
}
