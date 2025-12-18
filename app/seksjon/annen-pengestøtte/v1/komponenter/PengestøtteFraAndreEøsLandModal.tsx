import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import {
  fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalKomponenter,
  PengestøtteFraAndreEøsLandModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { pengestøtteFraAndreEøsLandSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { finnOptionLabel } from "~/utils/seksjon.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  spørsmålId: string;
  seksjonId: string;
}

export type PengestøtteFraAndreEøsLand = PengestøtteFraAndreEøsLandModalSvar & {
  id: string;
  dokumentasjonskrav?: string[];
};

export function PengestøtteFraAndreEøsLandModal({ ref, spørsmålId, seksjonId }: IProps) {
  const {
    pengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLand,
    pengestøtteFraAndreEøsLandModalData,
    setPengestøtteFraAndreEøsLandModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useAnnenPengestøtteContext();

  const form = useForm({
    submitSource: "state",
    schema: pengestøtteFraAndreEøsLandSchema,
    defaultValues: pengestøtteFraAndreEøsLandModalData?.pengestøtteFraAndreEøsLand ?? {},
    handleSubmit: (skjemaData) => {
      if (pengestøtteFraAndreEøsLandModalData?.operasjon === undefined) {
        console.error("Ugyldig operasjonstype for PengestøtteFraAndreEøsLandModal");
        return;
      }

      const støtteType = finnOptionLabel(
        pengestøtteFraAndreEøsLandModalKomponenter,
        hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
        skjemaData[hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]!
      );

      const land = finnLandnavnMedLocale(
        skjemaData[fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]!
      ).toUpperCase()

      const dokumentasjonskravTittel = `Pengestøtte fra andre EØS-land - ${støtteType} (${land})  `;

      if (pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.LeggTil) {
        leggTilPengestøtteFraAndreEøsLand(skjemaData, dokumentasjonskravTittel);
      }

      if (pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.Rediger) {
        redigerPengestøtteFraAndreEøsLand(skjemaData, dokumentasjonskravTittel);
      }
    },
    onSubmitSuccess() {
      setPengestøtteFraAndreEøsLandModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  function leggTilPengestøtteFraAndreEøsLand(
    pengestøtteProps: PengestøtteFraAndreEøsLandModalSvar,
    dokumentasjonskravTittel: string
  ) {
    const dokumentasjonskravId = crypto.randomUUID();

    const nyttDokumentkrav: Dokumentasjonskrav = {
      id: dokumentasjonskravId,
      seksjonId: seksjonId,
      spørsmålId: spørsmålId,
      skjemakode: "K1",
      tittel: dokumentasjonskravTittel,
      type: DokumentasjonskravType.AnnenPengestøtteFraAndreEøsLand,
    };

    const nyPengestøtteFraAndreEøsLand: PengestøtteFraAndreEøsLand = {
      ...pengestøtteProps,
      id: crypto.randomUUID(),
      dokumentasjonskrav: [dokumentasjonskravId],
    };

    setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
    setPengestøtteFraAndreEøsLand([...pengestøtteFraAndreEøsLand, nyPengestøtteFraAndreEøsLand]);
  }

  function redigerPengestøtteFraAndreEøsLand(
    pengestøtteProps: PengestøtteFraAndreEøsLandModalSvar,
    dokumentasjonskravTittel: string
  ) {
    const oppdatertPengestøtteFraAndreEøsLand: PengestøtteFraAndreEøsLand[] =
      pengestøtteFraAndreEøsLand?.map((pengestøtte) =>
        pengestøtte.id === pengestøtteFraAndreEøsLandModalData?.pengestøtteFraAndreEøsLand?.id
          ? {
              ...pengestøtteProps,
              id: pengestøtte.id,
              dokumentasjonskrav: pengestøtte.dokumentasjonskrav,
            }
          : pengestøtte
      );

    const oppdatertDokumentasjonskrav = dokumentasjonskrav.map((krav) =>
      pengestøtteFraAndreEøsLandModalData?.pengestøtteFraAndreEøsLand?.dokumentasjonskrav?.includes(
        krav.id
      )
        ? {
            ...krav,
            tittel: dokumentasjonskravTittel,
          }
        : krav
    );

    setDokumentasjonskrav(oppdatertDokumentasjonskrav);
    setPengestøtteFraAndreEøsLand(oppdatertPengestøtteFraAndreEøsLand);
  }

  useNullstillSkjulteFelter<PengestøtteFraAndreEøsLandModalSvar>(
    form,
    pengestøtteFraAndreEøsLandModalKomponenter
  );

  useEffect(() => {
    if (form.value(mottarDuFortsattPengestøttenFraAndreEøsLand) === "ja") {
      form.setValue(iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed, "");
      form.setValue(iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed, "");
    } else if (form.value(mottarDuFortsattPengestøttenFraAndreEøsLand) === "nei") {
      form.setValue(fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed, "");
    }
  }, [form.value(mottarDuFortsattPengestøttenFraAndreEøsLand)]);

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setPengestøtteFraAndreEøsLandModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">Pengestøtte fra andre EØS-land</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {pengestøtteFraAndreEøsLandModalKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formScope={form.scope(komponent.id as keyof PengestøtteFraAndreEøsLandModalSvar)}
                />
              );
            })}

            <HStack className="mt-4" justify="end">
              <Button
                type="submit"
                icon={<FloppydiskIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
              >
                Lagre og lukk
              </Button>
            </HStack>
          </VStack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
