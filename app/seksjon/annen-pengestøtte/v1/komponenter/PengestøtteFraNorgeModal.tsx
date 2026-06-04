import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import {
  hvemUtbetalerPengestøtten,
  hvilkenPengestøtteFraAndreEnnNavMottarDu,
  pengestøtteFraNorgeModalKomponenter,
  PengestøtteFraNorgeModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { pengestøtteFraNorgeSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import { finnOptionLabel } from "~/utils/seksjon.utils";
import { useEffect, useRef, useState } from "react";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  spørsmålId: string;
  seksjonId: string;
}

export type PengestøtteFraNorge = PengestøtteFraNorgeModalSvar & {
  id: string;
  dokumentasjonskrav?: string[];
};

export function PengestøtteFraNorgeModal({ ref, spørsmålId, seksjonId }: IProps) {
  const endringerErIkkeLagretModalRef = useRef<HTMLDialogElement>(null);
  const [stengModalSelvOmDetErUlagredeEndringer, setStengModalSelvOmDetErUlagredeEndringer] =
    useState(false);
  const {
    pengestøtteFraNorge,
    setPengestøtteFraNorge,
    pengestøtteFraNorgeModalData,
    setPengestøtteFraNorgeModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useAnnenPengestøtteContext();

  const form = useForm({
    submitSource: "state",
    schema: pengestøtteFraNorgeSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
    defaultValues: pengestøtteFraNorgeModalData?.pengestøtteFraNorge ?? {},
    handleSubmit: (enPengestøtteFraNorge) => {
      if (pengestøtteFraNorgeModalData?.operasjon === undefined) {
        console.error("Ugyldig operasjonstype for PengestøtteFraNorgeModal");
        return;
      }

      const støtteType = finnOptionLabel(
        pengestøtteFraNorgeModalKomponenter,
        hvilkenPengestøtteFraAndreEnnNavMottarDu,
        enPengestøtteFraNorge[hvilkenPengestøtteFraAndreEnnNavMottarDu]!
      );

      const hvemUtbetalerStøtten =
        enPengestøtteFraNorge[hvemUtbetalerPengestøtten] === undefined
          ? ""
          : ` (${enPengestøtteFraNorge[hvemUtbetalerPengestøtten]})`;

      const dokumentasjonskravTittel = `Pengestøtte fra Norge - ${støtteType}${hvemUtbetalerStøtten}`;

      if (pengestøtteFraNorgeModalData?.operasjon === ModalOperasjon.LeggTil) {
        leggTilPengestøtteFraNorge(enPengestøtteFraNorge, dokumentasjonskravTittel);
      }

      if (pengestøtteFraNorgeModalData?.operasjon === ModalOperasjon.Rediger) {
        redigerPengestøtteFraNorge(enPengestøtteFraNorge, dokumentasjonskravTittel);
      }
    },
    onSubmitSuccess() {
      setPengestøtteFraNorgeModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  useNullstillSkjulteFelter<PengestøtteFraNorgeModalSvar>(
    form,
    pengestøtteFraNorgeModalKomponenter
  );

  function leggTilPengestøtteFraNorge(
    pengestøtteProps: PengestøtteFraNorgeModalSvar,
    dokumentasjonskravTittel: string
  ) {
    const dokumentasjonskravId = crypto.randomUUID();

    const nyttDokumentkrav: Dokumentasjonskrav = {
      id: dokumentasjonskravId,
      seksjonId: seksjonId,
      spørsmålId: spørsmålId,
      skjemakode: "K1",
      tittel: dokumentasjonskravTittel,
      type: DokumentasjonskravType.AnnenPengestøtteFraNorgePensjonFraAndre,
    };

    const nyPengestøtteFraNorge: PengestøtteFraNorge = {
      ...pengestøtteProps,
      id: crypto.randomUUID(),
      dokumentasjonskrav: [dokumentasjonskravId],
    };

    setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
    setPengestøtteFraNorge([...pengestøtteFraNorge, nyPengestøtteFraNorge]);
  }

  function redigerPengestøtteFraNorge(
    pengestøtteProps: PengestøtteFraNorgeModalSvar,
    dokumentasjonskravTittel: string
  ) {
    const oppdatertPengestøtteFraNorge: PengestøtteFraNorge[] = pengestøtteFraNorge?.map(
      (pengestøtte) =>
        pengestøtte.id === pengestøtteFraNorgeModalData?.pengestøtteFraNorge?.id
          ? {
              ...pengestøtteProps,
              id: pengestøtte.id,
              dokumentasjonskrav: pengestøtte.dokumentasjonskrav,
            }
          : pengestøtte
    );

    const oppdatertDokumentasjonskrav = dokumentasjonskrav.map((krav) =>
      pengestøtteFraNorgeModalData?.pengestøtteFraNorge?.dokumentasjonskrav?.includes(krav.id)
        ? {
            ...krav,
            tittel: dokumentasjonskravTittel,
          }
        : krav
    );

    setDokumentasjonskrav(oppdatertDokumentasjonskrav);
    setPengestøtteFraNorge(oppdatertPengestøtteFraNorge);
  }

  const modalOperasjon =
    pengestøtteFraNorgeModalData?.operasjon === ModalOperasjon.LeggTil ? "Legg til" : "Rediger";

  useEffect(() => {
    if (stengModalSelvOmDetErUlagredeEndringer) {
      setPengestøtteFraNorgeModalData(undefined);
    }
  }, [stengModalSelvOmDetErUlagredeEndringer]);

  return (
    <>
      <Modal
        ref={ref}
        width={700}
        aria-labelledby="modal-heading"
        onBeforeClose={() => {
          if (form.transient.formState.isDirty) {
            endringerErIkkeLagretModalRef.current?.showModal();
            return false;
          } else {
            return true;
          }
        }}
        onClose={() => setPengestøtteFraNorgeModalData(undefined)}
      >
        <Modal.Header>
          <Heading level="1" size="medium" id="modal-heading">
            <HStack gap="space-8">{modalOperasjon} pengestøtte fra Norge</HStack>
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <Form {...form.getFormProps()}>
            <VStack gap="space-24">
              {pengestøtteFraNorgeModalKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formScope={form.scope(komponent.id as keyof PengestøtteFraNorgeModalSvar)}
                    formValues={form.value()}
                  />
                );
              })}

              <HStack className="mt-16" justify="end">
                <Button type="submit" icon={<FloppydiskIcon aria-hidden />}>
                  Lagre og lukk
                </Button>
              </HStack>
            </VStack>
          </Form>
        </Modal.Body>
      </Modal>
      <EndringerErIkkeLagretModal
        ref={endringerErIkkeLagretModalRef}
        setStengModalSelvOmDetErUlagredeEndringer={setStengModalSelvOmDetErUlagredeEndringer}
      />
    </>
  );
}
