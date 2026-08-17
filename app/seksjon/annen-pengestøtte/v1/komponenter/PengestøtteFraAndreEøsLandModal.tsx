import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import {
  fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
  lagPengestøtteFraAndreEøsLandModalKomponenter,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  PengestøtteFraAndreEøsLandModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { pengestøtteFraAndreEøsLandSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";

import { finnOptionLabel } from "~/utils/seksjon.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

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
  const endringerErIkkeLagretModalRef = useRef<HTMLDialogElement>(null);
  const [stengModalSelvOmDetErUlagredeEndringer, setStengModalSelvOmDetErUlagredeEndringer] =
    useState(false);
  const {
    pengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLand,
    pengestøtteFraAndreEøsLandModalData,
    setPengestøtteFraAndreEøsLandModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useAnnenPengestøtteContext();

  const { t } = useVersjonertTranslation("annen-pengestøtte", 1);
  const pengestøtteFraAndreEøsLandModalKomponenter =
    lagPengestøtteFraAndreEøsLandModalKomponenter(t);

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
      ).toUpperCase();

      const dokumentasjonskravTittel = t("eøs.dokumentasjonskravTittel", { støtteType, land });

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

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

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
      form.setValue(iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato, "");
      form.setValue(iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato, "");
    } else if (form.value(mottarDuFortsattPengestøttenFraAndreEøsLand) === "nei") {
      form.setValue(fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato, "");
    }
  }, [form.value(mottarDuFortsattPengestøttenFraAndreEøsLand)]);

  useEffect(() => {
    if (stengModalSelvOmDetErUlagredeEndringer) {
      setPengestøtteFraAndreEøsLandModalData(undefined);
    }
  }, [stengModalSelvOmDetErUlagredeEndringer]);

  const modalOperasjon =
    pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.LeggTil
      ? t("modal.leggTil")
      : t("modal.rediger");

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
        onClose={() => setPengestøtteFraAndreEøsLandModalData(undefined)}
      >
        <Modal.Header>
          <Heading level="1" size="medium" id="modal-heading">
            <HStack gap="space-8">
              {modalOperasjon} {t("eøs.modal.heading")}
            </HStack>
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <Form id={formId} action={formAction}>
            <VStack gap="space-24">
              {pengestøtteFraAndreEøsLandModalKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(formValues)) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formValues={formValues}
                    formScope={form.scope(
                      komponent.id as keyof PengestøtteFraAndreEøsLandModalSvar
                    )}
                  />
                );
              })}

              <HStack className="mt-16" justify="end">
                <Button
                  type="button"
                  onClick={() => form.submit()}
                  icon={<FloppydiskIcon aria-hidden />}
                >
                  {t("modal.lagreOgLukk")}
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
