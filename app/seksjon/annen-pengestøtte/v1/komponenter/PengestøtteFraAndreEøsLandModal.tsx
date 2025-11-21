import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { pengestøtteFraAndreEøsLandSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import {
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalKomponenter,
  PengestøtteFraAndreEøsLandModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import { useEffect } from "react";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { finnOptionLabel } from "~/utils/seksjon.utils";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  spørsmålId: string;
  seksjonId: string;
}

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
    defaultValues: pengestøtteFraAndreEøsLandModalData?.pengestøtteFraAndreEøsLandSvar ?? {},
    handleSubmit: (skjemaData) => {
      if (pengestøtteFraAndreEøsLandModalData?.operasjon === undefined) {
        console.error("Ugyldig operasjonstype for PengestøtteFraAndreEøsLandModal");
        return;
      }

      const ytelseType = finnOptionLabel(
        pengestøtteFraAndreEøsLandModalKomponenter,
        hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
        skjemaData.hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand!
      );

      const dokumentasjonskravTittel = `Dokumentasjon av pengestøtte fra andre EØS-land: ${ytelseType}`;

      if (pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.LeggTil) {
        const dokumentasjonskravId = crypto.randomUUID();

        const nyttEnPengestøtteFraAndreEøsLand = {
          dokumentasjonskravId: dokumentasjonskravId,
          ...skjemaData,
        };

        const nyttDokumentkrav: Dokumentasjonskrav = {
          id: dokumentasjonskravId,
          seksjonId: seksjonId,
          spørsmålId: spørsmålId,
          tittel: dokumentasjonskravTittel,
          type: DokumentasjonskravType.AnnenPengeStøtteFraEøsLand,
        };

        setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
        setPengestøtteFraAndreEøsLand([
          ...pengestøtteFraAndreEøsLand,
          nyttEnPengestøtteFraAndreEøsLand as PengestøtteFraAndreEøsLandModalSvar,
        ]);
      }

      if (
        pengestøtteFraAndreEøsLandModalData?.pengestøtteFraAndreEøsLandSvarIndex !== undefined &&
        pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.Rediger
      ) {
        const oppdatertListe = [...pengestøtteFraAndreEøsLand];
        oppdatertListe[pengestøtteFraAndreEøsLandModalData.pengestøtteFraAndreEøsLandSvarIndex] =
          skjemaData as PengestøtteFraAndreEøsLandModalSvar;
        setPengestøtteFraAndreEøsLand(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setPengestøtteFraAndreEøsLandModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

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

  const modalTittel =
    pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.LeggTil
      ? "Legg til pengestøtte fra andre EØS-land"
      : "Rediger pengestøtte fra andre EØS-land";

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setPengestøtteFraAndreEøsLandModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">{modalTittel}</HStack>
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
