import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { pengestøtteFraTidligereArbeidsgiverSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import {
  hvemMottarDuUtbetalingerEllerGoderFra,
  lagPengestøtteFraTidligereArbeidsgiverModalKomponenter,
  PengestøtteFraTidligereArbeidsgiverModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  spørsmålId: string;
  seksjonId: string;
  versjon: number | string | null | undefined;
}

export type PengestøtteFraTidligereArbeidsgiver = PengestøtteFraTidligereArbeidsgiverModalSvar & {
  id: string;
  dokumentasjonskrav?: string[];
};

export function PengestøtteFraTidligereArbeidsgiverModal({
  ref,
  spørsmålId,
  seksjonId,
  versjon,
}: IProps) {
  const { t } = useVersjonertTranslation("annen-pengestøtte", 1);
  const pengestøtteFraTidligereArbeidsgiverModalKomponenter = useMemo(
    () => lagPengestøtteFraTidligereArbeidsgiverModalKomponenter(t),
    [t]
  );
  const endringerErIkkeLagretModalRef = useRef<HTMLDialogElement>(null);
  const [stengModalSelvOmDetErUlagredeEndringer, setStengModalSelvOmDetErUlagredeEndringer] =
    useState(false);
  const {
    pengestøtteFraTidligereArbeidsgiver,
    setPengestøtteFraTidligereArbeidsgiver,
    pengestøtteFraTidligereArbeidsgiverModalData,
    setPengestøtteFraTidligereArbeidsgiverModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useAnnenPengestøtteContext();

  const form = useForm({
    submitSource: "state",
    schema: pengestøtteFraTidligereArbeidsgiverSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
    defaultValues:
      pengestøtteFraTidligereArbeidsgiverModalData?.pengestøtteFraTidligereArbeidsgiver ?? {},
    handleSubmit: (skjemaData) => {
      if (pengestøtteFraTidligereArbeidsgiverModalData?.operasjon === undefined) {
        console.error("Ugyldig operasjonstype for PengestøtteFraTidligereArbeidsgiverModal");
        return;
      }

      const dokumentasjonskravTittel = `Dokumentasjon av sluttvederlag, etterlønn eller andre økonomiske goder fra arbeidsgiver - ${skjemaData[hvemMottarDuUtbetalingerEllerGoderFra]}  `;

      if (pengestøtteFraTidligereArbeidsgiverModalData?.operasjon === ModalOperasjon.LeggTil) {
        leggTilPengestøtteFraTidligereArbeidsgiver(skjemaData, dokumentasjonskravTittel);
      }

      if (pengestøtteFraTidligereArbeidsgiverModalData?.operasjon === ModalOperasjon.Rediger) {
        redigerPengestøtteFraTidligereArbeidsgiver(skjemaData, dokumentasjonskravTittel);
      }
    },
    onSubmitSuccess() {
      setPengestøtteFraTidligereArbeidsgiverModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

  function leggTilPengestøtteFraTidligereArbeidsgiver(
    pengestøtteProps: PengestøtteFraTidligereArbeidsgiverModalSvar,
    dokumentasjonskravTittel: string
  ) {
    const dokumentasjonskravId = crypto.randomUUID();

    const nyttDokumentkrav: Dokumentasjonskrav = {
      id: dokumentasjonskravId,
      seksjonId: seksjonId,
      spørsmålId: spørsmålId,
      skjemakode: "K1",
      tittel: dokumentasjonskravTittel,
      type: DokumentasjonskravType.AndreUtbetalingerEllerGoderFraTidligereArbeidsgiver,
    };

    const nyPengestøtteFraAndreEøsLand: PengestøtteFraTidligereArbeidsgiver = {
      ...pengestøtteProps,
      id: crypto.randomUUID(),
      dokumentasjonskrav: [dokumentasjonskravId],
    };

    setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
    setPengestøtteFraTidligereArbeidsgiver([
      ...pengestøtteFraTidligereArbeidsgiver,
      nyPengestøtteFraAndreEøsLand,
    ]);
  }

  function redigerPengestøtteFraTidligereArbeidsgiver(
    pengestøtteProps: PengestøtteFraTidligereArbeidsgiverModalSvar,
    dokumentasjonskravTittel: string
  ) {
    const oppdatertPengestøtteFraAndreEøsLand: PengestøtteFraTidligereArbeidsgiver[] =
      pengestøtteFraTidligereArbeidsgiver?.map((pengestøtte) =>
        pengestøtte.id ===
        pengestøtteFraTidligereArbeidsgiverModalData?.pengestøtteFraTidligereArbeidsgiver?.id
          ? {
              ...pengestøtteProps,
              id: pengestøtte.id,
              dokumentasjonskrav: pengestøtte.dokumentasjonskrav,
            }
          : pengestøtte
      );

    const oppdatertDokumentasjonskrav = dokumentasjonskrav.map((krav) =>
      pengestøtteFraTidligereArbeidsgiverModalData?.pengestøtteFraTidligereArbeidsgiver?.dokumentasjonskrav?.includes(
        krav.id
      )
        ? {
            ...krav,
            tittel: dokumentasjonskravTittel,
          }
        : krav
    );

    setDokumentasjonskrav(oppdatertDokumentasjonskrav);
    setPengestøtteFraTidligereArbeidsgiver(oppdatertPengestøtteFraAndreEøsLand);
  }

  useNullstillSkjulteFelter<PengestøtteFraTidligereArbeidsgiverModalSvar>(
    form,
    pengestøtteFraTidligereArbeidsgiverModalKomponenter
  );

  const modalOperasjon =
    pengestøtteFraTidligereArbeidsgiverModalData?.operasjon === ModalOperasjon.LeggTil
      ? "Legg til"
      : "Rediger";

  useEffect(() => {
    if (stengModalSelvOmDetErUlagredeEndringer) {
      setPengestøtteFraTidligereArbeidsgiverModalData(undefined);
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
        onClose={() => setPengestøtteFraTidligereArbeidsgiverModalData(undefined)}
      >
        <Modal.Header>
          <Heading level="1" size="medium" id="modal-heading">
            <HStack gap="space-8">
              {modalOperasjon} utbetalinger eller økonomiske goder fra tidligere arbeidsgiver
            </HStack>
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <Form id={formId} action={formAction}>
            <VStack gap="space-24">
              {pengestøtteFraTidligereArbeidsgiverModalKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(formValues)) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formValues={formValues}
                    formScope={form.scope(
                      komponent.id as keyof PengestøtteFraTidligereArbeidsgiverModalSvar
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
